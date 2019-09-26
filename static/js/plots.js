// Create function to build each plot using plotly
function buildPlots() {
    // url from our flask app
    var url = "/charts";

    // plot for total cats per country
    d3.json(url).then(function(data) {
        
        // convert array of arrays into single array 
        var cat_locs = [].concat.apply([],data[6]);

        // create new arrays to split data
        var place = [];
        var count = [];

        // if data is a number, add it to the count; else, add it to the place
        cat_locs.forEach(d => {
            if (typeof d == 'number') {
                count.push(d)
            }
            else {
                place.push(d)
            }
        });

        // create trace for pie chart
        var trace = [{
            values: count,
            labels: place,
            type: "pie"
        }];

        // set layout
        var layout = {
            height: 400,
            width: 500
        };

        // plot the pie chart
        Plotly.newPlot("catlocs",trace,layout)
    })

    // plot for life span vs weight
    d3.json(url).then(function(data) {
        // convert array of arrays into new array of just data 
        var names = [].concat.apply([],data[0]);
        var weight = [].concat.apply([],data[1]);
        var life_span = [].concat.apply([],data[2]);

        // create the layout for the bubble chart
        var bubbleLayout = {
            margin: { t: 0},
            hovermode: "closest",
            xaxis: { title: "Average Weight"},
            yaxis: { title: "Average Life Span"},
        };

        // set the trace
        var trace = [{
            x: weight,
            y: life_span,
            text: names,
            mode: 'markers',
            marker: {
                colors: weight,
                size: life_span
            }
        }];
        // plot the bubble chart
        Plotly.newPlot('plot',trace, bubbleLayout);
    })

    // plot the cats with most favorable characteristics
    d3.json(url).then(function(data) {
        // convert array of arrays into new array of just data 
        var best_cats = [].concat.apply([],data[4]);

        // create new arrays to split data 
        var names = [];
        var score = [];

        // if data is a number, add it to one array instead of the other
        best_cats.forEach(cat => {
            if (typeof cat == 'number') {
                names.push(cat)
            }
            else {
                score.push(cat)
            }
        });

        // set the trace and layout
        var trace = [{
            x: names.slice(0,10).reverse(),
            y: score.slice(0,10).reverse(),
            name: "Most Favorable Cats",
            type: "bar",
            orientation: "h"
        }];

        var layout = {
            title: "Most Favorable Cats",
            xaxis: { title: "Sum of Most Favorable Characteristics"},
            yaxis: { title: "Breed"},
            font: {
                size:10
            }
        };

        // plot the bar chart
        Plotly.newPlot("plot2",trace,layout)

        
    })

    // plot for the least favorable cats
    d3.json(url).then(function(data) {
        // convert array of arrays into new array of just data 
        var worst_cats = [].concat.apply([],data[5]);

        // create new arrays to split data 
        var names = [];
        var score = [];

        // if data is a number, add it to one array instead of the other
        worst_cats.forEach(cat => {
            if (typeof cat == 'number') {
                names.push(cat)
            }
            else {
                score.push(cat)
            }
        });

        // set the trace and layout
        var trace = [{
            x: names.slice(0,10).reverse(),
            y: score.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }];

        var layout = {
            title: "Least Favorable Cats",
            xaxis: { title: "Sum of Least Favorable Characteristics"},
            yaxis: { title: "Breed"},
            font: {
                size:10
            }
        };

        // plot the bar chart
        Plotly.newPlot("plot3",trace,layout)
    })

}
buildPlots();