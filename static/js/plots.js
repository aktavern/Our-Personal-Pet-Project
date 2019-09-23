function buildPlots() {
    var url = "/charts";

    d3.json(url).then(function(data) {
        var affection = [].concat.apply([],data[0]);
        var child_friendly = [].concat.apply([],data[1]);
        var dog_friendly = [].concat.apply([],data[2]);
        var energy_level = [].concat.apply([],data[3]);
        var intelligence = [].concat.apply([],data[4]);
        var social_needs = [].concat.apply([],data[5]);

        var trace1 = {
            x: affection,
            name: 'affection',
            autobinx: true,
            histnorm: "count",
            marker: {
                color: "red",
                line: {
                    color: "black",
                    width:1
                }
            },
            opacity:0.5,
            type: "histogram",  
        };
        
        var trace2 = {
            x: child_friendly,
            name: "child friendliness",
            autobinx: true,
            histnorm: "count",
            marker: {
                color: "orange",
                line: {
                    color: "black",
                    width: 1
                }
            },
            opacity: 0.5,
            type:"histogram"
        };

        var trace3 = {
            x: dog_friendly,
            name: 'dog friendliness',
            autobinx: true,
            histnorm: "count",
            marker: {
                color: "yellow",
                line: {
                    color: "black",
                    width:1
                }
            },
            opacity:0.5,
            type: "histogram",  
        };

        var trace4 = {
            x: energy_level,
            name: 'energy level',
            autobinx: true,
            histnorm: "count",
            marker: {
                color: "green",
                line: {
                    color: "black",
                    width:1
                }
            },
            opacity:0.5,
            type: "histogram",  
        };

        var trace5 = {
            x: intelligence,
            name: 'intelligence',
            autobinx: true,
            histnorm: "count",
            marker: {
                color: "blue",
                line: {
                    color: "black",
                    width:1
                }
            },
            opacity:0.5,
            type: "histogram",  
        };

        var trace6 = {
            x: social_needs,
            name: 'social needs',
            autobinx: true,
            histnorm: "count",
            marker: {
                color: "purple",
                line: {
                    color: "black",
                    width:1
                }
            },
            opacity:0.5,
            type: "histogram",  
        };

        var data = [trace1, trace2, trace3, trace4, trace5, trace6]

        var layout1 = {
            title: "Cat Characteristic Comparisons",
            showlegend: true,
        };

    Plotly.newPlot("plot",data,layout1);
    
    });
}
buildPlots();