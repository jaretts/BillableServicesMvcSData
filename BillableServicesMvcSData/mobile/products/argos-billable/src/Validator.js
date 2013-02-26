define('Mobile/BillableServices/Validator', [
    'dojo/_base/lang',
    'dojo/string'
], function(
    lang,
    string
) {
    return lang.setObject('Mobile.BillableServices.Validator', {
        exists: {
            fn: function(value) {
                return !value;
            },
            message: "The field '${2}' must have a value."
        },
        notEmpty: {
            test: /.+/,
            message: "The field '${2}' cannot be empty."
        },
        hasText: {
            test: /\w+/,
            message: "The field '${2}' must contain some text."
        },
        isInteger: {
            test: /^\d+$/,
            message: "The value '${0}' is not a valid number."
        },
        isDecimal: {
            test: /^[\d.]+$/,
            message: "The value '${0}' is not a valid number."
        },
        isCurrency: {
            fn: function(value, field){
                return !(new RegExp(string.substitute('^[\\d]+(\\.\\d{1,${0}})?$',[
                    Mobile.CultureInfo.numberFormat.currencyDecimalDigits || '2'])).test(value));
            },
            message: "The value '${0}' is not a valid currency number."
        },
        isInt32: {
            fn: function(value, field) {
                if (value && (!/^\d{1,10}$/.test(value) || parseInt(value, 10) > 2147483647))
                    return true;
                return false;
            },
            message: "The field '${2}' value exceeds the allowed numeric range."
        },
        greaterThanZero: {
            fn: function(value, field) {
                return parseFloat(value) <= 0;
            },
            message: "The field '${2}' value must be greater than zero."
        },
        atLeastZero: {
            fn: function(value, field) {
                return parseFloat(value) < 0;
            },
            message: "The field '${2}' value must be zero or greater."
        },
        exceedsMaxTextLength: {
            fn: function(value, field) {
                if (value && field && field.maxTextLength && value.length > field.maxTextLength)
                    return true;
                return false;
            },
            message: "The field '${2}' value exceeds the allowed limit in length."
        },
        hasAtLeastOne: {
            fn: function(value, field) {
                if (value && value.length <= 0) return true;
                return false;
            },
            message: "The field '${2}' must contain at least one item."
        },
        isZipCode: {
            test: /(^(?!0{5})(\d{5})(?!-?0{4})(-?\d{4})?$)/,
            message: "The value '${0}' is not a valid zip code."
        }
    });
});