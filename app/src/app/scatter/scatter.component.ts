import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { schemeCategory20 } from 'd3';


@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.styl']
})
export class ScatterComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 700 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var color = d3.scaleOrdinal(schemeCategory20);


var div = d3.select("body").append("div")
.attr("class", "tooltip");


var svg = d3.select("#scatter").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("./assets/hotspots.csv", function(error, data: object[]) {
  if (error) throw error;
  console.log(data);

  data.forEach(function(d:any) {
    d.latitud = +d.latitud;
    d.longitud = +d.longitud  ;
  });

  y.domain(d3.extent(data, function(d:any) { return d.latitud; }));
  x.domain(d3.extent(data, function(d:any) { return d.longitud; }));

  svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
.append("text")
  .attr("class", "label")
  .attr("x", width)
  .attr("y", -6)
  .style("text-anchor", "end")
  .text("Latitud");

  svg.append("g")
  .attr("class", "y axis")
  .call(d3.axisLeft(y))
.append("text")
  .attr("class", "label")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Longitud")

 svg.selectAll("dot")
  .data(data)
  .enter().append("circle")
  .attr("class", "dot")
  .attr("r", 2.5)
  .attr("cy", function(d: any) { return y(d.latitud); })
  .attr("cx", function(d: any) { return x(d.longitud); })
  .style("fill", function( d: any ) { return color(d.nombre_del_proveedor_mc); })
  .on('mouseover', function(d){
  div.transition()
  .duration(200)
  .style('opacity', 2)
  .style("fill", '#848484');
  div.html(d['nombre_del_proveedor_mc'])
  .style("left", (d3.event.pageX) + "px")
  .style("top", (d3.event.pageY - 28) + "px");
  })

  .on("mouseout", function(d) {
    div.transition()
      .duration(500)
      .style("opacity", 0);
    });

  var legend = svg.selectAll(".legend")
  .data(color.domain())
.enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", color);

legend.append("text")
  .attr("x", width - 24)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "end")
  .text(function(d) { return d; });

});


  }

}
