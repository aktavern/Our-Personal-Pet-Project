function buildMetadata(name) {
  // use d3 to fetch the metadata from our flask app 
  // for a specific breed 
  d3.json(`/cat/metadata/${name}`).then(function(name){
    // select the panel with the id of "sample-metadata"
    var metadataDiv = d3.select("#sample-metadata");

    // use html to clear any existing metadata
    metadataDiv.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(name).forEach(([key, value])=>{
      var panel = metadataDiv.append("div");
      panel.text(`${key}: ${value}`);

  })
})
};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  });
}


function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
