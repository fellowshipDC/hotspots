import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.styl']
})
export class TreemapComponent implements OnInit {

  width=700;
   height=700;


  constructor() { }

  ngOnInit() {

    var svg = d3.select("#treemap"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

    var format = d3.format(",d");
    
    var color = d3.scaleOrdinal(d3.schemeCategory20c);

var treemap = d3.treemap()
    .size([this.width, this.height])
    .padding(1)
    .round(true);

d3.csv("./assets/hotspots.csv", function(error, data) {
  if (error) throw error;

  var anidados = d3.nest<any, number>()
      .key(function(d: any){return d.nombre_del_proveedor_mc;})
      .key(function(d: any){return d.estatus;})
      .rollup(function(leaves) { return leaves.length; })
      .entries(data);

  var root = d3.hierarchy({values: anidados}, function(d) { return d.values; })
      .sum(function(d:any) { return d.value; })
      .sort(function(a, b) { return b.value - a.value; });

  treemap(root);



  var node = d3.select("#treemap")
      .selectAll(".node")
      .data(root.leaves())
      .enter().append("div")
      
      .style('box-sizing','border-box')
      .style('overflow','hidden')
      .style('position','absolute')
      
      .style("left", function(d: any) { return d.x0 + 370 +"px"; })
      .style("top", function(d: any ) { return d.y0 + 2200 + "px"; })
      .style("width", function(d: any) { return d.x1 - d.x0 + "px"; })
      .style("height", function(d: any) { return d.y1 - d.y0 + "px"; })
      .style("background", function(d:any) { return color(d.parent.data.key); })
      .attr("title",function(d: any){ return d.parent.data.key; });

  node.append("div")
      .style('white-space','pre')
      .style('z-index','1000')
      .style('padding','4px')
      .style('line-height','1em')
      .style('font-size','14px')
      .text(function(d:any) { return d.parent.data.key + "\n" + d.data.key; });

  node.append("div")
      .attr("class", "node-value")
      .style('font-size','12px')
      .text(function(d) { return format(d.value) + " conexiones"; });

});

  }
}