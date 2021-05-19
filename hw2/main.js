barData = [
  { race: 'Asian', count: 93 },
  { race: 'White', count: 2555 },
  { race: 'Hispanic', count: 930 },
  { race: 'Black', count: 1329 },
  { race: 'Other', count: 47 },
  { race: 'Unknown', count: 591 },
  { race: 'Native American', count: 79 },
]

function init() {
  //BARCHART
  let svg = d3.select('body')
    .append('svg')
    .attr('width', 700)
    .attr('height', 700)
    .attr('margin', 400)
    .attr('class', 'mysvg');

  //add title
  svg.append("text")
    .attr("x", (700 / 2))
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Fatal Police Shootings by Race (2014-2019)");

  var xScale = d3.scaleBand().range([0, 500]).padding(0.4),
    yScale = d3.scaleLinear().range([500, 0]);

  var g = svg.append("g")
    .attr("transform", "translate(" + 50 + "," + 50 + ")");

  xScale.domain(barData.map(function (barData) { return barData.race; }));
  yScale.domain([0, 2600]);

  //add x axis
  g.append("g")
    .attr("transform", "translate(0," + 500 + ")")
    .call(d3.axisBottom(xScale));

  //add y axis
  g.append("g")
    .call(d3.axisLeft(yScale).tickFormat(function (d) {
      return d;
    }).ticks(10))
    .append("text")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("value")

  //add axis labels
  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", 600 / 2)
    .attr("y", 600)
    .text("Race");

  svg.append("text")
    .attr("text-anchor", "end")
    .attr("y", 0)
    .attr("x", -250)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Fatal Shootings");

  //add bars
  g.selectAll(".bar")
    .data(barData)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function (barData) { return xScale(barData.race); })
    .attr("y", function (barData) { return yScale(barData.count); })
    .attr("width", xScale.bandwidth())
    .attr("height", function (barData) { return 500 - yScale(barData.count); });

  //LINE CHART
  lineData = [
    { year: 2010, tweets: 143 },
    { year: 2011, tweets: 869 },
    { year: 2012, tweets: 4193 },
    { year: 2013, tweets: 8203 },
    { year: 2014, tweets: 6001 },
    { year: 2015, tweets: 7707 },
    { year: 2016, tweets: 3945 },
    { year: 2017, tweets: 2231 },
    { year: 2018, tweets: 3001 },
    { year: 2019, tweets: 4590 }
  ]
  let svg1 = d3.select('body')
    .append('svg')
    .attr('width', 700)
    .attr('height', 700)
    .attr('margin', 200);

  //add title
  svg1.append("text")
    .attr("x", (700 / 2))
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Tweets Sent Out by Donald Trump by Year");

  var xScale = d3.scaleBand().range([0, 500]),
    yScale = d3.scaleLinear().range([500, 0]);

  var g = svg1.append("g")
    .attr("transform", "translate(" + 50 + "," + 50 + ")");

  xScale.domain(lineData.map(function (lineData) { return lineData.year; }));
  yScale.domain([0, 8300]);

  //add x axis
  g.append("g")
    .attr("transform", "translate(0," + 500 + ")")
    .call(d3.axisBottom(xScale));

  //add y axis
  g.append("g")
    .call(d3.axisLeft(yScale).tickFormat(function (d) {
      return d;
    }).ticks(10))
    .append("text")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("value")

  //add axis labels
  svg1.append("text")
    .attr("text-anchor", "end")
    .attr("x", 600 / 2)
    .attr("y", 600)
    .text("Year");

  svg1.append("text")
    .attr("text-anchor", "end")
    .attr("y", 0)
    .attr("x", -250)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Tweets");

  //create line generator
  var line = d3.line()
    .x(function (lineData) { return xScale(lineData.year) })
    .y(function (lineData) { return yScale(lineData.tweets) })

  //add path using above line generator
  g.append("path")
    .datum(lineData)
    .attr("class", "line")
    .attr("d", line)

  //AREA CHART
  areaData = [
    { date: '9/8', cases: 326 },
    { date: '9/9', cases: 314 },
    { date: '9/10', cases: 346 },
    { date: '9/11', cases: 656 },
    { date: '9/12', cases: 572 },
    { date: '9/13', cases: 628 },
    { date: '9/14', cases: 563 },
  ]
  let svg2 = d3.select('body')
    .append('svg')
    .attr('width', 700)
    .attr('height', 700)
    .attr('margin', 200);

  //add title
  svg2.append("text")
    .attr("x", (700 / 2))
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("New Covid-19 Cases from September 8th to September 14th, 2020.");

  var xScale = d3.scaleBand().range([0, 500]),
    yScale = d3.scaleLinear().range([500, 0]);

  var g = svg2.append("g")
    .attr("transform", "translate(" + 50 + "," + 50 + ")");

  xScale.domain(areaData.map(function (areaData) { return areaData.date; }));
  yScale.domain([0, 700]);

  //add x axis
  g.append("g")
    .attr("transform", "translate(0," + 500 + ")")
    .call(d3.axisBottom(xScale));

  //add y axis
  g.append("g")
    .call(d3.axisLeft(yScale).tickFormat(function (d) {
      return d;
    }).ticks(10))
    .append("text")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("value")

  //add axis labels
  svg2.append("text")
    .attr("text-anchor", "end")
    .attr("x", 600 / 2)
    .attr("y", 600)
    .text("Date");

  svg2.append("text")
    .attr("text-anchor", "end")
    .attr("y", 0)
    .attr("x", -250)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Covid-19 Cases");

  //create area generator
  var area = d3.area()
    .x(function (areaData) { return xScale(areaData.date) })
    .y0(yScale(0))
    .y1(function (areaData) { return yScale(areaData.cases) })

  //add area to chart using above generator
  g.append("path")
    .datum(areaData)
    .attr("class", "area")
    .attr("d", area)

  //SCATTERPLOT
  scatterData = [
    { year: 1932, acres: 220000 },
    { year: 1970, acres: 175425 },
    { year: 1987, acres: 145980 },
    { year: 1997, acres: 177866 },
    { year: 1999, acres: 140948 },
    { year: 2002, acres: 150696 },
    { year: 2003, acres: 273246 },
    { year: 2006, acres: 162702 },
    { year: 2007, acres: 240207 },
    { year: 2007, acres: 197990 },
    { year: 2008, acres: 192038 },
    { year: 2008, acres: 162818 },
    { year: 2009, acres: 160557 },
    { year: 2012, acres: 271911 },
    { year: 2013, acres: 257314 },
    { year: 2015, acres: 151623 },
    { year: 2017, acres: 281893 },
    { year: 2018, acres: 459123 },
    { year: 2018, acres: 229651 },
    { year: 2018, acres: 153336 },
  ]
  let svg3 = d3.select('body')
    .append('svg')
    .attr('width', 700)
    .attr('height', 700)
    .attr('margin', 200);

  //add title
  svg3.append("text")
    .attr("x", (700 / 2))
    .attr("y", 14)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Top 20 Wildfires in California");

  var xScale = d3.scaleBand().range([0, 500]),
    yScale = d3.scaleLinear().domain([0, 50]).range([500, 0]);

  var g = svg3.append("g")
    .attr("transform", "translate(" + 50 + "," + 50 + ")");

  xScale.domain(scatterData.map(function (scatterData) { return scatterData.year; }));
  yScale.domain([0, 500000]);

  //add x axis
  g.append("g")
    .attr("transform", "translate(0," + 500 + ")")
    .call(d3.axisBottom(xScale));

  //add y axis
  g.append("g")
    .call(d3.axisLeft(yScale).tickFormat(function (d) {
      return d;
    }).ticks(10))
    .append("text")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("value")

  //add axis labels
  svg3.append("text")
    .attr("text-anchor", "end")
    .attr("x", 600 / 2)
    .attr("y", 600)
    .text("Year");

  svg3.append("text")
    .attr("text-anchor", "end")
    .attr("x", 88)
    .attr("y", 39)
    .text("Acres Burned");

  //add dots for each data point
  g.append('g')
    .selectAll("dot")
    .data(scatterData)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d.year) + 16 })
    .attr("cy", function (d) { return yScale(d.acres) })
    .attr("r", 3.2)
    .style("fill", 'steelblue')
}