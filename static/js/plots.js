function buildPlots() {
    var url = "/charts";

    d3.json(url).then(function(data) {
        var names = [].concat.apply([],data[0]);
        var weight = [].concat.apply([],data[1]);
        var life_span = [].concat.apply([],data[2]);
        var lat = [].concat.apply([],data[3])
        var long = [].concat.apply([],data[4])
        var colors = x;
        var size = y;

        var trace = [{
            x: x,
            y: y,
            labels: labels,
            mode: 'markers',
            marker: {
                colors: colors,
                size: size
            }
        }];
        Plotly.newPlot('plot',trace);
    })
}
buildPlots();