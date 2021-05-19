function renderMap(year, allData) {
    mapSVG.selectAll('text').remove()
    infoPanel = d3.select('#infoSVG')
    infoPanel.selectAll('text').remove()
    infoPanel.selectAll('rect').remove()
    
    //add title
    mapSVG.append('text')
        .attr('x', 300)
        .attr('y', 20)
        .text('Police Shootings by State ' + year)
        .attr('class', 'title-text')

    drawUSMap(year, allData)
    //draw legend
    legendData = [
        { range: "0-1", color: "#D6FFB7", yLoc: 700 },
        { range: "1-2", color: "#79D671", yLoc: 740 },
        { range: "2-3", color: "#23BE8F", yLoc: 780 },
        { range: "3-4", color: "#479190", yLoc: 820 },
        { range: ">4", color: "#095955", yLoc: 860 }
    ]

    legendG = mapSVG.append('g')
    legendG.attr('transform', 'translate(-20, 0)')

    legendG.append('text')
        .attr('x', 50)
        .attr('y', 660)
        .text('Number of police shootings')
        .attr('class', 'legend-text')
    legendG.append('text')
        .attr('x', 50)
        .attr('y', 680)
        .text('in every 500,000 people')
        .attr('class', 'legend-text')

    legendG.selectAll('#legend-squares')
        .data(legendData)
        .enter()
        .append('rect')
        .attr('width', 40)
        .attr('height', 40)
        .attr('x', 80)
        .attr('y', d => d.yLoc)
        .attr('stroke-width', 1)
        .attr('fill', d => d.color)

    legendG.selectAll('#legend-text')
        .data(legendData)
        .enter()
        .append('text')
        .attr('x', 125)
        .attr('y', d => d.yLoc + 25)
        .text(d => d.range)
        .attr('class', 'legend-text')
}

function drawUSMap(year) {
    const svgWidth = 1000;
    const svgHeight = 800;
    d3.csv('data/state-position.csv').then(function (rows) {
        posData = rows;
        const dataPositions = []
        for (var i = 0; i < posData.length; i++) {
            objToAdd = { state: posData[i].Abbreviation, stateLong: posData[i].State, row: posData[i].Row, col: posData[i].Column }
            dataPositions.push(objToAdd)
        }
        maxColumns = d3.max(dataPositions, d => +d.col) + 1;
        maxRows = d3.max(dataPositions, d => +d.row) + 1;

        let w = svgWidth / maxColumns;
        let h = svgHeight / maxRows;

        mapG = mapSVG.append('g')

        // Define the div for the tooltip
        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        var yrString = "POPESTIMATE" + year;

        mapG.selectAll('rect')
            .data(dataPositions)
            .enter()
            .append('rect')
            .attr('x', d => w * d.col)
            .attr('y', d => h * d.row)
            .attr('width', w)
            .attr('height', h)
            .attr('stroke-width', 1)
            .style('fill', d => chooseStateColor(d.stateLong, d.state, year))
            .classed('tile', true)
            .attr('id', 'stateTile')
            .on("mouseover", function (d) {
                div.transition()
                    .duration(200)
                    .style("opacity", 1);
                div.html(d.stateLong + "<br/>" + "Population: " + getPop(d.stateLong)[0][yrString] + "<br/>" + "Shootings: " + getShootingsThisYear(d.state, year))
                    .style("font-size", "20px")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        mapG.selectAll("#tilename")
            .data(dataPositions)
            .enter()
            .append('text')
            .attr('x', d => w * d.col + w / 2)
            .attr('y', d => h * d.row + h / 2)
            .attr('dy', '-.5em')
            .text(d => `${d.state}`)
            .attr('text-anchor', 'middle')
            .classed('tilestext', true)
            .attr('id', 'tilename')
            .attr('pointer-events', 'none')
            ;
    })
}

function chooseStateColor(stateLong, stateShort, year) {
    var yrString = "POPESTIMATE" + year;
    popThisYear = getPop(stateLong)[0][yrString]
    color = getColor(popThisYear, stateShort, year)
    return color
}

function getColor(popThisYear, stateShort, year) {
    var stateYr = stateShort + "-" + year;
    var shootings = shootingData[0][stateYr]

    //gives how many out of 500,000 people
    var normalized = (shootings / popThisYear) * 500000;
    const color = heatMapColorforValue(normalized);
    return color;
}

function heatMapColorforValue(value) {
    if (value <= 1) {
        return "#D6FFB7"
    }
    else if (value > 1 && value <= 2) {
        return "#79D671"
    }
    else if (value > 2 && value <= 3) {
        return "#23BE8F"
    }
    else if (value > 3 && value <= 4) {
        return "#479190"
    }
    else if (value > 4) {
        return "#095955"
    }
}

function getPop(stateLong) {
    return popData.filter(function (d) {
        if (d["NAME"] == stateLong) {
            return d
        }
    })
}

function getShootingsThisYear(state, year) {
    stateYr = state + "-" + year;
    return shootingData[0][stateYr]
}