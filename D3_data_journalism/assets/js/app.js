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
  .attr("height", svgHeight)
  .classed('chart', true);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
var path = 'assets/data/data.csv'
d3.csv(path).then(function(newsData, err) {
    if (err) throw err;

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    newsData.forEach(function(data) {
      // data.age = +data.age;
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
      // data.smokes= +data.smokes;
      // data.income = +data.income;
      console.log(data);
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(newsData, d => d.poverty), d3.max(newsData, d => d.poverty)])
      .range([0, width])
      .nice();

    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(newsData, d => d.healthcare), d3.max(newsData, d => d.healthcare)])
      .range([height, 0])
      .nice();

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(newsData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "10")
    .attr("fill", "lightblue")
    .attr("stroke-width", "1")
    .attr("stroke", "black")
    .attr("opacity", ".5");

    chartGroup.select("g")
    .selectAll("circle")
    .data(newsData)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .attr("dy",-395)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "black");

    console.log(stateData);

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .select('body')
      .append('div')
      .attr("class", "d3-tip")
      .offset([80, -60])
      .html(function(d) {
        return (`<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 1.5))
      .attr("dy", "1em")
      .attr("class", "aText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 1.5}, ${height + margin.top + 40})`)
      .attr("class", "aText")
      .text("Poverty (%)");
  }).catch(function(error) {
    console.log(error);
  });