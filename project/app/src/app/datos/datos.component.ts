import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.styl']
})
export class DatosComponent implements OnInit {

width = 450;
height= 500;
data: any;

  constructor() { }

  ngOnInit() { 

    var tooltip = d3.select('#estatus')                               // NEW
    .append('div')                                                // NEW
    .attr('class', 'tooltip');                                    // NEW
                
  tooltip.append('div')                                           // NEW
    .attr('class', 'label');                                      // NEW
       
  tooltip.append('div')                                           // NEW
    .attr('class', 'count');                                      // NEW

  tooltip.append('div')                                           // NEW
    .attr('class', 'percent');
   
var estatus = d3.select("#estatus").append("svg")
  .attr("width", this.width)
  .attr("height", this.height),
  radius = Math.min(this.width, this.height) / 2,
  g = estatus.append("g").attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");

var color = d3.scaleOrdinal(d3.schemeCategory20c);

var donutw = 90;

var pie = d3.pie()
.sort(null)
.value(function(d) { return +d['totale'] });

var legendRectSize = 18;
var legendSpacing = 4;

var path = d3.arc()
.outerRadius(radius - 10)
.innerRadius(radius -donutw);

var label = d3.arc()
.outerRadius(radius - 40)
.innerRadius(radius - 40);

d3.csv("./assets/totales.csv", (data) => {
console.log(data);

var arc = g.selectAll(".arc")
.data(pie(data))
.enter().append("g")
  .attr("class", "arc");

arc.append("path")
  .attr("d", <any> path)
  .attr("fill", function(d: any) { return color(d.data.estatus); });


});


/*var tipo = d3.select("#tipo").append("svg")
.attr("width", this.width)
.attr("height", this.height),
radius = Math.min(this.width, this.height) / 2,
g = tipo.append("g").attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");

var chart = d3.pie()
.sort(null)
.value(function(d) { return +d['totalc'] });

d3.csv("./assets/totales.csv", (datat) => {
  console.log(datat);
  

var arct = g.selectAll(".arc")
.data(chart(datat))
.enter().append("g")
  .attr("class", "arc");


arct.append("path")
.attr("d", <any> path)
.attr("fill", function(d: any) { return color(d.datat.tipo); });

arct.append("text")
.attr("transform", function(d: any) { return "translate(" + label.centroid(d) + ")"; })
.attr("dy", "0.35em")
.text(function(d: any) { return d.datat.tipo; });

  
});*/

}


}
