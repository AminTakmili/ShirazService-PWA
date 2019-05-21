
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
import { SurveyComponent } from './survey/survey.component';

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
    path: 'pending-request',
    component: PendingRequestComponent
  },
  {
    path: 'finish-request',
    component: FinishRequestComponent
  },
  {
    path: 'survey',
    component: SurveyComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeafletModule,
    RouterModule.forChild(routes),
    ChartModule
  ],
  declarations: [
    MyrequestPage,
    EditRequestComponent,
    PendingRequestComponent,
    FinishRequestComponent,
    SurveyComponent,
  ]
})
export class MyrequestPageModule {}
