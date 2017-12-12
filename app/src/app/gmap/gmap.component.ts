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

  lat: number = 19.386793;
  lng: number =  -99.141562;
  

  constructor() {
    
   }
  ngOnInit() {

    d3.csv('./assets/hotspots.csv', (data) => {
      
            function initMap() {
              
        
              var center = {lat: 19.386793, lng: -99.141562};
              var bounds = new google.maps.LatLngBounds();
              console.log(data)
        
              var map = new google.maps.Map(document.getElementById('gmap'), {
                zoom: 11,
                center: center
              });
        
              
              
              for(var i = 0; i < data.length; i++ ) {
                var position = new google.maps.LatLng(data[i]['latitud'], data[i]['longitud']);
                bounds.extend(position);
                var marker = new google.maps.Marker({
                    position: position,
                    map: map,
                   
                
                    
                });
               
              
                

                marker.addListener('click', function() {

                  map.setCenter(marker.getPosition());
                  map.setZoom(19);
                });
               
               
            }
            
            
          }
          
          
            initMap();
           
      
          });
  }}
    

  //   d3.csv('./assets/hotspots.csv', (data) => {
      
  //           function initMap() {
              
        
  //             var center = {lat: 19.386793, lng: -99.141562};
  //             var bounds = new google.maps.LatLngBounds();
  //             console.log(data)
        
  //             var map = new google.maps.Map(document.getElementById('gmap'), {
  //               zoom: 11,
  //               center: center
  //             });
        
              
              
  //             for(var i = 0; i < data.length; i++ ) {
  //               var position = new google.maps.LatLng(data[i]['latitud'], data[i]['longitud']);
  //               bounds.extend(position);
  //               var marker = new google.maps.Marker({
  //                   position: position,
  //                   map: map,
                   
                
                    
  //               });
               
              
                

  //               marker.addListener('click', function() {

  //                 map.setCenter(marker.getPosition());
  //                 map.setZoom(19);
  //               });
  //              /* markers.push(marker);

  //               var options = {
  //                 imagePath: './assets/images/m'
  //             };*/

  //              // var markerCluster = new MarkerClusterer(map, marker, options
  //               //  );
               
  //           }
            
            
  //         }
          
          
  //           initMap();
           
      
  //         });
  // }}
    
