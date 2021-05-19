function renderChart(year, allData){
    d3.csv('data/clean-data.csv').then(function(data){
        const cols = data['columns']
        data = data[0]
        parsedData = []
        states = []
        totalShootings = 0
        totalWidth = 0
        for (const col of cols){
            totalShootings += parseInt(data[col])
        }
        for (const col of cols){
            colYear = parseInt(col.split("-")[1])
            state = col.split("-")[0]
            states.push(state)
            if (colYear == year){
                totalWidth += (parseInt(data[col]) / totalShootings) * 1500 * 5.5
                parsedData.push({
                    state: state,
                    num: parseInt(data[col]),
                    width: (parseInt(data[col]) / totalShootings) * 1500 * 5.5,
                    totalWidth: this.totalWidth
                })
            }
        }
        chartSVG.selectAll("*").remove()

        chartSVG.append("text")
        .text("Breakdown by State, A-Z")
        .attr("x", "500")
        .attr("y", "20")
        .style("user-select", "none")
        chartSVG.selectAll("rect")
        .data(parsedData)
        .enter()
        .append("rect")
        .attr('x', (d, i) => i == 0 ? 0 : parsedData[i - 1].totalWidth)
        .attr('y', '50')
        .attr('height', '100')
        .attr('width', (d) => d.width)
        .style('fill', '#add8e6')
        .attr('stroke', 'black')
        chartSVG.on("mousedown", function(){
            brushing = true
            console.log('start')
            chartSVG.select("#brush").remove()
            var p = d3.mouse(this)
            chartSVG.append("rect")
            .attr('id', "brush")
            .attr('x', p[0])
            .attr('y', 30)
            .attr('height', 140)
            .attr('width', 0)
            .attr('stroke', 'black')
            .style('fill', "blue")
            .style('opacity', 0.4)
        })
        .on("mousemove", function() {
          
            var brush = chartSVG.select("#brush")
            if (brushing){
                console.log('dragging')
                var p = d3.mouse(this);
                newWidth = p[0] - parseInt(brush.attr("x"))
                if (newWidth < 0){
                    newWidth = 0
                }
                brush.attr("width", newWidth)
            }
        })
        .on("mouseup", function() {
            brushing = false
            console.log('done')
            const start = parseInt(chartSVG.select("#brush").attr("x"))
            const end = parseInt(chartSVG.select("#brush").attr('width')) + start
            if (end - start > 0){
            var brushedStates = []
            for (const state of parsedData){
                if (state.totalWidth >= start && state.totalWidth <= end){
                    
                    brushedStates.push(state.state)
                }
            }
            infoPanel = d3.select('#infoSVG')
            infoPanel.selectAll('text').remove()

            infoPanel.append('text')
            .attr('x', 30)
            .attr('y', 20)
            .style('text-decoration', 'underline')
            .text('States selected in Brush')

            infoPanel.selectAll("text")
                .data(brushedStates)
                .enter()
                .append("text")
                .attr("x", 30)
                .attr("y", (d,i) => 30 + i*20)
                .text(d => d)

            infoPanel.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", 340)
                .attr("width", 340)
                .attr('class', 'border-rect')
                .style("fill", "none")


            renderRace(year, allData, brushedStates)
            }
        })
    });
}
function filterByRace(year, allData, states) {
    
    var W = 0;
    var H = 0;
    var B = 0;
    var A = 0;
    var O = 0;
    var U = 0;
    var N = 0;
    for (shooting of allData){
        shootingYear = shooting.date.split("-")[0]
        
        if (parseInt(shootingYear) == year && states.includes(shooting.state)){
            if (shooting.race == "W"){
                W += 1
            }
            else if (shooting.race == "H"){
                H += 1
            }
            else if (shooting.race == "B"){
                B += 1
            }
            else if (shooting.race == "A"){
                A += 1
            }
            else if (shooting.race == "O"){
                O += 1
            }
            else if (shooting.race == "N"){
                N += 1
            }
            else {
                U += 1
            }
        }
        
    }
    return {
        A: A,
        B: B,
        H: H,
        N: N,
        O: O,
        U: U,
        W: W
    }
}
function renderRace(year, allData, states){
    console.log(states)
    raceSVG.selectAll("*").remove()
    const raceTotals = []
    for (const [race, total] of Object.entries(filterByRace(year, allData, states))){
        raceTotals.push({race: race, total: total})
    }
    console.log(raceTotals)
    raceSVG.append("text")
    .text("Breakdown by Race")
    .attr("x", 200)
    .attr("y", 30)
    raceSVG.append("line")
    .attr("x1", 15)
    .attr("x2", 15)
    .attr("y1", 0)
    .attr("y2", 350)
    .attr("stroke-width", 1)
    .style("stroke", "black")
    raceSVG.append("line")
    .attr("y1", 350)
    .attr("y2", 350)
    .attr("x1", 15)
    .attr("x2", 600)
    .attr("stroke-width", 1)
    .style("stroke", "black")

    raceSVG.append("line")
    .attr("y1", 172)
    .attr("y2", 172)
    .attr("x1", 15)
    .attr("x2", 25)
    .attr("stroke-width", 1)
    .style("stroke", "black")

    raceSVG.append("line")
    .attr("y1", 5)
    .attr("y2", 5)
    .attr("x1", 10)
    .attr("x2", 20)
    .attr("stroke-width", 2)
    .style("stroke", "black")
    raceSVG.append("text")
    .text("500")
    .attr("y", 15)
    .attr("x", 25)
    raceSVG.append("text")
    .text("250")
    .attr("x", 25)
    .attr("y", 180)

    raceSVG.selectAll("rect")
    .data(raceTotals)
    .enter()
    .append("rect")
    .attr("width", 20)
    .attr("x", (d, i) => 70 + (i * 70))
    .attr("height", (d) => (d.total / 500) * 350)
    .style("fill", 'grey')
    .style("stroke", 'black')
    .attr("y", (d) => 350 - ((d.total / 500) * 350))
    .append("svg:title")
    .text(function(d, i) { return d.total + ' fatalities'});

    let count = 0
    for (race of raceTotals){
        raceSVG.append("text")
        .text(race.race)
        .attr("y", 370)
        .attr("x", 72 + (count * 70))
        count += 1
    }
    raceSVG.append("text")
    .text("Key: A - Asian, B - Black, H - Hispanic, N - Native American, O - Other, U - Unknown, W - White")
    .attr("x", 20)
    .attr("y", 390)
    .style("font-size", 12)
}