function buildPlots() {
    var url = "/charts";

    d3.json(url).then(function(data) {
        var names = [].concat.apply([],data[0]);
        var weight = [].concat.apply([],data[1]);
        var life_span = [].concat.apply([],data[2]);

        var bubbleLayout = {
            margin: { t: 0},
            hovermode: "closest",
            xaxis: { title: "Weight"},
            yaxis: { title: "Life Span"},
            title: { title: "Test"}
        };

        var trace = [{
            x: weight,
            y: life_span,
            text: names,
            mode: 'markers',
            marker: {
                colors: weight,
                size: life_span,
                colorscale: "Earth"
            }
        }];
        Plotly.newPlot('plot',trace, bubbleLayout);
    })
}
buildPlots();