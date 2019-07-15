import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-social-network',
	templateUrl: './social-network.component.html',
	styleUrls: ['./social-network.component.scss'],
})
export class SocialNetworkComponent implements OnInit {

	constructor(private navCtrl: NavController) { }

	ngOnInit() { }

	goBack() {
		this.navCtrl.navigateBack('/page/more');
	}
}
