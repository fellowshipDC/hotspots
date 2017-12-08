import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { schemeCategory20c } from 'd3';


@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.styl']
})
export class ScatterComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var color = d3.scaleOrdinal(schemeCategory20c);

 
  

var svg = d3.select("#scatter").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("./assets/hotspots.csv", function(error, data) {
  if (error) throw error;
  console.log(data);

  data.forEach(function(d:any) {
    d.latitud = +d.latitud;
    d.longitud = +d.longitud  ;
  });

  x.domain(d3.extent(data, function(d:any) { return d.latitud; }));
  y.domain(d3.extent(data, function(d:any) { return d.longitud; }));

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

 /* svg.selectAll("dot")
  .data(data)
  .enter().append("circle")
  .attr("class", "dot")
  .attr("r", 3.5)
  .attr("cx", 8 )
  .attr("cy", 7)
  .style("fill", '#eee');*/


  /*svg.selectAll("dot")
  .data(data)
.enter().append("circle")
  .attr("class", "dot")
  .attr("r", 3.5)
  .attr("cx", function(d: any) { return x(d.latitud); })
  .attr("cy", function(d: any) { return y(d.longitud); })
  .style("fill", function(d: any) { return color(d.nombre_del_proveedor); });*/
  

});


  }

}
