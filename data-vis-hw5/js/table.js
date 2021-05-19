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

function renderTable(data) {
    let filDataset = filterData(data)
    var item = "";
    // document.getElementById('table')
    item += "<th>Language</th>";
    item += "<th>Popularity</th>";
    item += "<th><svg id='barheader' width='300' height='20'></svg></th>"; 
    item += "<th>Immediate Parent:</th>"; 
    for (var i = 0; i < filDataset.length; i++) {
        parForIcon = getParent(filDataset[i].Language)
        item += "<tr>";
        item += "<td>" + filDataset[i].Language + "</td>"
        item += "<td>" + filDataset[i].Popularity + "</td>"
        item += "<td><svg id='table"+ i + "' width='300' height='40'></svg></td>"
        item += `<td><img src='svgs/${parForIcon}.svg'></img></td>`
        item += "</tr>";
    }
    document.getElementById('table').innerHTML = item;

    for(var i = 0; i < filDataset.length; i++) {
        drawBarChart([filDataset[i]], `svg#table${i}`);
    }
}
function getParent(node) {
    parForIcon = 'none'
    if (node === "C/C++") {
        node = "C"
    }
    for (var i=0; i<dataset.length; i++) {
        if (dataset[i].id === node) {
            parForIcon = dataset[i].parent
        }
    }
    return parForIcon
}