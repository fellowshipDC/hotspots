import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.styl']
})
export class TipoComponent implements OnInit {

  constructor() { }

  width = 530;
  height= 400;
  data: any;

  ngOnInit() {

    var tooltip = d3.select('#tipo')                               // NEW
    .append('div')                                                // NEW
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
    .attr('class', 'tipo');                                      // NEW
       
  tooltip.append('div')                                           // NEW
    .attr('class', 'totalc');  
    
   tooltip.append('div')                                           // NEW
   .attr('class', 'percent'); 

   
var svg = d3.select("#tipo").append("svg")
  .attr("width", this.width)
  .attr("height", this.height),
  radius = Math.min(500, 300) / 2,
  g = svg.append("g").attr("transform", "translate(" + 290 / 2 + "," + 290 / 2 + ")");

var color = d3.scaleOrdinal(d3.schemeCategory20c);

var donutw = 55;

var pie = d3.pie()
.sort(null)
.value(function(d) { return +d['totalc'] });

var legendRectSize = 10;
var legendSpacing = 4;

var path = d3.arc()
.outerRadius(radius - 10)
.innerRadius(radius -donutw);



d3.csv("./assets/totales.csv", (data) => {
console.log(data);

var arc = g.selectAll(".arc")
.data(pie(data))
.enter().append("g")
  .attr("class", "arc");

arc.append("path")
  .attr("d", <any> path)
  .attr("fill", function(d: any) { return color(d.data.tipo); });

arc.on('mouseover', function(d) {                            
  
                                                       
  var percent = Math.round(1000 * d.data['totalc'] / 3728) / 10;
  console.log(percent)

  tooltip.select('.tipo').html(d.data['tipo']);                // NEW
  tooltip.select('.totalc').html(d.data['totalc']);                // NEW
  tooltip.select('.percent').html(percent + '%');             // NEW
  tooltip.style('display', 'block'); 
  tooltip.style('opacity', 2);
 
});                                                           // NEW

arc.on('mouseout', function(d: any) {                              // NEW
  tooltip.style('display', 'none');                           // NEW
});  

var legend = svg.selectAll('.legend')
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
