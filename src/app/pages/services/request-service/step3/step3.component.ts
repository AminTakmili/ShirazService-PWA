import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { Validators, FormGroup } from '@angular/forms';
import { GlobalService } from '../../../../services/global.service';

@Component({
	selector: 'app-step3',
	templateUrl: './step3.component.html',
	styleUrls: ['./step3.component.scss'],
})
export class Step3Component implements OnInit {
	infoForm: FormGroup;

	constructor(private navCtrl: NavController, private fb: FormBuilder, public global: GlobalService) {
		this.infoForm = this.fb.group({
			firstName: [this.global.getPersonInfo().firstName + ' ' + this.global.getPersonInfo().lastName, Validators.compose([Validators.required])],
			mobileNo: [this.global.getPersonInfo().username, Validators.compose([Validators.required])],
			phone: [this.global.getPersonInfo().phone, Validators.compose([Validators.required])],
		});
	}

	ngOnInit() { }

	onInfo() {
		if (this.infoForm.valid) {
			localStorage.setItem('firstName', this.infoForm.get('firstName').value);
			localStorage.setItem('mobileNo', this.infoForm.get('mobileNo').value);
			localStorage.setItem('phone', this.infoForm.get('phone').value);

			this.navCtrl.navigateForward('/page/home/services/request/step-4');
		} else {
			this.global.validateAllFormFields(this.infoForm);
		}
	}

	goBack() {
		this.navCtrl.navigateBack('/page/home/services/request/step-2');
	}
}
