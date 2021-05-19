let svgBar = null;
let svgMap = null;
let svgInfo = null;
let data2015 = null;
let data2016 = null;
let data2017 = null;
let data2018 = null;
let data2019 = null;
let currData = data2019;
let worldMap = new Map();
let bolded = '';
/*let lineGenerator = d3.line()
  .x((d,i) => i*480/9+50)
  .y(d => 420 - d.count*.04)
;*/

//called when select box is changed. Gets value and updates chart.
function getValueAndUpdate(selectObject) {
  var value = selectObject.value;
  drawChart(value)
}

function drawChart(year) {
  currData = data2019;
  switch (year) {
    case '2015':
      currData = data2015;
      break;
    case '2016':
      currData = data2016;
      break;
    case '2017':
      currData = data2017;
      break;
    case '2018':
      currData = data2018;
      break;
    case '2019':
      currData = data2019;
      break;
    default:
      currData = data2019;
  }
  //plot the top and bottom three happiest countries.
  rowsToChart = currData.slice(0, 3);
  bottomThree = currData.slice(currData.length - 3, currData.length);
  //add bottom three countries to the rowsToChart
  for (var i = 0; i < bottomThree.length; i++) {
    rowsToChart.push(bottomThree[i]);
  }
  renderNewBarChart(rowsToChart)
}

//draws new barchart dependent on selected year
function renderNewBarChart(data) {
  d3.selectAll("text").remove()
  d3.selectAll("g.tick").remove()

  let height = 300;
  let width = 250;

  // Create the x and y scales
  let xScale = d3.scaleBand()
    .domain(data.map(function (data) { return data.Country; }))
    .range([0, width])
    .padding(0.25);

  let yScale = d3.scaleLinear()
    .domain([1, 7.8])
    .range([height, 0]);

  let yaxisWidth = 60;

  // Create the axes
  let xAxis = d3.axisBottom(xScale);
  let gX = svgBar.append("g");
  gX
    .attr("transform", `translate(${yaxisWidth}, ${height})`)
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(90)")
    .attr("x", 9)
    .attr("dy", "-.35em")
    .style("text-anchor", "start");

  let yAxis = d3.axisLeft(yScale);
  let gY = svgBar.append("g");
  gY
    .attr("transform", `translate(${yaxisWidth}, 0)`)
    .call(yAxis)
    .selectAll("text");

  // Create the bars
  let rectangles = svgBar
    .selectAll("rect")
    .data(data);

  rectangles
    .enter().append('rect')
    .attr('y', height)
    .attr('width', xScale.bandwidth())
    .attr('x', (d, i) => yaxisWidth + xScale(d.Country))
    .attr('height', 0)
    .on('click', (d, i) => {triggerCountryBold(d.Country)})
    .merge(rectangles)
    .transition()
    .attr('y', (d, i) => yScale(d.Score))
    .attr('height', (d, i) => height - yScale(d.Score))
    ;
  //reselect rectangles to add tooltip titles
  rectangles = svgBar
    .selectAll("rect");
  rectangles
    .html("")
    .append("title")
    .text(d => `${d.Score} happiness score`)

  //add axis labels
  svgBar.append("text")
    .attr("text-anchor", "end")
    .attr("x", 70 + width / 2)
    .attr("y", height + 80)
    .text("Country");
  svgBar.append("text")
    .attr("text-anchor", "end")
    .attr("y", 10)
    .attr("x", - 110)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Happiness Score");
}

