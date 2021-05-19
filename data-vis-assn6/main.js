mapSVG = d3.select("svg#mapSVG");
raceSVG = d3.select("svg#raceSVG");
timelineSVG = d3.select("svg#timelineSVG");
chartSVG = d3.select("svg#chartSVG");
brushing = false;
//import state population data
d3.csv('data/state-pops.csv').then(function (rows) {
    popData = rows;
    d3.csv('data/clean-data.csv').then(function (rowstwo) {
        shootingData = rowstwo;
    });
});

async function init() {
    //import the shootings data
    d3.csv('data/fatal-police-shootings-data.csv').then(function (rows) {
        allData = rows;
        
        renderTimeline(allData);
        renderMap(2020, allData);
        renderChart(2020, allData, selection=null);
    });
}

function renderTimeline(allData) {
    yearsOfData = [{ year: '2015' }, { year: '2016' }, { year: '2017' }, { year: '2018' }, { year: '2019' }, { year: '2020' }]
    let radius = 6
    let xScale = d3.scaleLinear()
        .domain([0, this.yearsOfData.length / 2])
        .range([3 * radius, 200]);

    let timelineG = timelineSVG.append('g')

    timelineG.attr("transform", "scale(2, 2)")

    timelineG.selectAll('line')
        .data(yearsOfData)
        .enter()
        .append('line')
        .attr('x1', (d, i) => xScale(i))
        .attr('y1', radius + 4)
        .attr('x2', (d, i) => i > 0 ? xScale(i - 1) : xScale(i))
        .attr('y2', radius + 4)
        .attr('class', 'lineChart')

    timelineG.selectAll('circle')
        .data(yearsOfData)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => xScale(i))
        .attr('cy', radius + 4)
        .attr('r', radius)
        .attr('id', d => `y${d.year}`)
        .attr('class', 'timeline-dots')
        .on('click', d => { triggerDraw(d.year, allData) })

    timelineG.selectAll('text')
        .data(yearsOfData)
        .enter()
        .append('text')
        .attr('x', (d, i) => xScale(i) - radius)
        .attr('y', radius + 8)
        .attr('dy', '1.3em')
        .text(d => d.year)
        .attr('class', 'year-text')
        ;

    timelineG.select(`#y2020`)
    .attr('r', 9)
}

function triggerDraw(year, allData) {
    raceSVG.selectAll("*").remove()
    renderMap(year, allData);
    renderChart(year, allData);
    changeTimeline(year)
}

function changeTimeline(year) {
    allCircles = d3.selectAll('circle')
    allCircles
    .attr('r', 6)

    currCircle = d3.select(`#y${year}`)
    currCircle
    .attr('r', 9)
    .classed('timeline-dots', false)
    .classed('big-dots', true)
}