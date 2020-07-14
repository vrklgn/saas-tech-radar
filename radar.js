// The MIT License (MIT)

// Copyright (c) 2017 Zalando SE

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


function radar_visualization(jsondata) {

  // custom random number generator, to make random sequence reproducible
  // source: https://stackoverflow.com/questions/521295


  var seed = 42;
  function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  function random_between(min, max) {
    return min + random() * (max - min);
  }

  function normal_between(min, max) {
    return min + (random() + random()) * 0.5 * (max - min);
  }


  const width = [1600];
  const height = [1000];
  // radial_min / radial_max are multiples of PI
  const quadrants = [
    { radial_min: 0, radial_max: 0.5, factor_x: 1, factor_y: 1 },
    { radial_min: 0.5, radial_max: 1, factor_x: -1, factor_y: 1 },
    { radial_min: -1, radial_max: -0.5, factor_x: -1, factor_y: -1 },
    { radial_min: -0.5, radial_max: 0, factor_x: 1, factor_y: -1 }
  ];

  const rings = [
    { radius: 100 },
    { radius: 180 },
    { radius: 270 },
    { radius: 360 }
  ];

  const title_offset =
    { x: -740, y: -420 };

  const footer_offset =
    { x: -740, y: 420 };

  const legend_offset = [
    { x: 450, y: 90 },
    { x: -740, y: 90 },
    { x: -740, y: -310 },
    { x: 450, y: -310 }
  ];

  const entriesdata = [
    {
        "label": "Google Hangouts Chat",
        "ring": 0,
        "quadrant": 3,
        "new": 1,
    },
    {
        "label": "Google Hangouts Chat",
        "ring": 1,
        "quadrant": 3,

    },
  ];

  const quadrantsdata = [
    { name: "Platforms" },
    { name: "Compliance" },
    { name: "Collaboration" },
    { name: "Communication" }
  ];

  const ringsdata = [
    { name: "Invest", color: "#F28066" },
    { name: "Support", color: "#AEDB50" },
    { name: "Assess", color: "#F3E302" },
    { name: "Drop", color: "#A458A6" }
  ];

  function polar(cartesian) {
    var x = cartesian.x;
    var y = cartesian.y;
    return {
      t: Math.atan2(y, x),
      r: Math.sqrt(x * x + y * y)
    }
  }

  function cartesian(polar) {
    return {
      x: polar.r * Math.cos(polar.t),
      y: polar.r * Math.sin(polar.t)
    }
  }

  function bounded_interval(value, min, max) {
    var low = Math.min(min, max);
    var high = Math.max(min, max);
    return Math.min(Math.max(value, low), high);
  }

  function bounded_ring(polar, r_min, r_max) {
    return {
      t: polar.t,
      r: bounded_interval(polar.r, r_min, r_max)
    }
  }

  function bounded_box(point, min, max) {
    return {
      x: bounded_interval(point.x, min.x, max.x),
      y: bounded_interval(point.y, min.y, max.y)
    }
  }

  function segment(quadrant, ring) {
    var polar_min = {
      t: quadrants[quadrant].radial_min * Math.PI,
      r: ring === 0 ? 30 : rings[ring - 1].radius
    };
    var polar_max = {
      t: quadrants[quadrant].radial_max * Math.PI,
      r: rings[ring].radius
    };
    var cartesian_min = {
      x: 15 * quadrants[quadrant].factor_x,
      y: 15 * quadrants[quadrant].factor_y
    };
    var cartesian_max = {
      x: rings[3].radius * quadrants[quadrant].factor_x,
      y: rings[3].radius * quadrants[quadrant].factor_y
    };
    return {
      clipx: function(d) {
        var c = bounded_box(d, cartesian_min, cartesian_max);
        var p = bounded_ring(polar(c), polar_min.r + 15, polar_max.r - 15);
        d.x = cartesian(p).x; // adjust data too!
        return d.x;
      },
      clipy: function(d) {
        var c = bounded_box(d, cartesian_min, cartesian_max);
        var p = bounded_ring(polar(c), polar_min.r + 15, polar_max.r - 15);
        d.y = cartesian(p).y; // adjust data too!
        return d.y;
      },
      random: function() {
        return cartesian({
          t: random_between(polar_min.t, polar_max.t),
          r: normal_between(polar_min.r, polar_max.r)
        });
      }
    }
  }

  // position each entry randomly in its segment
  for (var i = 0; i < jsondata.length; i++) {
    var entry = jsondata[i];
    entry.segment = segment(entry.quadrant, entry.ring);
    entry.active = 1;
    var point = entry.segment.random();
    entry.x = point.x;
    entry.y = point.y;
    entry.color = ringsdata[entry.ring].color;
  }

  // partition entries according to segments
  var segmented = new Array(4);
  for (var quadrant = 0; quadrant < 4; quadrant++) {
    segmented[quadrant] = new Array(4);
    for (var ring = 0; ring < 4; ring++) {
      segmented[quadrant][ring] = [];
    }
  }
  for (var i=0; i<jsondata.length; i++) {
    var entry = jsondata[i];
    segmented[entry.quadrant][entry.ring].push(entry);
  }

  // assign unique sequential id to each entry
  var id = 1;
  for (var quadrant of [2,3,1,0]) {
    for (var ring = 0; ring < 4; ring++) {
      var entries = segmented[quadrant][ring];
      entries.sort(function(a,b) { return a.label.localeCompare(b.label); })
      for (var i=0; i<entries.length; i++) {
        entries[i].id = "" + id++;
      }
    }
  }

  function translate(x, y) {
    return "translate(" + x + "," + y + ")";
  }

  function viewbox(quadrant) {
    return [
      Math.max(0, quadrants[quadrant].factor_x * 400) - 420,
      Math.max(0, quadrants[quadrant].factor_y * 400) - 420,
      440,
      440
    ].join(" ");
  }
// d3.select("svg#" + "radar").selectAll.remove();
d3.select("svg#" + "radar").selectAll("g").remove()

  var svg = d3.select("svg#" + "radar")
    .style("background-color", "#FFF")
    .style("color", "#474747")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 1600 1000")
    .classed("svg-content", true);

  var radar = svg.append("g");
  radar.attr("transform", translate(width/2, height/2));

  var grid = radar.append("g");

  // draw grid lines
  grid.append("line")
    .attr("x1", 0).attr("y1", -360)
    .attr("x2", 0).attr("y2", 360)
    .style("stroke", "#d5d5d5")
    .style("stroke-width", 4);
  grid.append("line")
    .attr("x1", -360).attr("y1", 0)
    .attr("x2", 360).attr("y2", 0)
    .style("stroke", "#d5d5d5")
    .style("stroke-width", 4);

  // background color. Usage `.attr("filter", "url(#solid)")`
  // SOURCE: https://stackoverflow.com/a/31013492/2609980
  var defs = grid.append("defs");
  var filter = defs.append("filter")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 1)
    .attr("height", 1)
    .attr("id", "solid");
  filter.append("feFlood")
    .attr("flood-color", "rgb(0, 0, 0, 0.8)");
  filter.append("feComposite")
    .attr("in", "SourceGraphic");

  // draw rings
  for (var i = 0; i < rings.length; i++) {
    grid.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", rings[i].radius)
      .style("fill", "none")
      .style("stroke", "#d5d5d5")
      .style("stroke-width", 4);
      grid.append("text")
        .text(ringsdata[i].name)
        .attr("y", -rings[i].radius + 62)
        .attr("text-anchor", "middle")
        .style("fill", "#474747")
        .style("font-family", "Dosis, sans-serif")
        .style("text-transform", "uppercase")
        .style("font-size", 27)
        .style("font-weight", "bold")
        .style("pointer-events", "none")
        .style("user-select", "none");
    }


  function legend_transform(quadrant, ring, index=null) {
    var dx = ring < 2 ? 0 : 180;
    var dy = (index == null ? -16 : index * 22);
    if (ring % 2 === 1) {
      dy = dy + 36 + segmented[quadrant][ring-1].length * 25;
    }
    return translate(
      legend_offset[quadrant].x + dx,
      legend_offset[quadrant].y + dy
    );
  }

    // footer
    radar.append("text")
      .attr("transform", translate(footer_offset.x, footer_offset.y))
      .text("★ New Initiative     ● Tool")
      .attr("xml:space", "preserve")
      .style("font-family", "Dosis, sans-serif")
      .style("fill", "#474747")
      .style("font-weight", "bold")
      .style("text-transform", "uppercase")
      .style("font-size", "20");


    // legend
    var legend = radar.append("g");
    for (var quadrant = 0; quadrant < 4; quadrant++) {
      legend.append("text")
        .attr("transform", translate(
          legend_offset[quadrant].x ,
          legend_offset[quadrant].y - 60
        ))
        .text(quadrantsdata[quadrant].name)
        .style("font-family", "Dosis, sans-serif")
        .style("font-size", "30")
        .style("fill", "#474747")
        .style("text-transform", "uppercase")
        .style("font-weight", "bold")
      for (var ring = 0; ring < 4; ring++) {
        legend.append("text")
          .attr("transform", legend_transform(quadrant, ring))
          .text(ringsdata[ring].name)
          .style("font-family", "Dosis, sans-serif")
          .style("font-size", "22")
          .style("font-weight", "bold")
          .style("text-transform", "uppercase")
          .style("fill", "#474747");
;

        legend.selectAll(".legend" + quadrant + ring)
          .data(segmented[quadrant][ring])
          .enter()
            .append("text")
            .attr("dominant-baseline","middle")
              .attr("transform", function(d, i) { return legend_transform(quadrant, ring, i); })
              .attr("class", "legend" + quadrant + ring)
              .attr("id", function(d, i) { return "legendItem" + d.id; })
              .text(function(d, i) { return d.id + ". " + d.label; })
              .style("font-family", "Open Sans, sans-serif")
              .style("font-size", "13")
              .style("fill", "#474747")
              .on("mouseover", function(d) { showBubble(d); highlightLegendItem(d); })
              .on("mouseout", function(d) { hideBubble(d); unhighlightLegendItem(d); });
      }
    }


  // layer for entries
  var rink = radar.append("g")
    .attr("id", "rink");

  // rollover bubble (on top of everything else)
  var bubble = radar.append("g")
    .attr("id", "bubble")
    .attr("x", 0)
    .attr("y", 0)
    .style("opacity", 0)
    .style("pointer-events", "none")
    .style("user-select", "none");
  bubble.append("rect")
    .attr("rx", 4)
    .attr("ry", 4)
    .style("fill", "#acacac");
  bubble.append("text")
    .style("font-family", "Roboto, sans-serif")
    .style("font-size", "8px")
    .style("fill", "#fff");
  bubble.append("path")
    .attr("d", "M 0,0 10,0 5,8 z")
    .style("fill", "#acacac");

  function showBubble(d) {
    d3.select("#bubble text").remove
      var tooltip = d3.select("#bubble text")
        .text(d.label);
      var bbox = tooltip.node().getBBox();
      d3.select("#bubble")
        .attr("transform", translate(d.x - bbox.width / 2, d.y - 16))
        .style("opacity", 0.8);
      d3.select("#bubble rect")
        .attr("x", -5)
        .attr("y", -bbox.height)
        .attr("width", bbox.width + 10)
        .attr("height", bbox.height + 4);
      d3.select("#bubble path")
        .attr("transform", translate(bbox.width / 2 - 5, 3));
    }

  function hideBubble(d) {
    var bubble = d3.select("#bubble")
      .attr("transform", translate(0,0))
      .style("opacity", 0);
  }

  function highlightLegendItem(d) {
    var legendItem = document.getElementById("legendItem" + d.id);
    legendItem.setAttribute("font-weight", "bold");
    legendItem.setAttribute("cursor", "default");
  }

  function unhighlightLegendItem(d) {
    var legendItem = document.getElementById("legendItem" + d.id);
    legendItem.removeAttribute("font-weight");
  }

  // draw blips on radar
  var blips = rink.selectAll(".blip")
    .data(jsondata)
    .enter()
      .append("g")
        .attr("class", "blip")
        .attr("transform", function(d, i) { return legend_transform(d.quadrant, d.ring, i); })
        .on("mouseover", function(d) { showBubble(d); highlightLegendItem(d); })
        .on("mouseout", function(d) { hideBubble(d); unhighlightLegendItem(d); });

  // configure each blip
  blips.each(function(d) {
    var blip = d3.select(this);


    // blip shape
    if (d.new > 0) {
      blip.append("path")
      .attr("d", "M 0.000 20.000 L 23.511 32.361 L 19.021 6.180 L 38.042 -12.361 L 11.756 -16.180 L 0.000 -40.000 L -11.756 -16.180 L -38.042 -12.361 L -19.021 6.180 L -23.511 32.361 L 0.000 20.000")
       .attr("transform", "scale(0.35)")
        .attr("dominant-baseline","middle")
        .style("fill", d.color);
    }else {
      blip.append("circle")
        .attr("r", 9)
        .attr("fill", d.color);
    }

    // blip text

      var blip_text = d.id;
      blip.append("text")
        .text(blip_text)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline","middle")
        .style("fill", "#000")
        .style("font-family", "Open Sans, sans-serif")
        .style("font-weight", "bold")
        .style("font-size", function(d) { return blip_text.length > 2 ? "9" : "10"; })
        .style("pointer-events", "none")
        .style("user-select", "none");
    }
  );

  // make sure that blips stay inside their segment
  function ticked() {
    blips.attr("transform", function(d) {
      return translate(d.segment.clipx(d), d.segment.clipy(d));
    })
  }

  // distribute blips, while avoiding collisions
  d3.forceSimulation()
    .nodes(jsondata)
    .velocityDecay(0.19) // magic number (found by experimentation)
    .force("collision", d3.forceCollide().radius(12).strength(0.85))
    .on("tick", ticked);
}
