import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators, FormGroup } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	loginForm: FormGroup;

	constructor(public global: GlobalService, private fb: FormBuilder, private navCtrl: NavController) {
		this.loginForm = this.fb.group({
			mobileNo: ['', Validators.compose([Validators.required])],
		});
	}

	ngOnInit() {
	}

	ionViewWillEnter() {
		localStorage.removeItem('mobileNo');
		this.loginForm.reset();
	}

	onLogin() {
		if (this.loginForm.valid) {
			this.global.showLoading().then((loading) => {
				loading.present();
				this.global.httpPost('person/sendSmsOfCnfrmCode', {
					mobileNo: this.loginForm.get('mobileNo').value,
				}).subscribe((res) => {
					this.global.dismisLoading();
					localStorage.setItem('mobileNo', this.loginForm.get('mobileNo').value);
					this.navCtrl.navigateForward('/verify');
				}, (error) => {
					this.global.dismisLoading();
					this.global.showError(error);
				});
			});
		}
	}
}
