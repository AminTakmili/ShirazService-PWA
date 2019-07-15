import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { GlobalService } from '../../../services/global.service';

@Component({
	selector: 'app-expert-introduction',
	templateUrl: './expert-introduction.component.html',
	styleUrls: ['./expert-introduction.component.scss'],
})
export class ExpertIntroductionComponent implements OnInit {
	expertForm: FormGroup;

	constructor(private navCtrl: NavController, private fb: FormBuilder, public global: GlobalService) {
		this.expertForm = this.fb.group({
			firstName: ['', Validators.compose([Validators.required])],
			lastName: ['', Validators.compose([Validators.required])],
			mobileNo: ['', Validators.compose([Validators.required])],
		});
	}

	ngOnInit() {}

	onExpert() {
		if (this.expertForm.valid) {
			localStorage.setItem('exportFirstName', this.expertForm.get('firstName').value);
			localStorage.setItem('exportLastName', this.expertForm.get('lastName').value);
			localStorage.setItem('exportMobileNo', this.expertForm.get('mobileNo').value);
			this.navCtrl.navigateForward('/page/profile/expert-introduction/experience');
		} else {
			this.global.validateAllFormFields(this.expertForm);
		}
	}

	goBack() {
		this.navCtrl.navigateBack('/page/profile');
	}
}
