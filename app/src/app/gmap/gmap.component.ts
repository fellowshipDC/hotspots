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
        
              
              var markers = [];
              for(var i = 0; i < data.length; i++ ) {
                var position = new google.maps.LatLng(data[i]['latitud'], data[i]['longitud']);
                bounds.extend(position);
                var marker = new google.maps.Marker({
                    position: position,
                    map: map,
                   

                    
                });
                markers.push(marker);

                var options = {
                  imagePath: './assets/images/m'
              };

                var markerCluster = new MarkerClusterer(map, marker, options
                  );
               
            }
            
            
          }
          
          
            initMap();
           
      
          });
  }}
    /*var mapProp = {
        center: new google.maps.LatLng(this.lat, this.lng),
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("gmap"), mapProp);

    
}

}*/

/*d3.csv("./assets/short.csv", function(error, data){
  if (error) throw error;

  var overlay = new google.maps.OverlayView();

  
  // Add the container when the overlay is added to the map.
  overlay.onAdd = function() {
    var layer = d3.select(this.getPanes().overlayLayer).append("div")
        .attr("class", "stations");

    // Draw each marker as a separate SVG element.
    // We could use a single SVG, but what size would it have?
    overlay.draw = function() {
      var projection = this.getProjection(),
          padding = 10;

      var marker = layer.selectAll("svg")
          .data(d3.entries(data))
          .each(transform) // update existing markers
        .enter().append("svg")
          .each(transform)
          .attr("class", "marker");

            // Add a circle.
      marker.append("circle")
      .attr("r", 4.5)
      .attr("cx", padding)
      .attr("cy", padding);

 

  function transform(d) {
    d = new google.maps.LatLng(d.latitud, d.longitud);
    d = projection.fromLatLngToDivPixel(d);
    return d3.select(this)
        .style("left", (d.x - padding) + "px")
        .style("top", (d.y - padding) + "px");
  }
};
};

// Bind our overlay to the map…
overlay.setMap(map);
});

*/
