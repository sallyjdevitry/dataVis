/** Class implementing the map view. */
class Map {
  /**
   * Creates a Map Object
   */
  constructor() {
    this.projection = d3.geoConicConformal().scale(150).translate([400, 350]);

  }

  /**
   * Function that clears the map
   */
  clearMap() {

    // ******* TODO: PART V*******
    // Clear the map of any colors/markers; You can do this with inline styling or by
    // defining a class style in styles.css

    // Hint: If you followed our suggestion of using classes to style
    // the colors and markers for hosts/teams/winners, you can use
    // d3 selection and .classed to set these classes on and off here.
    d3.selectAll('.countries')
      .classed('host', false)
      .classed('team', false)
    ;
    d3.select("#points").selectAll("*").remove();
  }

  /**
   * Update Map with info for a specific FIFA World Cup
   * @param wordcupData the data for one specific world cup
   */
  updateMap(data) {

    //Clear any previous selections;
    this.clearMap();

    // ******* TODO: PART V *******

    // Add a marker for the winner and runner up to the map.

    // Hint: remember we have a conveniently labeled class called .winner
    // as well as a .silver. These have styling attributes for the two
    // markers.


    // Select the host country and change it's color accordingly.
    // console.log(data.host);
    // console.log(data.host_country_code);
    let teams = '';
    data.teams_iso.forEach(function(t) {
      teams = teams + '#' + t + ',';
    });
    teams = teams.substring(0, teams.length-1);
    d3.selectAll(teams)
      .classed('team', true);

    d3.select(`#${data.host_country_code}`)
      .classed('host', true);


    // Iterate through all participating teams and change their color as well.

    // We strongly suggest using CSS classes to style the selected countries.


    // Add a marker for gold/silver medalists
    let radius = 5;
    d3.select("#points")
      .append("circle")
      .attr("cx", this.projection(data.win_pos)[0])
      .attr("cy", this.projection(data.win_pos)[1])
      .attr("r", radius)
      .attr("class", "gold")
    ;

    d3.select("#points")
      .append("circle")
      .attr("cx", this.projection(data.ru_pos)[0])
      .attr("cy", this.projection(data.ru_pos)[1])
      .attr("r", radius)
      .attr("class", "silver")
    ;
  }

  /**
   * Renders the actual map
   * @param the json data with the shape of all countries
   */
  drawMap(world) {

    //(note that projection is a class member
    // updateMap() will need it to add the winner/runner_up markers.)

    // ******* TODO: PART IV *******

    // Draw the background (country outlines; hint: use #map)
    // Make sure and add gridlines to the map

    let path = d3.geoPath()
      .projection(this.projection);

    let graticule = d3.geoGraticule().step([10, 10]);
    d3.select("#map").selectAll("path")
      .data([graticule()])
      .enter()
      .append("path")
      .attr("d", path)
      .attr('class', 'grat')
      .attr('fill', 'none')
    ;

    // console.log(world);
    let geoJSON = topojson.feature(world, world.objects.countries);
    console.log(geoJSON);

    d3.select("#map").selectAll("path")
      .data(geoJSON.features)
      .enter()
      .append("path")
      .attr("id", d => d.id)
      .attr("d", path)
      .attr('class', 'countries')
    ;


    // Hint: assign an id to each country path to make it easier to select afterwards
    // we suggest you use the variable in the data element's .id field to set the id

    // Make sure and give your paths the appropriate class (see the .css selectors at
    // the top of the provided html file)

  }


}
