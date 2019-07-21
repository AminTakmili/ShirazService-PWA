import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Validators, FormGroup } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { NavController } from '@ionic/angular';
import { SHPerson } from '../../classes/SHPerson';

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	registerForm: FormGroup;

	constructor(public global: GlobalService, private fb: FormBuilder, private navCtrl: NavController) {
		this.registerForm = this.fb.group({
			firstName: ['', Validators.compose([Validators.required])],
			lastName: ['', Validators.compose([Validators.required])],
			reagentCode: [''],
			aggrement: [null, Validators.compose([Validators.required])]
		}, {
			validator: this.checkCheckbox
		});
	}

	checkCheckbox(c: AbstractControl) {
		if (c.get('aggrement').value === false) {
			return false;
		} else {
			return true;
		}
	}

	ngOnInit() {
	}

	onRegister() {
		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('person/insrtPersonsSimple', {
				firstName: this.registerForm.get('firstName').value,
				lastName: this.registerForm.get('lastName').value,
				mobileNo: localStorage.getItem('mobileNo'),
				reagentCode: this.registerForm.get('reagentCode').value,
				personId: 0
			}, localStorage.getItem('accessToken')).subscribe((res) => {
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

					loader.dismiss();
					localStorage.setItem('isLogin', 'true');
					this.global.isLoginBehavior().next(true);
					this.global.menuBehavior().next(true);
					localStorage.removeItem('mobileNo');
					localStorage.removeItem('accessToken');

					this.navCtrl.navigateRoot('/page/home');
				}, (error) => {
					loader.dismiss();
					this.global.showError(error);
				});
			}, (error) => {
				loader.dismiss();
				this.global.showError(error);
			});
		});
	}

	goBack() {
		this.navCtrl.navigateBack('/login');
	}
}
