var margin = {top: 20, right: 30, bottom: 30, left: 30},
    width = 1200 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#part6")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("https://raw.githubusercontent.com/mattlucich/data-608/first/module6/d3_lab/ue_industry.csv", function(data) {

  // List of groups = header of the csv files
  //var keys = data.columns.slice(1)

  var keys = ['Agriculture','Business services','Construction','Education and Health',
                'Finance','Government','Information','Leisure and hospitality','Manufacturing',
                'Mining and Extraction','Other','Self-employed','Transportation and Utilities',
                'Wholesale and Retail Trade'];



  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 120])
    .range([ 0, width ]);

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([-15000, 9000])
    .range([ height, 0 ]);

  // color palette
  var color = d3.scaleOrdinal()
    .domain(keys)
    .range(['#393b79', '#5253a3', '#6b6ecf', '#9c9ede', '#637939', '#8ca252', '#b5cf6b', 
                '#cedb9c', '#8b6d31', '#bd9e38', '#e7ba52', '#e7cb93', '#843c39', '#ad494a'])

  //stack the data?
  var stackedData = d3.stack()
    .offset(d3.stackOffsetSilhouette)
    .keys(keys)
    (data)

  // Show the areas
  svg
    .selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
      .style("fill", function(d) { return color(d.key); })
      .attr("d", d3.area()
        .x(function(d, i) { return x(d.data.index); })
        .y0(function(d) { return y(d[0]); })
        .y1(function(d) { return y(d[1]); })
    )

});