//called when a rectangle is clicked
function triggerCountryBold(country) {
  //remove old info panel text
  d3.selectAll("text.info").remove()

  //TODO bold the country passed in
  console.log('I should bold ', country)
  if(country == 'Denmark' && bolded != '#DNK'){
    d3.selectAll('#DNK').style('fill', 'red').style('stroke-width', '4px').style('stroke', 'black');
    if(bolded != '') d3.selectAll(bolded).style('fill', '#d9d9d9').style('stroke-width', '1px').style('stroke', '#f7f7f7');
    bolded = '#DNK';
  }
  else if(country == 'Burundi' && bolded != '#BDI'){
    d3.selectAll('#BDI').style('fill', 'red').style('stroke-width', '6px').style('stroke', 'black');
    if(bolded != '') d3.selectAll(bolded).style('fill', '#d9d9d9').style('stroke-width', '1px').style('stroke', '#f7f7f7');
    bolded = '#BDI';

  }
  else if(country == 'Syria' && bolded != '#SYR'){
    d3.selectAll('#SYR').style('fill', 'red').style('stroke-width', '6px').style('stroke', 'black');
    if(bolded != '') d3.selectAll(bolded).style('fill', '#d9d9d9').style('stroke-width', '1px').style('stroke', '#f7f7f7');
    bolded = '#SYR';

  }
  else if(country == 'Togo' && bolded != '#TGO'){
    d3.selectAll('#TGO').style('fill', 'red').style('stroke-width', '6px').style('stroke', 'black');
    if(bolded != '') d3.selectAll(bolded).style('fill', '#d9d9d9').style('stroke-width', '1px').style('stroke', '#f7f7f7');
    bolded = '#TGO';
  }
  else if(country == 'Central African Republic' && bolded != '#CAF'){
    d3.selectAll('#CAF').style('fill', 'red').style('stroke-width', '2px').style('stroke', 'black');
    if(bolded != '') d3.selectAll(bolded).style('fill', '#d9d9d9').style('stroke-width', '1px').style('stroke', '#f7f7f7');
    bolded = '#CAF';
  }
  else if(country == 'Norway' && bolded != '#NOR'){
    d3.selectAll('#NOR').style('fill', 'red').style('stroke-width', '2px').style('stroke', 'black');
    if(bolded != '') d3.selectAll(bolded).style('fill', '#d9d9d9').style('stroke-width', '1px').style('stroke', '#f7f7f7');
    bolded = '#NOR';
  }
  else if(country == 'Switzerland' && bolded != '#CHE'){
    d3.selectAll('#CHE').style('fill', 'red').style('stroke-width', '2px').style('stroke', 'black');
    if(bolded != '') d3.selectAll(bolded).style('fill', '#d9d9d9').style('stroke-width', '1px').style('stroke', '#f7f7f7');
    bolded = '#CHE';
  }
  else if(country == 'Iceland' && bolded != '#ISL'){
    d3.selectAll('#ISL').style('fill', 'red').style('stroke-width', '2px').style('stroke', 'black');
    if(bolded != '') d3.selectAll(bolded).style('fill', '#d9d9d9').style('stroke-width', '1px').style('stroke', '#f7f7f7');
    bolded = '#ISL';
  }
  else if(country == 'Tanzania' && bolded != '#TZA'){
    d3.selectAll('#TZA').style('fill', 'red').style('stroke-width', '2px').style('stroke', 'black');
    if(bolded != '') d3.selectAll(bolded).style('fill', '#d9d9d9').style('stroke-width', '1px').style('stroke', '#f7f7f7');
    bolded = '#TZA';
  }
  else if(country == 'Finland' && bolded != '#FIN'){
    d3.selectAll('#FIN').style('fill', 'red').style('stroke-width', '2px').style('stroke', 'black');
    if(bolded != '') d3.selectAll(bolded).style('fill', '#d9d9d9').style('stroke-width', '1px').style('stroke', '#f7f7f7');
    bolded = '#FIN';
  }
  else if(country == 'South Sudan' && bolded != '#SSD'){
    d3.selectAll('#SSD').style('fill', 'red').style('stroke-width', '2px').style('stroke', 'black');
    if(bolded != '') d3.selectAll(bolded).style('fill', '#d9d9d9').style('stroke-width', '1px').style('stroke', '#f7f7f7');
    bolded = '#SSD';
  }
  else if(country == 'Afghanistan' && bolded != '#AFG'){
    d3.selectAll('#AFG').style('fill', 'red').style('stroke-width', '2px').style('stroke', 'black');
    if(bolded != '') d3.selectAll(bolded).style('fill', '#d9d9d9').style('stroke-width', '1px').style('stroke', '#f7f7f7');
    bolded = '#AFG';
  }
  //display selected country info in the info panel ?
  svgInfo = d3.select("#infoSVG")
//  svgInfo.append("text").attr("y", 15).attr("x", 15).attr("class", "info").text("Happiness Info on " + country)
  columns = currData['columns'];
  for(let i =0; i < currData.length; i++){
    if (currData[i]['Country'] == country){
      for(let j =0; j <columns.length; j++){
//        if(currData[i][columns[j]] != country)
        svgInfo.append("text")
          .attr("y", 15 + j*20)
          .attr("x", 15)
          .attr("class", "info")
          .text(columns[j] + ': ' + currData[i][columns[j]])
      }
    }
  }    //......
}

function init() {
  svgBar = d3.select('svg#barSVG');
  svgMap = d3.select('svg#mapSVG');
  svgInfo = d3.select('svg#inforSVG');
  d3.csv('allYears/2015.csv').then(function (rows) {
    data2015 = rows;
    // stacking the load functions guarantees that all data is loaded before we do anything.
    d3.csv('allYears/2016.csv').then(function (rows) {
      data2016 = rows;
      d3.csv('allYears/2017.csv').then(function (rows) {
        data2017 = rows;
        d3.csv('allYears/2018.csv').then(function (rows) {
          data2018 = rows;
          d3.csv('allYears/2019.csv').then(function (rows) {
            data2019 = rows;
            //by default show 2015
            drawChart("2015")
            d3.json("data/world.json")
              .then(function(world) {
                worldMap.drawMap(world);
            });
            svgInfo = d3.select("#infoSVG")
            svgInfo.append("text")
              .attr("y", 15)
              .attr("x", 15)
              .attr("class", "info")
              .text('Select a bar to view stats on a country!');
          })
        })
      })
    })
  })

}
