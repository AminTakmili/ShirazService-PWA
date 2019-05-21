import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.scss'],
})
export class EditRequestComponent implements OnInit {

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
  constructor() { }

  ngOnInit() {}

}
