function updateRace(dataset) {
    years = [
        { year: 'all years' }, { year: 2015 }, { year: 2016 }, { year: 2017 }, { year: 2018 }, { year: 2019 }
    ]
    d3.selectAll("rect").remove()
    d3.selectAll("path").remove()
    d3.selectAll("area").remove()
    d3.selectAll("circle").remove()
    d3.selectAll("text").remove()
    d3.selectAll("option").remove()
    d3.selectAll("g.tick").remove()

    getYearData(dataset, 'all years')

    var dropDown = d3.select("#choices")
    var options = dropDown.selectAll("option")
        .data(years)
        .enter()
        .append("option");

    options.text(function (d) {
        return d.year;
    })
        .attr("value", function (d) {
            return d.year;
        })

    var sel = d3.select("#choices")
    sel.on("change", change)
    function change() {
        getYearData(dataset, sel.node().value)
    }
}

function getYearData(dataset, year) {
    if (!year) {
        year = 'all years';
    }
    var aCount, wCount, hCount, bCount, oCount, uCount, nCount;
    aCount = wCount = hCount = bCount = oCount = uCount = nCount = 0;
    if (year === 'all years') {
        for (var i = 0; i < dataset.length; i++) {
            switch (dataset[i].race) {
                case 'A':
                    aCount++;
                    break;
                case 'W':
                    wCount++;
                    break;
                case 'H':
                    hCount++;
                    break;
                case 'B':
                    bCount++;
                    break;
                case 'O':
                    oCount++;
                    break;
                case 'N':
                    nCount++;
                    break;
                default:
                    uCount++;
            }
        }
    }
    else {
        for (var i = 0; i < dataset.length; i++) {
            var wholeDate = dataset[i].date
            var dateList = wholeDate.split("-")
            var justYear = dateList[0]
            if (justYear === year) {
                switch (dataset[i].race) {
                    case 'A':
                        aCount++;
                        break;
                    case 'W':
                        wCount++;
                        break;
                    case 'H':
                        hCount++;
                        break;
                    case 'B':
                        bCount++;
                        break;
                    case 'O':
                        oCount++;
                        break;
                    case 'N':
                        nCount++;
                        break;
                    default:
                        uCount++;
                }
            }
        }
    }
    thisYearsData = [
        { race: 'Asian', count: aCount },
        { race: 'White', count: wCount },
        { race: 'Hispanic', count: hCount },
        { race: 'Black', count: bCount },
        { race: 'Other', count: oCount },
        { race: 'Unknown', count: uCount },
        { race: 'Native American', count: nCount },
    ]
    renderNewBarchart(thisYearsData);
}

function renderNewBarchart(barData) {
    var rectWidth = 68;
    let rectangles = d3
        .select("g#chartgroup")
        .selectAll("rect")
        .data(barData);

    // add missing rectangles 
    rectangles
        .enter()
        .append("rect")
        .attr('x', function (d, i) { return i * (rectWidth); })
        .attr('y', 0)
        .attr("height", 0)
        .attr("width", rectWidth - 22)
        .attr("fill", 'green')
        .attr("transform", "translate(25, 0)")
        .on("mouseover", function () {
            d3.select(this).style("fill", "hsl(171, 100%, 41%)");
        })
        .on("mouseout", function () {
            d3.select(this).style("fill", "hsl(204, 86%, 53%)");
        })
        .merge(rectangles)  // Apply the following to all rectangles
        .transition()
        .duration(1000)
        .delay(100)
        .attr("height", d => d.count * .18);

    rectangles = d3
        .select("g#chartgroup")
        .selectAll("rect");
    rectangles
        .html("")
        .append("title")
        .text(d => `${d.count} deaths`)

    //add chart title
    let g = d3.select('g#noTranslate')
    g.append("text")
        .attr("class", "lilPadding")
        .attr("x", (400 / 2))
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Fatal Police Shootings by Race (2014-2019)");

    var xScale = d3.scaleBand().range([0, 500]).padding(0.4),
        yScale = d3.scaleLinear().range([500, 0]);
    xScale.domain(barData.map(function (barData) { return barData.race; }));
    yScale.domain([0, 2600]);

    theG = d3.select('#noTranslate')

    theG
        .attr("transform", "translate(70, 20)")
    //add x axis
    theG.append("g")
        .attr("transform", "translate(0," + 500 + ")")
        .call(d3.axisBottom(xScale));

    //add y axis
    theG.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function (d) {
            return d;
        }).ticks(10))
        .append("text")
        .attr("y", 0)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("value")

    //add axis labels
    theG.append("text")
        .attr("text-anchor", "end")
        .attr("x", 600 / 2)
        .attr("y", 535)
        .text("Race");

    theG.append("text")
        .attr("text-anchor", "end")
        .attr("y", -50)
        .attr("x", -220)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Fatal Shootings");
}

