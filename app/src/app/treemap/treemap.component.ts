import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.styl']
})
export class TreemapComponent implements OnInit {

  width = 960;
  height = 1060;


  constructor() { }

  ngOnInit() {

    

  d3.csv("./assets/hotspots.csv", function(error, data) {
  if (error) throw error;
  console.log(data);

  var nest = d3.nest()
  .key(function(d: any) { return d.nombre_del_proveedor_mc; })
  .key(function(d: any) { return d.estatus; })
  .rollup(function(d: any) { return d3.sum<number>(d, function(c:any ) { return c.estatus; }); })
  .entries(data);
 
});
}
}