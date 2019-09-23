function buildPlot() {
    var url = "/charts";

    d3.json(url).then(function(data) {
        var affection = [].concat.apply([],data[0]);
        var child_friendly = [].concat.apply([],data[1]);
        var dog_friendly = [].concat.apply([],data[2]);
        var energy_level = [].concat.apply([],data[3]);
        var intelligence = [].concat.apply([],data[4]);
        var social_needs = [].concat.apply([],data[5]);

        var trace1 = {
            x:affection,
            y:child_friendly,
            xaxis:"x1",
            yaxis:"y1",
            type:"bar"
        };

        var trace2 = {
            x:dog_friendly,
            y:energy_level,
            xaxis:"x2",
            yaxis:"y2",
            type:"bar"
        };

        var trace3 = {
            x:social_needs,
            y:intelligence,
            xaxis:"x3",
            yaxis:"y3",
            type:"bar"
        };

        var axis = {
            showline: true,
            zeroline: false,
            showgrid: true,
            mirror:true, 
            ticklen: 4, 
            gridcolor: '#ffffff',
            tickfont: {size: 10},
        };

        var axis1 = {domain: [0.5, 1], anchor: 'y1', showticklabels: false}
        var axis2 = {domain: [0.5, 1], anchor: 'y2', showticklabels: false}
        var axis3 = {domain: [0.5, 1], anchor: 'y3'}
        var axis4 = {domain: [0.66, 0.98], anchor: 'x1', hoverformat: '.2f'}
        var axis5 = {domain: [0.34, 0.64], anchor: 'x2', tickprefix: '$', hoverformat: '.2f'}
        var axis6 = {domain: [0.0, 0.32], anchor: 'x3', tickprefix: '\u20BF', hoverformat: '.2f'}

        var data = [trace1, trace2, trace3];

        var layout = {
            title: "Bitcoin mining stats for 180 days",
            plot_bgcolor: 'rgba(228, 222, 249, 0.65)',
            showlegend: false,
            xaxis1: Object.assign(axis1,axis),
            xaxis2: Object.assign(axis2,axis),          
            xaxis3: Object.assign(axis3,axis),
            yaxis1: Object.assign(axis4,axis),  
            yaxis2: Object.assign(axis5,axis),
            yaxis3: Object.assign(axis6,axis)
        };

    Plotly.newPlot("plot",data,layout);
    });
}
buildPlot();