const dataset = [
  { id: "Assembly" },
  { id: "Fortran", parent: "Assembly" },
  { id: "BCPL", parent: "Assembly" },
  { id: "Cobol", parent: "Assembly" },
  { id: "Lisp", parent: "Assembly" },
  { id: "SetL", parent: "Assembly" },
  { id: "Basic", parent: "Fortran" },
  { id: "Prolog", parent: "Fortran" },
  { id: "B", parent: "BCPL" },
  { id: "Scheme", parent: "Lisp" },
  { id: "Ada", parent: "SetL" },
  { id: "Visual-Basic", parent: "Basic" },
  { id: "Erlang", parent: "Prolog" },
  { id: "C", parent: "B" },
  { id: "Common Lisp", parent: "Scheme" },
  { id: "Haskell", parent: "C" },
  { id: "Ocaml", parent: "C" },
  { id: "Julia", parent: "C" },
  { id: "Python", parent: "C" },
  { id: "Java", parent: "C" },
  { id: "Ruby", parent: "C" },
  { id: "Cpp", parent: "C" },
  { id: "Go", parent: "C" },
  { id: "Perl", parent: "C" },
  { id: "CSharp", parent: "C" },
  { id: "PHP", parent: "C"},
  { id: "Objective-C", parent: "C" },
  { id: "F#", parent: "Ocaml" },
  { id: "Rust", parent: "Ocaml" },
  { id: "Kotlin", parent: "Java" },
  { id: "Abap", parent: "Java"},
  { id: "Scala", parent: "Java"},
  { id: "Groovy", parent: "Java" },
  { id: "Lua", parent: "Cpp" },
  { id: "Swift", parent: "Cpp" },
  { id: "JavaScript", parent: "Cpp" },
  { id: "Dart", parent: "JavaScript" },
];

async function init() {
  svgTree = d3.select("svg#treeSVG");
  svgInfo = d3.select("svg#infoSVG");

  var plData = await d3.csv("data/plDataFormatted.csv").then(function (rows) {
    return rows;
  });

  // draw the bar chart with most recent year by default
  renderTable(plData);
  drawTree(dataset);
}

//called when select box is changed. Gets value and updates chart.
function getValueAndUpdate(selectObject) {
  var value = selectObject.value;
  drawBarChart(value, plData);
}


function drawTree() {
  let makeHierarchy = d3
    .stratify()
    .id((d) => {
      return d.id;
    })
    .parentId((d) => {
      if (d.parent) return d.parent;
      return null;
    });
  let root = makeHierarchy(dataset);
  // Add nodes and links to the tree
  let mapFunction = d3.tree().size([560, 560]);
  let mapped = mapFunction(root);

  let nodes = mapped.descendants();
  let nodesWithParents = mapped.descendants().slice(1);

  let svg = d3.select("#treeSVG");

  // Draw lines
  svg
    .attr('margin', '20px')
    .selectAll("path")
    .data(nodesWithParents)
    .enter()
    .append("g")
    .attr("transform", "translate(0,20)")
    .append("path")
    .attr("class", "treePath")
    .attr("id", (d) => `link${d.id}`)
    .attr("d", (d) => {
      // return `M ${d.x},${d.y} ${d.parent.x},${d.parent.y}`;
      let mid = -(d.parent.y - d.y) / 2;
      return (
        `M ${d.x},${d.y} C ${d.x},${d.y - mid},` +
        `${d.parent.x},${d.parent.y + mid},` +
        `${d.parent.x},${d.parent.y}`
      );
    })
    .style("stroke", "#080C36")
    .style("stroke-width", 2.5)
    .style("fill", "none");

  // Draw circles
  let enterSet = svg.selectAll("circle").data(nodes).enter();
  let node = enterSet.append("g")
  .attr("id", (d) => `g${d.id}`)
  .attr("transform", (d) => {
    return `translate(${d.x}, ${d.y + 20})`;
  });
  node
    .append("circle")
    .attr("r", 14)
    .attr("id", (d) => `c${d.id}`)
    .style("fill", "#B8DBD9")
    // text needs CSS in order to not block mouse events on circle:
    // pointer-events: none;
    .on("click", (d) => {console.log(d.id)})

  node
    .append("text")
    .attr("id", (d) => `t${d.id}`)
    .style("font-size", "12")
    .attr("dx", -7)
    .attr("dy", 5)
    .text((d) => d.id);
}

function triggerPathBold(language) {
  var cleanLanguage = language
  if (language === 'C/C++') {
    cleanLanguage = 'C'
  }
  if (language === 'C#') {
    cleanLanguage = 'CSharp'
  }

  d3.selectAll('circle').style("stroke", "#B8DBD9").attr("r", "14")
  d3.selectAll('.treePath').style("stroke-width", 2.5)

  d3.select(`#c${cleanLanguage}`).attr("r", 22)
  .style("stroke", "yellow")
  .style("stroke-width", "3.3px")

  linksToBold = []
  findParents(cleanLanguage, linksToBold)
  for (var id in linksToBold) {
    d3.select(`#link${linksToBold[id]}`).style("stroke-width", 5)
  }
}
function findParents(node, linksToBold) {
  for (var i=0; i<dataset.length; i++) {
    if (dataset[i].id === node) {
      linksToBold.push(dataset[i].id)
      findParents(dataset[i].parent, linksToBold)
    }
  }
}

