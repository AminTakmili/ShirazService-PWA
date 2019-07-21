import { Injectable, NgZone } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { AlertButton, AlertInput } from '@ionic/core';
import { SHPerson } from '../classes/SHPerson';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	private baseUrl = 'https://shiraz-service.ir/api/general/';
	private imgUrl = 'https://pizzawifi.com/uploads/';
	private token = 'a06646e74fc8fcfef64d2d0dea0a9fb5';
	private loading: Promise<HTMLIonLoadingElement>;
	private version = '8.1.3';

	// Behaviors
	private isLogin = new BehaviorSubject<boolean>(
		localStorage.getItem('isLogin') == null ? false : JSON.parse(localStorage.getItem('isLogin')));
	private menu = new BehaviorSubject<boolean>(null);

	constructor(
		private http: HttpClient,
		private alertController: AlertController,
		private zone: NgZone,
		private loadingController: LoadingController,
		private toastController: ToastController,
		private navCtrl: NavController) { }

	getToken() {
		return this.token;
	}

	getImgUrl() {
		return this.imgUrl;
	}

	getAppUrl(method?: string) {
		if (method === undefined) {
			return this.baseUrl + this.version + '/';
		} else {
			return this.baseUrl + this.version + '/' + method;
		}
	}

	getVersion() {
		return this.version;
	}

	isLoginBehavior(): BehaviorSubject<boolean> {
		return this.isLogin;
	}

	menuBehavior(): BehaviorSubject<boolean> {
		return this.menu;
	}

	showLoading(text: string = 'لطفا منتظر بمانید...') {
		this.loading = this.loadingController.create({
			message: text
		});
		return this.loading;
	}

	dismisLoading() {
		this.loading.then((loading) => {
			loading.dismiss();
		});
	}

	showAlert(header: string, message: string, buttons: AlertButton[], inputs: AlertInput[] = []): Promise<any> {
		return this.alertController.create({
			header,
			message,
			buttons,
			inputs,
		});
	}

	async showToast(message: string, duration: number, position: 'top' | 'bottom' | 'middle', cssClass?: string | string[]) {
		const toast = await this.toastController.create({
			message,
			duration,
			position,
			cssClass
		});
		toast.present();
	}

	getPersonInfo(): SHPerson {
		const personInfo: SHPerson = new SHPerson();
		const storedPersonInfo = JSON.parse(localStorage.getItem('personInfo'));

		if (storedPersonInfo !== null) {
			personInfo.areaId = storedPersonInfo._areaId;
			personInfo.area = storedPersonInfo._area;
			personInfo.personId = storedPersonInfo._personId;
			personInfo.picAddress = storedPersonInfo._picAddress;
			personInfo.accessToken = storedPersonInfo._accessToken;
			personInfo.firstName = storedPersonInfo._firstName;
			personInfo.lastName = storedPersonInfo._lastName;
			personInfo.username = storedPersonInfo._username;
			personInfo.code = storedPersonInfo._code;
			personInfo.totalPoint = storedPersonInfo._totalPoint;
			personInfo.email = storedPersonInfo._email;
			personInfo.phone = storedPersonInfo._phone;
			personInfo.address = storedPersonInfo._address;
		}

		return personInfo;
	}

	validateAllFormFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
			const control = formGroup.get(field);
			if (control instanceof FormControl) {
				control.markAsTouched({ onlySelf: true });
			} else if (control instanceof FormGroup) {
				this.validateAllFormFields(control);
			}
		});
	}

	httpPost(url: string, params: any, token?: string): Observable<any> {
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Device-Type': '2',
			})
		};
		if (token !== undefined) {
			httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Device-Type': '2',
					'Access-Token': `${token}`,
					'User-Id': `${(params.personId === undefined) ? this.getPersonInfo().personId : params.personId}`
				})
			};
		}

		return this.http.post<any>(this.getAppUrl(url), JSON.stringify(params), httpOptions);
	}

	httpUpload(url: string, params: object, token?: string): Observable<any> {
		if (token === undefined) {
			token = this.token;
		}

		return this.http.post<any>(this.getAppUrl(url), params, {
			headers: new HttpHeaders({
				token: `${token}`,
			}),
			reportProgress: true,
			observe: 'events'
		});
	}

	httpGet(url: string, token?: string): Observable<any> {
		if (token === undefined) {
			token = this.token;
		}
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded',
				token: `${token}`
			})
		};
		return this.http.get<any>(this.getAppUrl(url), httpOptions);
	}

	async showError(err: HttpErrorResponse) {
		if (err.status === 403) {
			localStorage.clear();
			this.isLoginBehavior().next(false);
			this.menuBehavior().next(false);
			this.navCtrl.navigateRoot('/login');
		} else if (err.status === 500 || err.status === 409) {
			const alert = await this.alertController.create({
				header: 'خطا',
				message: (Array.isArray(err.error)) ? err.error[0].message : err.error.message,
				buttons: [
					{
						text: 'بستن',
						role: 'cancel'
					}
				]
			});

			await alert.present();
		} else {
			const alert = await this.alertController.create({
				header: 'خطا',
				message: 'خطایی رخ داده است',
				buttons: [
					{
						text: 'بستن',
						role: 'cancel'
					}
				]
			});

			await alert.present();
		}
	}
}
