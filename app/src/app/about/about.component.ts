import { Component, OnInit } from '@angular/core'; 
import * as d3 from "d3";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.styl']
})
export class AboutComponent implements OnInit {

  constructor() { }

  linegraph(){

//svg width and height
var margin = {top: 50, right: 50, bottom: 50, left: 50};
var w = 600 - (margin.left + margin.right);
var h = 500 - (margin.top + margin.bottom);

//graph svg
var svg = d3.select('#line')
  .append('svg')
  .attr('width', w + (margin.left + margin.right))
  .attr('height', h + (margin.top + margin.bottom))
  
 var g  =  svg.append('g')
 .attr('transform', 'translate('+ margin.left + ',' + margin.top + ')');

 var x = d3.scaleBand().rangeRound([0, w]).padding(0.1),
 y = d3.scaleLinear().range([h,0]);


d3.csv("./assets/mxconectado.csv", function(d:any) {
  d.total = +d.total;
  return d;
}, function(error, data) {
  if (error) throw error;

  var line = d3.line()
    .x(function(d:any ) { return x(d.año); })
    .y(function(d:any) { return y(d.value); })

  x.domain(data.map(function(d) { return d.año; }));

  y.domain([0, 101322]);
  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + h + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(8))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

  g.append("line")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

  g.selectAll("circle")
    .data(data)
  .enter().append("circle")
    .attr("class", "circle")
    .attr("cx", function(d) { return x(d.año); })
    .attr("cy", function(d) { return y(d.total); })
    .attr("r", 4);
});



    }

  ngOnInit() {
    
    this.linegraph();
   
    
    
      }

  
    }


