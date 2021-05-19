function filterData(data) {
    let value = [];
    let count = 0;
    let rollingTotal = 0;
    for(var i = 0; i < data.length-1; i++) {
        if(data[i].Language == data[i+1].Language) {
            count++;
            if(data[i].Popularity != 0){
                rollingTotal += parseInt(data[i].Popularity);
            }
        } else {
            count++;
            console.log(count);
            var average = (rollingTotal += parseInt(data[i].Popularity))/count;
            value.push({'Language': data[i].Language, 'Popularity': average});
            rollingTotal = 0;
            average = 0;
            count = 0;
        }
    }
    return value;
}


function drawBarChart(data, name) {
    console.log(name);
    svgBar = d3.select(name);

    //TODO
    //look into plData and get specific year data
    // let dataset = filterData(data);
    d3.selectAll("g.tick").remove();
  
    let height = 35;
    let width = 300;
  
    // Create the x and y scales
    let xScale = d3
      .scaleBand()
      .domain(
        data.map(function (data) {
          return data.Language;
        })
      )
      .range([0, width])
      .padding(0.25);
  
    let yScale = d3.scaleLinear().domain([26, 0]).range([width, 0]);
  
    let yaxisWidth = 5;
  
  
    svgTableHeader = d3.select("svg#barheader");
    let yAxis = d3.axisBottom(yScale);
    let gY = svgTableHeader.append("g");
    gY.attr("transform", `translate(${yaxisWidth})`)
      .call(yAxis)
      .selectAll("text")
      .attr("y", 10)
  
    // Create the bars
    let rectangles = svgBar.selectAll("rect").data(data);
  
    rectangles
      .enter()
      .append("rect")
      .attr("y", height)
      .attr("width", 0)
      .attr("y", 10)
      .attr("height", 0)
      .on('click', (d, i) => {triggerPathBold(d.Language)})
      .merge(rectangles)
      .transition()
      .attr("x", 5)
      .attr("height", 35)
      .attr("width", (d, i) => (yScale(d.Popularity)))
      .style("stroke-width", "1px")
      .style("stroke", "black");
    //   .attr("height", (d,i) => {
        
    //       console.log("hit this", d.Popularity)
    //       return height - yScale(d.Popularity);
    
    //   });
    //reselect rectangles to add tooltip titles
    rectangles = svgBar.selectAll("rect");
    rectangles
      .html("")
      .append("title")
      .text((d) => `${d.Popularity} popularity`);
  
    //add axis labels
    // svgBar
    //   .append("text")
    //   .attr("text-anchor", "end")
    //   .attr("x", 70 + width / 2)
    //   .attr("y", height + 80)
    //   .text("Language");
    // svgBar
    //   .append("text")
    //   .attr("text-anchor", "end")
    //   .attr("y", 10)
    //   .attr("x", -110)
    //   .attr("dy", ".75em")
    //   .attr("transform", "rotate(-90)")
    //   .text("Popularity");
  }