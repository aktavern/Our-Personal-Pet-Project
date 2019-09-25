function buildPlots() {
    var url = "/charts";

    d3.json(url).then(function(data) {
        var names = [].concat.apply([],data[0]);
        var weight = [].concat.apply([],data[1]);
        var life_span = [].concat.apply([],data[2]);

        var bubbleLayout = {
            margin: { t: 0},
            hovermode: "closest",
            xaxis: { title: "Average Weight"},
            yaxis: { title: "Average Life Span"},
            title: { text: "Test"}
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

    d3.json(url).then(function(data) {
        var best_cats = [].concat.apply([],data[4]);

        var names = [];
        var score = [];

        best_cats.forEach(cat => {
            if (typeof cat == 'number') {
                names.push(cat)
            }
            else {
                score.push(cat)
            }
        });

        var trace = [{
            x: names.slice(0,10).reverse(),
            y: score.slice(0,10).reverse(),
            name: "Best Cats",
            type: "bar",
            orientation: "h"
        }];

        var layout = {
            title: "Best Cats",
        };

        Plotly.newPlot("plot2",trace,layout)

        
    })

    d3.json(url).then(function(data) {
        
        var worst_cats = [].concat.apply([],data[5]);

        var names = [];
        var score = [];

        worst_cats.forEach(cat => {
            if (typeof cat == 'number') {
                names.push(cat)
            }
            else {
                score.push(cat)
            }
        });

        var trace = [{
            x: names.slice(0,10).reverse(),
            y: score.slice(0,10).reverse(),
            name: "Worst Cats",
            type: "bar",
            orientation: "h"
        }];

        var layout = {
            title: "Worst Cats",
        };

        Plotly.newPlot("plot3",trace,layout)
    })

}
buildPlots();