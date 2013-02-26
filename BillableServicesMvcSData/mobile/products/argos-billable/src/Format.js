define('Mobile/BillableServices/Format', [
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/string',
    'Sage/Platform/Mobile/Format'
], function(
    lang,
    array,
    string,
    format
) {
    return lang.setObject('Mobile.BillableServices.Format', lang.mixin({}, format, {
        numberSetsText: {
            'thousand': 'K',
            'million': 'M',
            'billion': 'Bn',
            'trillion': 'Tn'
        },

        /*
            {0}: original value
            {1}: cleaned value
            {2}: entire match (against clean value)
            {3..n}: match groups (against clean value)
        */
        phoneFormat: [{
            test: /^\+.*/,
            format: '${0}'
        },{
            test: /^(\d{3})(\d{3,4})$/,
            format: '${3}-${4}'
        },{
            test: /^(\d{3})(\d{3})(\d{2,4})$/, // 555 555 5555
            format: '(${3})-${4}-${5}'
        },{
            test: /^(\d{3})(\d{3})(\d{2,4})([^0-9]{1,}.*)$/, // 555 555 5555x
            format: '(${3})-${4}-${5}${6}'
        },{
            test: /^(\d{11,})(.*)$/,
            format: '${1}'
        }],
        phone: function(val, withLink) {
            if (typeof val !== 'string')
                return val;

            var formatters = Mobile.BillableServices.Format.phoneFormat,
                clean = /^\+/.test(val)
                    ? val
                    : val.replace(/[^0-9x]/ig, ''),
                number;

            for (var i = 0; i < formatters.length; i++)
            {
                var formatter = formatters[i],
                    match;
                if ((match = formatter.test.exec(clean)))
                    number = string.substitute(formatter.format, [val, clean].concat(match));
            }

            if (number)
                return withLink === false
                    ? number
                    : string.substitute('<a href="tel:${0}">${1}</a>', [clean, number]);

            return val;
        },
        nameLF: function(last, first) {
            var name = string.substitute('${0}, ${1}', [last || '', first || '']);
            if (name == ', ')
                name = '';

            return name;
        },
        numberToText: function(val, max) {
            var sets = ['thousand', 'million', 'billion', 'trillion'],
                setIndex = -1,
                rounded = parseFloat(val);

            if (rounded < 1000) return [rounded, ''];

            max = isNaN(max) ? 3 : max;

            while(rounded / 1000 >= 1 && setIndex <= max)
            {
                rounded = rounded / 1000;
                setIndex++;
            }
            rounded = Math.floor(rounded);
            return [rounded, Mobile.BillableServices.Format.numberSetsText[sets[setIndex]]];
        },
        currency: function(val, decimalPlaces) {
            if (isNaN(val) || val === null)
                return val;
            if (typeof decimalPlaces === 'undefined')
                decimalPlaces = 2;

            var v = format.fixed(val, decimalPlaces), // only 2 decimal places
                f = Math.floor((100 * (v - Math.floor(v))).toPrecision(2)); // for fractional part, only need 2 significant digits

            return string.substitute(
                Mobile.CultureInfo.numberFormat.currencySymbol
                + '${0}'
                + (decimalPlaces > 0 ? Mobile.CultureInfo.numberFormat.currencyDecimalSeparator : '')
                + '${1}', [
                    (Math.floor(v)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1'+Mobile.CultureInfo.numberFormat.currencyGroupSeparator.replace("\\.",'.')),
                    (f.toString().length < decimalPlaces) ? '0' + f.toString() : f ? f.toString() : ''
                ]
            ).replace(/ /g, '\u00A0'); //keep numbers from breaking
        },
        mail: function(val) {
            if (typeof val !== 'string')
                return val;

            return string.substitute('<a href="mailto:${0}">${0}</a>', [val]);
        }
    }));
});