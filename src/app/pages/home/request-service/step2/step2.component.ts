import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
})
export class Step2Component implements OnInit {
  lat = 29.1044;
	lng = 52.0459;
	zoom = 12;
	center = latLng([this.lat, this.lng]);
	options = {
		layers: [
			tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
				maxZoom: 20,
				subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
				detectRetina: true,
			})
    ],
	};
  constructor(){}
  ngOnInit() {}
 }
