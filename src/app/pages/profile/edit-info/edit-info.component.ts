import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { SHArea } from '../../../classes/SHArea';
import { FormBuilder } from '@angular/forms';
import { Validators, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { SHPerson } from '../../../classes/SHPerson';

@Component({
	selector: 'app-edit-info',
	templateUrl: './edit-info.component.html',
	styleUrls: ['./edit-info.component.scss'],
})
export class EditInfoComponent implements OnInit {
	areas: SHArea[] = [];
	infoForm: FormGroup;

	constructor(public global: GlobalService, private fb: FormBuilder, private navCtrl: NavController) {
		this.infoForm = this.fb.group({
			firstName: [this.global.getPersonInfo().firstName, Validators.compose([Validators.required])],
			lastName: [this.global.getPersonInfo().lastName, Validators.compose([Validators.required])],
			phone: [this.global.getPersonInfo().phone],
			email: [this.global.getPersonInfo().email],
			areaId: [''],
			address: [this.global.getPersonInfo().address],
		});
	}

	ngOnInit() {
		this.global.showLoading().then((loader) => {
			loader.present();
			this.global.httpPost('common/getAreas', {}, this.global.getPersonInfo().accessToken).subscribe((res: SHArea[]) => {
				res.map((ar) => {
					const area = new SHArea();
					area.areaId = ar.areaId;
					area.areaRatio = ar.areaRatio;
					area.areaTitle = ar.areaTitle;
					this.areas.push(area);
				});
				this.infoForm.get('areaId').setValue(this.areas.find((x) => x.areaId === this.global.getPersonInfo().areaId));

				this.global.dismisLoading();
			}, (error) => {
				this.global.dismisLoading();
				this.global.showError(error);
			});
		});
	}

	areaChange(event) {
		// this.areaId = event.value.areaId;
	}

	onEditInfo() {
		if (this.infoForm.valid) {
			this.global.showLoading().then((loader) => {
				loader.present();
				this.global.httpPost('person/updatePersonInfo', {
					personId: this.global.getPersonInfo().personId,
					firstName: this.infoForm.get('firstName').value,
					lastName: this.infoForm.get('lastName').value,
					email: this.infoForm.get('email').value,
					phone: this.infoForm.get('phone').value,
					areaId: this.infoForm.get('areaId').value.areaId,
					address: this.infoForm.get('address').value,
					longtiude: 0,
					latitiude: 0
				}, this.global.getPersonInfo().accessToken).subscribe((res) => {
					this.global.dismisLoading();
					const person = new SHPerson();
					person.personId = this.global.getPersonInfo().personId;
					person.accessToken = this.global.getPersonInfo().accessToken;
					person.areaId = this.infoForm.get('areaId').value.areaId;
					person.area = this.infoForm.get('areaId').value.areaTitle;
					person.picAddress = this.global.getPersonInfo().picAddress;
					person.firstName = this.infoForm.get('firstName').value;
					person.lastName = this.infoForm.get('lastName').value;
					person.totalPoint = this.global.getPersonInfo().totalPoint;
					person.code = this.global.getPersonInfo().code;
					person.username = this.global.getPersonInfo().username;
					person.email = this.infoForm.get('email').value;
					person.phone = this.infoForm.get('phone').value;
					person.address = this.infoForm.get('address').value;
					localStorage.setItem('personInfo', JSON.stringify(person));
					this.global.showToast('اطلاعات با موفقیت ویرایش شد', 2000, 'bottom');
				}, (error) => {
					this.global.dismisLoading();
					this.global.showError(error);
				});
			});
		} else {
			this.global.validateAllFormFields(this.infoForm);
		}
	}

	goBack() {
		this.navCtrl.navigateBack('/page/profile');
	}
}