function updateTweets(dataset) {
    choices = [
        { type: 'by year' }, { type: 'by month' }
    ]
    months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ]
    years = [
        '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'
    ]
    d3.selectAll("rect").remove()
    d3.selectAll("path").remove()
    d3.selectAll("area").remove()
    d3.selectAll("circle").remove()
    d3.selectAll("text").remove()
    d3.selectAll("option").remove()
    d3.selectAll("g.tick").remove()

    getTweetData(dataset, 'by year')

    var dropDown = d3.select("#choices")
    var options = dropDown.selectAll("option")
        .data(years)
        .enter()
        .append("option");

    options.text(function (d) {
        return d.year;
    })
        .attr("value", function (d) {
            return d.year;
        })

    var sel = d3.select("#choices")
    sel.on("change", change)
    function change() {
        getTweetData(dataset, sel.node().value)
    }
}

function getTweetData(dataset, byWhat) {
    var count10, count11, count12, count13, count14, count15, count16, count17, count18, count19, other,
        janCount, febCount, marCount, aprCount, mayCount, junCount, julCount, augCount, sepCount, octCount, novCount, decCount;
    count10 = count11 = count12 = count13 = count14 = count15 = count16 = count17 = count18 = count19 = other =
        janCount = febCount = marCount = aprCount = mayCount = junCount = julCount = augCount = sepCount = octCount = novCount = decCount = 0;
    for (var i = 0; i < dataset.length; i++) {
        var splitStr = (dataset[i].tweetsByDate).split("-")
        var yearOnly = splitStr[0]
        var monthOnly = splitStr[1]
        if (byWhat === 'by year') {
            switch (yearOnly) {
                case '2010':
                    count10++;
                    break;
                case '2011':
                    count11++;
                    break;
                case '2012':
                    count12++;
                    break;
                case '2013':
                    count13++;
                    break;
                case '2014':
                    count14++;
                    break;
                case '2015':
                    count15++;
                    break;
                case '2016':
                    count16++;
                    break;
                case '2017':
                    count17++
                    break;
                case '2018':
                    count18++
                    break;
                case '2019':
                    count19++;
                    break;
                default:
                    other++;
            }
            lineData = [
                { time: '2010', tweets: count10 },
                { time: '2011', tweets: count11 },
                { time: '2012', tweets: count12 },
                { time: '2013', tweets: count13 },
                { time: '2014', tweets: count14 },
                { time: '2015', tweets: count15 },
                { time: '2016', tweets: count16 },
                { time: '2017', tweets: count17 },
                { time: '2018', tweets: count18 },
                { time: '2019', tweets: count19 },
            ]
        }
        else {
            switch (monthOnly) {
                case '01':
                    janCount++;
                    break;
                case '02':
                    febCount++;
                    break;
                case '03':
                    marCount++;
                    break;
                case '04':
                    aprCount++;
                    break;
                case '05':
                    mayCount++;
                    break;
                case '06':
                    junCount++;
                    break;
                case '07':
                    julCount++;
                    break;
                case '08':
                    augCount++
                    break;
                case '09':
                    sepCount++
                    break;
                case '10':
                    octCount++;
                    break;
                case '11':
                    novCount++;
                    break;
                case '12':
                    decCount++;
                    break;
                default:
                    other++;
            }
            lineData = [
                { time: 'Jan', tweets: janCount },
                { time: 'Feb', tweets: febCount },
                { time: 'Mar', tweets: marCount },
                { time: 'Apr', tweets: aprCount },
                { time: 'May', tweets: mayCount },
                { time: 'June', tweets: junCount },
                { time: 'July', tweets: julCount },
                { time: 'Aug', tweets: augCount },
                { time: 'Sept', tweets: sepCount },
                { time: 'Oct', tweets: octCount },
                { time: 'Nov', tweets: novCount },
                { time: 'Dec', tweets: decCount },
            ]
        }
    }
    renderNewLinechart(lineData);
}

