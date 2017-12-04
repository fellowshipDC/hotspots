import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { AgmCoreModule } from '@agm/core';
import { google } from '@agm/core/services/google-maps-types';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.styl']
})
export class MapComponent implements OnInit {
  /*lat: number = 21.879426;
  lng: number =  -101.266185;*/
  

  constructor() { }

  ngOnInit() {}

   /* let map= new google.maps.Map(document.getElementById("#map"), this.createMap());
  }
    createMap(){ new google.maps.Map(d3.select('#map').node(),{
     zoom: 8 ,
    center: google.maps.LatLng(37.76485, -122.41948),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });
  }*/

}

