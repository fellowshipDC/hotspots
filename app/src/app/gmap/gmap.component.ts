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
  dataset: any = [];

  constructor() {
    
   }
  ngOnInit() {

    d3.csv('./assets/hotspotscut.csv', (data) => {
      this.dataset = data;
      
      function initMap() {
        
  
        var center = {lat: 19.386793, lng: -99.141562};
        var bounds = new google.maps.LatLngBounds();
        console.log(data)
  
        var map = new google.maps.Map(document.getElementById('gmap'), {
          zoom: 12,
          center: center
        });

        var infowindow = new google.maps.InfoWindow(/*{pixelOffset: new google.maps.Size(700,300)
      }*/);
  
        
      
        
        var markers = []
        for(var i = 0; i < data.length; i++ ) {
          var position = new google.maps.LatLng(data[i]['latitud'], data[i]['longitud']);
          bounds.extend(position);
          var marker = new google.maps.Marker({
              position: position,
              map: map,
             
          
              
          });

         var info = "<div class='content'>" + "<b>" + data[i]['nombre'] +"</b>" + 
         "<br>" + 
         "<p> <b>Dirección: </b></p> " + data[i]['vialidad'] + " " +
         data[i]['calle'] + '<br>'  + " Ext. " + data[i]['numero_exterior'] + " Int. " + data[i]['numero_interior'] 
        +"<br><br>"+"<p> <b>Estatus: </b></p> "+ data[i]['estatus']  + '<br><br>' + "<p> <b>Conectividad: </b></p> " +  data[i]['conectividad'] +
       '<form id="mapform">' +
        
        '<div class="form-group">' +
           '<label for="exampleInputPassword1">Comentarios</label>' +
          '<input type="text" class="form-control" id="exampleInputPassword1" placeholder="Comentarios del punto de acceso">' +
        ' </div>' +
        
        ' <div class="form-group">' +
          '<label for="exampleInput">Calificación</label><br>' +
          '<span class="rating">'+
             '<input type="radio" id="star5" name="rating" value=5 /><label class = "full" for="star5" title="Awesome - 5 stars"></label>' +
             '<input type="radio" id="star4" name="rating" value=4 /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>' +
             '<input type="radio" id="star3" name="rating" value=3 /><label class = "full" for="star3" title="Meh - 3 stars"></label>' +
             '<input type="radio" id="star2" name="rating" value=2 /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>' +
             '<input type="radio" id="star1" name="rating" value=1 /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>'+
            
             '</span>' +
         '</div> <br><br><br>' +
         
        '<button id="subbtn" type="submit" class="btn btn-light">Submit</button>'+
       '</form>' +
     
     '</div>' + "</div>"
          
         
        markers.push(marker);           
          
            markers.forEach(function(marker){

            marker.addListener('click', function() {
//esto es lo que agregue y mi mapa desaparecio
                    // google.maps.event.addListener(infowindow, 'domready', function() {
                    //   document.getElementById("map-form").addEventListener("submit", function(e) {
                    //       (<any>event).stop();
                    //       console.log("hi!"); });  });
                       //hasta aqui   
              infowindow.setContent(info);
              infowindow.open(map,marker)  ;   
            map.setCenter(marker.getPosition());
            map.setZoom(19);
              });

             
              
      });
        
      google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
        map.setCenter(center);
        map.setZoom(11);
      }); 
         
      }
      var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      
    }
    
    
      initMap();
     

    });
}}