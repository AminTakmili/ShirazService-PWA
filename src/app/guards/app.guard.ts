import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { NavController } from '@ionic/angular';

@Injectable()
export class AppGuard implements CanActivate {
	constructor(private router: Router, private global: GlobalService, private navCtrl: NavController) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const url: string = state.url;

		if (this.global.isLoginBehavior().value) {
			this.navCtrl.navigateRoot('/page/home');
		} else {
			return true;
		}
	}
}
