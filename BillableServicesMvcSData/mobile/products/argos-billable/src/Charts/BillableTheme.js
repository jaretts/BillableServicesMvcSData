define('Mobile/BillableServices/Charts/BillableTheme', [
    'dojox/charting/Theme'
], function(
    Theme
    ) {

    var colors = ["#88cd0e", "#04cbb9", '#96b2b9'],
        defaultFill = {type: "linear", space: "shape", x1: 0, y1: 0, x2: 0, y2: 100};

    var billableTheme = new Theme({
        colors: colors,
        axis: {
            stroke:	{ // the axis itself
                color: "#54767e",
                width: 2
            },
            tick: {	// used as a foundation for all ticks
                color:     "#cccccc",
                position:  "center",
                font:      "normal normal bold 12pt Helvetica, Arial, sans-serif",	// labels on axis
                fontColor: "#1c2d31"								// color of labels
            },
            majorTick:	{ // major ticks on axis, and used for major gridlines
                width:  2,
                length: 0,
                color: '#96b2b9'
            },
            minorTick:	{ // minor ticks on axis, and used for minor gridlines
                width:  1,
                length: 0,
                color: '#b7cfd4'
            }
        },
        seriesThemes: [{
            fill: Theme.generateGradient(defaultFill, '#abc12c', '#00a1de'),
            stroke: { color: "#54767e" }
        }]
    });

    return billableTheme;
});