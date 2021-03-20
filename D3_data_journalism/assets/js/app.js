// @TODO: YOUR CODE HERE!

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
var path = 'assets/data/data.csv'
d3.csv(path).then(function(newsData, err) {
    if (err) throw err;

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    newsData.forEach(function(data) {
      data.age = +data.age;
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
      data.smokes= +data.smokes;
      data.income = +data.income;
      console.log(data);
    });
