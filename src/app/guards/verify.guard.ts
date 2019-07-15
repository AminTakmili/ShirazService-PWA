import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { NavController } from '@ionic/angular';

@Injectable()
export class VerifyGuard implements CanActivate {
	constructor(private router: Router, private global: GlobalService, private navCtrl: NavController) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const url: string = state.url;

		if (localStorage.getItem('mobileNo') == null) {
			this.navCtrl.navigateRoot('/login');
		} else {
			return true;
		}
	}
}
