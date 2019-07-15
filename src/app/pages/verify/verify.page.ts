import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators, FormGroup } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { NavController } from '@ionic/angular';
import { SHPerson } from '../../classes/SHPerson';

@Component({
	selector: 'app-verify',
	templateUrl: './verify.page.html',
	styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
	verifyForm: FormGroup;

	constructor(public global: GlobalService, private fb: FormBuilder, private navCtrl: NavController) {
		this.verifyForm = this.fb.group({
			cofirmationCode: ['', Validators.compose([Validators.required])],
		});
	}

	ngOnInit() {
	}

	ionViewWillEnter() {
		this.verifyForm.reset();
	}

	onVerify() {
		if (this.verifyForm.valid) {
			this.global.showLoading().then((loading) => {
				loading.present();
				this.global.httpPost('person/authenticationOfCnfrmCode', {
					mobileNo: localStorage.getItem('mobileNo'),
					cofirmationCode: this.verifyForm.get('cofirmationCode').value,
				}).subscribe((res) => {
					// Store Person

					this.global.httpPost('person/getPersonInfo', {
						personId: res.id,
					}, res.accessToken).subscribe((per) => {
						const person = new SHPerson();
						person.personId = res.id;
						person.accessToken = res.accessToken;
						person.areaId = per.areaId;
						person.area = per.area;
						person.picAddress = per.picAddress;
						person.firstName = per.firstName;
						person.lastName = per.lastName;
						person.totalPoint = per.totalPoint;
						person.code = per.code;
						person.username = per.username;
						person.email = per.email;
						person.phone = per.phone;
						person.address = per.address;
						localStorage.setItem('personInfo', JSON.stringify(person));

						this.global.dismisLoading();
						localStorage.setItem('isLogin', 'true');
						this.global.isLoginBehavior().next(true);
						this.global.menuBehavior().next(true);
						localStorage.removeItem('mobileNo');

						this.navCtrl.navigateForward('/page/home');
					}, (error) => {
						this.global.dismisLoading();
						this.global.showError(error);
					});
				}, (error) => {
					this.global.dismisLoading();
					this.global.showError(error);
				});
			});
		}
	}

	goBack() {
		this.navCtrl.navigateBack('/login');
	}
}
