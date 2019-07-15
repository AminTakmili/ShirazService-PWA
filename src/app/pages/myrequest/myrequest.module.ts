
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ChartModule } from 'angular-highcharts';
import { IonicModule } from '@ionic/angular';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MyrequestPage } from './myrequest.page';
import { EditRequestComponent } from './edit-request/edit-request.component';
import { PendingRequestComponent } from './pending-request/pending-request.component';
import { FinishRequestComponent } from './finish-request/finish-request.component';
import { SelectedRequestComponent } from './selected-request/selected-request.component';
import { AcceptedRequestComponent } from './accepted-request/accepted-request.component';
import { SurveyComponent } from './survey/survey.component';
import { CancelReasonsComponent } from './cancel-reasons/cancel-reasons.component';
import { CanceledRequestComponent } from './canceled-request/canceled-request.component';
import { RatingModule } from 'ng-starrating';
import { WorkmanCommentComponent } from './workman-comment/workman-comment.component';
import { WorkmanMedalComponent } from './workman-medal/workman-medal.component';
import { SharedModule } from '../../modules/shared.module';

const routes: Routes = [
	{
		path: '',
		component: MyrequestPage
	},
	{
		path: 'edit-request',
		component: EditRequestComponent
	},
	{
		path: 'pending-request/:id',
		component: PendingRequestComponent
	},
	{
		path: 'finished-request/:id/:wid',
		component: FinishRequestComponent
	},
	{
		path: 'selected-request/:id/:wid',
		component: SelectedRequestComponent
	},
	{
		path: 'accepted-request/:id/:wid',
		component: AcceptedRequestComponent
	},
	{
		path: 'canceled-request/:id',
		component: CanceledRequestComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		LeafletModule,
		RouterModule.forChild(routes),
		ChartModule,
		RatingModule,
		SharedModule
	],
	declarations: [
		MyrequestPage,
		EditRequestComponent,
		PendingRequestComponent,
		FinishRequestComponent,
		SurveyComponent,
		SelectedRequestComponent,
		CancelReasonsComponent,
		AcceptedRequestComponent,
		CanceledRequestComponent,
		WorkmanCommentComponent,
		WorkmanMedalComponent
	],
	entryComponents: [
		CancelReasonsComponent,
		SurveyComponent,
		WorkmanCommentComponent,
		WorkmanMedalComponent
	]
})
export class MyrequestPageModule { }
