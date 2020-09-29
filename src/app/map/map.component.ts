import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  // map: google.maps.Map;
  long: number;
  lat: number;
  center: any;
  // marker = new google.maps.Marker({
  //   position: this.center,
  //   map: this.map,
  // });

  // zoom: number = 15;
  // options: google.maps.MapOptions = {
  //   mapTypeId: 'roadmap',
  //   zoomControl: false,
  //   disableDoubleClickZoom: true,
  //   maxZoom: 18,
  //   minZoom: 10,
  // };

  constructor(private service: LocationService) {}

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation = (): any => {
    this.service.getCurrentLocation().then((pos) => {
      this.long = Number(`${pos.lng}`);
      this.lat = Number(`${pos.lat}`);
      this.center = { lat: this.lat, lng: this.long };
      this.initMap();
      console.log(this.center);
      console.log(this.long, this.lat);
    });
  };

  initMap = (): void => {
    // console.log(this.center);
    const styledMapType = new google.maps.StyledMapType(
      [
        { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#c9b2a6' }],
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#dcd2be' }],
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#ae9e90' }],
        },
        {
          featureType: 'landscape.natural',
          elementType: 'geometry',
          stylers: [{ color: '#dfd2ae' }],
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [{ color: '#dfd2ae' }],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#93817c' }],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry.fill',
          stylers: [{ color: '#a5b076' }],
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#447530' }],
        },
        // {
        //   featureType: 'road',
        //   elementType: 'geometry',
        //   stylers: [{ color: '#f5f1e6' }],
        // },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [{ color: '#fdfcf8' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#f8c967' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#e9bc62' }],
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry',
          stylers: [{ color: '#e98d58' }],
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#db8555' }],
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#806b63' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#f5f1e6' }],
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [{ color: '#dfd2ae' }],
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#8f7d77' }],
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#ebe3cd' }],
        },
        {
          featureType: 'transit.station',
          elementType: 'geometry',
          stylers: [{ color: '#dfd2ae' }],
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [{ color: '#b9d3c2' }],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#92998d' }],
        },
      ],
      { name: 'Map' }
    );
    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 15,
        center: this.center,
        mapTypeControlOptions: {
          mapTypeIds: ['styled_map', 'hybrid'],
        },
      }
    );

    const bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);

    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    new google.maps.Marker({
      position: this.center,
      map: map,
      title: 'launch!',
    });
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    // this.marker.setMap(this.map);
  };
}
