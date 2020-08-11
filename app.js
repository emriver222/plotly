// Use D3 fetch to read the JSON file
//Read samples.json & Display the sample metadata
function getMetaData(sample) {
  d3.json("samples.json").then((data) => {

  
    //Read metadata from json
    let sampleData = data.metadata;
    //console.log(sampleData);
  
    let filterData = sampleData.filter(obj => obj.id == sample);
    var filterID = filterData[0];

    var sample_meta = d3.select("#sample-metadata").node();

    sample_meta.html("");

    var dropdownMenuID = dropdownMenu.id;
    console.log(dropdownMenuID);
  
 
    Object.entries(filterID).forEach(([key,value]) => {
      let row = sample_meta.append("b");
      row.text(`${key}:${value}`)
    });

    });
};

// Build Graphs

function buildPlots(sample){
  d3.json("samples.json").then((data) => {
      

      let sampleData = data.samples;

      let sampleSet = sampleData.filter(obj => obj.id == sample);
      let sampleId = sampleSet[0];
      

      let otu_ids = sampleId.otu_ids;
      let sample_values = sampleId.sample_values;
      let otu_labels = sampleId.otu_labels;

      // Bubble Chart

      //Set trace
      let trace1 = {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: 'markers',
          marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: "Blue",
              labels: otu_labels,
              type: 'scatter',
              opacity: 0.5
          }
        };
        
        let data1 = [trace1];
        
        let layout = {
          title: 'Bacteria Cultures per Sample',
          margin: {t:0 },
          hovermode: "closest",
          xaxis: { title: 'OTU ID' }
        };
        

      Plotly.newPlot('bubble', data1, layout);

      //Horizontal bar chart
      
      //Set y labels
      let y_lab = otu_ids.splice(0, 10).reverse()
      y_lab = y_lab.map(i => 'OTU ' + i);
      
      //Set trace
      let trace2 = {
        type: 'bar',
        x: sample_values.splice(0,10).reverse(),
        y: y_lab,
        text: otu_labels.splice(0,10).reverse(),
        orientation: 'h'
        };

        let data2 = [trace2];

        let layout2 = {
            margin: {t:0 },
            xaxis: { title: 'Sample Values' }
          };
      

      Plotly.newPlot('bar', data2, layout2);

  });
};


function init() {
  // Grab a reference to the dropdown select element
  let selector = d3.select("#selDataset");
  

  d3.json("samples.json").then((data) => {
      let sampleNames = data.names;
    Object.entries(sampleNames).forEach((sample) => {
      selector
        .append("option")
        .text(sample[1])
        .property("value", sample[1]);
        let firstSample = sampleNames[0];
    
        buildPlots(firstSample);
        getMetaData(firstSample);
    });
  });
}
    

function dynamic(newSample) {
    buildPlots(newSample);
    getMetaData(newSample);

}
  


init();