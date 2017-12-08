import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.styl']
})
export class ProveedorComponent implements OnInit {

  constructor() { }
  
    width = 530;
    height= 400;
    data: any;
  
    ngOnInit() {
  
      var tooltip = d3.select('#proveedor')                               // NEW
      .append('div')                                                // NEW
      .attr('class', 'tooltip');                                    // NEW
                  
    tooltip.append('div')                                           // NEW
      .attr('class', 'proveedor');                                      // NEW
         
    tooltip.append('div')                                           // NEW
      .attr('class', 'totalp');  
      
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
  .value(function(d) { return +d['totalp'] });
  
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
    .attr("fill", function(d: any) { return color(d.data.proveedor); });
  
  arc.on('mouseover', function(d) {                            
    
                                                         
    var percent = Math.round(1000 * d.data['totalp'] / 3728) / 10;
    console.log(percent)
  
    tooltip.select('.estatus').html(d.data['proveedor']);                // NEW
    tooltip.select('.totalc').html(d.data['totalp']);                // NEW
    tooltip.select('.percent').html(percent + '%');             // NEW
    tooltip.style('display', 'block'); 
   
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
  .text(function(d) { return d; });
          
  });
  
    }
  
  }
  
