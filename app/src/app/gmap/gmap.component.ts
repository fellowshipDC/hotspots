import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

declare const google: any;
declare const map: any;
declare const MarkerClusterer: any;

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.styl']
})
export class GmapComponent implements OnInit {

  dataset: any = [];
  marker;

  constructor() {}

  initMap() {
    const center = { lat: 19.4286973, lng: -99.156051 };

    const map = new google.maps.Map(document.getElementById('gmap'), {
      zoom: 12,
      center: center
    });

    return map;
  }

  addMarker(map, lat, lng) {
    const position = new google.maps.LatLng(lat, lng);
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(position);
    const marker = new google.maps.Marker({
        position: position,
        map: map
    });

    marker.addListener('click', () => {
      map.setCenter(marker.getPosition());
      map.setZoom(19);
      this.marker = marker;
    });

    return marker;
  }

  ngOnInit() {

    const markers = [];

    d3.csv('./assets/hotspotscut.csv', (data) => {
      this.dataset = data;

      console.log(this.dataset);

      const map = this.initMap();

      this.dataset.map((data) => {
        const marker = this.addMarker(map, data.latitud, data.longitud);
        markers.push(marker);
      });

      const markerCluster = new MarkerClusterer(
        map,
        markers,
        {
          imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        }
      );

    });

  }

}