function renderNewLinechart(lineData) {
    d3.selectAll("rect").remove()
    d3.selectAll("path").remove()
    d3.selectAll("area").remove()
    d3.selectAll("circle").remove()
    d3.selectAll("text").remove()
    d3.selectAll("g.tick").remove()

    let g = d3
        .select("g#chartgroup")

    var dropDown = d3.select("#choices")
    var options = dropDown.selectAll("option")
        .data(choices)
        .enter()
        .append("option");

    options.text(function (d) {
        return d.type;
    })
        .attr("value", function (d) {
            return d.type;
        })

    if (lineData[0].time === 'Jan') {
        var xScale = d3.scaleBand()
            .domain(months)
            .range([0, 500])
    }
    else {
        var xScale = d3.scaleBand()
            .domain(years)
            .range([0, 500])
    }

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(lineData, function (d) { return +d.tweets; })])
        .range([500, 0]);

    theG = d3.select('#noTranslate')

    theG
        .attr("transform", "translate(70, 20)")
    //add x axis
    theG.append("g")
        .attr("transform", "translate(0," + 500 + ")")
        .call(d3.axisBottom(xScale));

    //add y axis
    theG.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function (d) {
            return d;
        }).ticks(10))
        .append("text")
        .attr("y", 0)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("value")

    //add axis labels
    theG.append("text")
        .attr("text-anchor", "end")
        .attr("y", -50)
        .attr("x", -220)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Tweets");

    //add chart title
    let g2 = d3.select('g#noTranslate')
    g2.append("text")
        .attr("class", "lilPadding")
        .attr("x", (500 / 2))
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Trump Tweets 2010-2019");

    g.append("g")
        .attr("transform", "translate(0, 500) scale(1, -1)")
        .append("path")
        .datum(lineData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
            .x(function (d) { return xScale(d.time) })
            .y(function (d) { return yScale(d.tweets) })
        )

    path = d3
        .select("g#chartgroup")
        .selectAll("path");

    const pathLength = path.node().getTotalLength();

    path
        .attr("stroke-dashoffset", pathLength)
        .attr("stroke-dasharray", pathLength)

    const transitionPath = d3.transition().duration(2500);

    path
        .attr("stroke-dashoffset", pathLength)
        .attr("stroke-dasharray", pathLength)
        .transition(transitionPath)
        .attr("stroke-dashoffset", 0);
}

function updateCovid(dataset) {
    choices = [
        { type: 'new cases' }, { type: 'total cases' }
    ]

    d3.selectAll("rect").remove()
    d3.selectAll("path").remove()
    d3.selectAll("area").remove()
    d3.selectAll("circle").remove()
    d3.selectAll("text").remove()
    d3.selectAll("option").remove()
    d3.selectAll("g.tick").remove()

    getCovidData(dataset, 'by year')

    var dropDown = d3.select("#choices")
    var options = dropDown.selectAll("option")
        .data(choices)
        .enter()
        .append("option");

    options.text(function (d) {
        return d.type;
    })
        .attr("value", function (d) {
            return d.type;
        })

    var sel = d3.select("#choices")
    sel.on("change", change)
    function change() {
        getCovidData(dataset, sel.node().value)
    }
}

function getCovidData(dataset, byWhat) {
    d3.selectAll("rect").remove()
    d3.selectAll("path").remove()
    d3.selectAll("area").remove()
    d3.selectAll("circle").remove()
    d3.selectAll("text").remove()
    d3.selectAll("g.tick").remove()

    var xScale = d3.scaleBand([0, 500])
        .range([0, 500])
        .domain(dataset.map(function (dataset) { return dataset.date }))

    if (byWhat === 'total cases') {
        var yScale = d3.scaleLinear()
            .domain([0, 3600])
            .range([500, 0]);
    }
    else {
        var yScale = d3.scaleLinear()
            .domain([0, 800])
            .range([500, 0]);
    }

    if (byWhat === 'total cases') {
        var totalsDataset = dataset;
        for (var i = 0; i < dataset.length; i++) {
            if (dataset[i - 1]) {
                if (dataset[i - 1].cases) {
                    totalsDataset[i].cases = parseInt(dataset[i].cases) + parseInt(dataset[i - 1].cases)
                }
            }
        }
    }

    theG = d3.select('#noTranslate')
    theG
        .attr("transform", "translate(70, 20)")

    //add x axis
    theG.append("g")
        .attr("transform", "translate(-35, 500)")
        .call(d3.axisBottom(xScale));

    //add y axis
    theG.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function (d) {
            return d;
        }).ticks(10))
        .append("text")
        .attr("y", 0)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("value")

    //add axis labels
    theG.append("text")
        .attr("text-anchor", "end")
        .attr("x", 500 / 2)
        .attr("y", 535)
        .text("Date");

    theG.append("text")
        .attr("text-anchor", "end")
        .attr("y", -50)
        .attr("x", -220)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Covid-19 Cases");

    //create area generator
    if (totalsDataset != dataset) {
        var area = d3.area()
            .x(function (totalsDataset) { return xScale(totalsDataset.date) })
            .y0(yScale(0))
            .y1(function (totalsDataset) { return yScale(totalsDataset.cases) })
    }
    else {
        var area = d3.area()
            .x(function (dataset) { return xScale(dataset.date) })
            .y0(yScale(0))
            .y1(function (dataset) { return yScale(dataset.cases) })
    }

    //add area to chart using above generator
    let g = d3
        .select("g#chartgroup")

    g.append("g")
        .attr("transform", "translate(0, 500) scale(1, -1)")
        .append("path")
        .datum(dataset)
        .attr("d", area)
        .attr("class", "area")

    //add chart title
    let g2 = d3.select('g#noTranslate')
    g2.append("text")
        .attr("class", "lilPadding")
        .attr("x", (450 / 2))
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Covid-19 Cases from September 8th to September 14th, 2020");
}

