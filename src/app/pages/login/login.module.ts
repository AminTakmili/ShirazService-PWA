import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { SharedModule } from '../../modules/shared.module';

const routes: Routes = [
	{
		path: '',
		component: LoginPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		IonicModule,
		RouterModule.forChild(routes)
	],
	declarations: [LoginPage]
})
export class LoginPageModule { }
