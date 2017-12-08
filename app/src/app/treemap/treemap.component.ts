import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.styl']
})
export class TreemapComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var width = 960,
    height = 1060;

var format = d3.formatLocale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["£", ""]
}).format("$,d");

var nest = d3.nest()
    .key(function(d) { return d.nombre_del_proveedor; })
    .key(function(d) { return d.estatus; })
 
    .rollup(function(d) { return d3.sum(d, function(d) { return d.Paid_fare; }); });

var treemap = d3.treemap()
    .size([width, height])
    .padding(1)
    .round(true);

d3.csv("Home_Office_Air_Travel_Data_2011.csv", type, function(error, data) {
  if (error) throw error;

  var root = d3.hierarchy({values: nest.entries(data)}, function(d) { return d.values; })
      .sum(function(d) { return d.value; })
      .sort(function(a, b) { return b.value - a.value; });

  treemap(root);

  var node = d3.select("body")
    .selectAll(".node")
    .data(root.leaves())
    .enter().append("div")
      .attr("class", "node")
      .style("left", function(d) { return d.x0 + "px"; })
      .style("top", function(d) { return d.y0 + "px"; })
      .style("width", function(d) { return d.x1 - d.x0 + "px"; })
      .style("height", function(d) { return d.y1 - d.y0 + "px"; });

  node.append("div")
      .attr("class", "node-label")
      .text(function(d) { return d.parent.parent.data.key + " to " + d.parent.data.key + "\n" + d.data.key; });

  node.append("div")
      .attr("class", "node-value")
      .text(function(d) { return format(d.value); });
});

function type(d) {
  d.Paid_fare = +d.Paid_fare;
  return d;
}
  }

}