function updateFires(dataset) {
    choices = [
        { type: 'by year' }, { type: 'by month' }
    ]
    d3.selectAll("rect").remove()
    d3.selectAll("path").remove()
    d3.selectAll("area").remove()
    d3.selectAll("circle").remove()
    d3.selectAll("text").remove()
    d3.selectAll("option").remove()
    d3.selectAll("g.tick").remove()

    renderNewScatterplot(dataset, 'by year');

    var dropDown = d3.select("#choices")
    var options = dropDown.selectAll("option")
        .data(choices)
        .enter()
        .append("option");

    options.text(function (d) {
        return d.type;
    })
        .attr("value", function (d) {
            return d.type;
        })

    var sel = d3.select("#choices")
    sel.on("change", change)
    function change() {
        renderNewScatterplot(dataset, sel.node().value)
    }
}

function renderNewScatterplot(dataset, byWhat) {
    choices = [
        { type: 'by year' }, { type: 'by month' }
    ]
    years = [
        '1932', '1970', '1977', '1987', '1999', '2002', '2003', '2006', '2007', '2008', '2009', '2012', '2013', '2015', '2017', '2018'
    ]
    months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ]
    d3.selectAll("rect").remove()
    d3.selectAll("path").remove()
    d3.selectAll("area").remove()
    d3.selectAll("circle").remove()
    d3.selectAll("text").remove()
    d3.selectAll("g.tick").remove()

    var yScale = d3.scaleLinear().domain([0, 500000]).range([500, 0]);

    if (byWhat === 'by month') {
        var xScale = d3.scaleBand().range([0, 600])
        xScale.domain(months)
    }
    else {
        var xScale = d3.scaleBand().range([0, 600])
        xScale.domain(years);
    }

    let g = d3.select("g#chartgroup")

    theG = d3.select('#noTranslate')

    theG
        .attr("transform", "translate(70, 20)")
    //add x axis
    theG.append("g")
        .attr("transform", "translate(0," + 500 + ")")
        .call(d3.axisBottom(xScale));

    //add y axis
    theG.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function (d) {
            return d;
        }).ticks(10))
        .append("text")
        .attr("y", 0)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("value")

    //add axis labels
    theG.append("text")
        .attr("text-anchor", "end")
        .attr("y", -60)
        .attr("x", -220)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Acres Burned");

    g.append("g")
        .attr("transform", "translate(20, 500) scale(1, -1)")
        .selectAll("dot")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function (d) { if (byWhat === 'by year') { return xScale(d.year) } else { return xScale(d.month) } })
        .attr("cy", function (d) { return yScale(d.acres) })
        .attr("r", 4.5)
        .style("fill", 'steelblue')
        .on("mouseover", function () {
            d3.select(this).style("fill", "hsl(171, 100%, 41%)");
        })
        .on("mouseout", function () {
            d3.select(this).style("fill", "steelblue");
        })

    dots = d3
        .select("g#chartgroup")
        .selectAll("circle");
    dots
        .html("")
        .append("title")
        .text(d => `${d.acres} acres burned`)

    //add chart title
    let g2 = d3.select('g#noTranslate')
    g2.append("text")
        .attr("class", "lilPadding")
        .attr("x", (400 / 2))
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Top 20 CA Wildfires");
}

function loadDataset(name) {
    const filename = `./data/${name}.csv`;
    div = d3.select('div#myDiv')
    if (name === 'police') {
        div.attr("hidden", null); //to show select box
        d3.csv(filename, d => ({ date: d.date, race: d.race })).then(updateRace);
    }
    else if (name === 'tweets') {
        div.attr("hidden", null);
        d3.csv(filename, d => ({ tweetsByDate: d.date })).then(updateTweets);
    }
    else if (name === 'covid') {
        div.attr("hidden", null);
        d3.csv(filename, d => ({ date: d.date, cases: d.cases })).then(updateCovid);
    }
    else if (name === 'fires') {
        div.attr("hidden", null);
        d3.csv(filename, d => ({ year: +d.year, month: d.month, acres: +d.acres })).then(updateFires);
    }
}
