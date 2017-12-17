import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-estatus',
  templateUrl: './estatus.component.html',
  styleUrls: ['./estatus.component.styl']
})
export class EstatusComponent implements OnInit {

  width = 530;
  height= 400;
  data: any;

  constructor() { }



  ngOnInit() {
    var tooltip = d3.select('#estatus')                               // NEW
    .append('div') 
    .attr("class", "tooltip")
    .style('box-shadow', "0 0 5px #999")
    .style('font-size', "12px")
    .style('padding', "10px")
    .style('text-align', "center")
    .style('width', "120px")
    .style('line-heigth', "140%")
    .style('font-weight', "600")
    .style('color', "#fff")
    .style('background', "#000")
    .style('border-radius', "2px")
    .style("opacity", 0);                                    // NEW
                
  tooltip.append('div')                                           // NEW
    .attr('class', 'label');                                      // NEW
       
  tooltip.append('div')                                           // NEW
    .attr('class', 'count');  
    
  tooltip.append('div')                                           // NEW
   .attr('class', 'percent'); 
   
var estatus = d3.select("#estatus").append("svg")
  .attr("width", this.width)
  .attr("height", this.height),
  radius = Math.min(500, 300) / 2,
  g = estatus.append("g").attr("transform", "translate(" + 290 / 2 + "," + 290 / 2 + ")");

var color = d3.scaleOrdinal(d3.schemeCategory20c);

var donutw = 55;

var pie = d3.pie()
.sort(null)
.value(function(d) { return +d['totale'] });

var legendRectSize = 10;
var legendSpacing = 4;

var path = d3.arc()
.outerRadius(radius - 10)
.innerRadius(radius -donutw);



d3.csv("./assets/totales.csv", (data) => {


var arc = g.selectAll(".arc")
.data(pie(data))
.enter().append("g")
  .attr("class", "arc");

arc.append("path")
  .attr("d", <any> path)
  .attr("fill", function(d: any) { return color(d.data.estatus); });


  



arc.on('mouseover', function(d:any) {                            
  

  var percent = Math.round(1000 * d.data['totale'] / 3728) / 10;
 

  tooltip.select('.label').html(d.data['estatus']);                
  tooltip.select('.count').html(d.data['totale']);                
  tooltip.select('.percent').html(percent + '%');             
  tooltip.style('display', 'block');
  tooltip.style('opacity', 2) 
 
});                                                           

arc.on('mouseout', function(d: any) {                              
  tooltip.style('display', 'none');                           // NEW
});  

var legend = estatus.selectAll('.legend')
.data(color.domain())
.enter()
.append('g')
.attr('class', 'legend')
.attr('transform', function(d, i) {
  var height = legendRectSize + legendSpacing + 15;
  var offset =  height * color.domain().length / 2;
  var horz = 32 * legendRectSize;
  var vert = i * height + 35 ;
  return 'translate(' + horz + ',' + vert + ')';
});
      
      legend.append('rect')
.attr('width', legendRectSize)
.attr('height', legendRectSize)
.style('fill', color)
.style('stroke', color);
      
      legend.append('text')
.attr('x', legendRectSize + legendSpacing)
.attr('y', legendRectSize - legendSpacing)
.style("fill", "#6a6a6a")
.text(function(d) { return d; });
        
});






  }

}
