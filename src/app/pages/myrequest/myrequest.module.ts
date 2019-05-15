
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ChartModule } from 'angular-highcharts';

import { IonicModule } from '@ionic/angular';

import { MyrequestPage } from './myrequest.page';

const routes: Routes = [
  {
    path: '',
    component: MyrequestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ChartModule
  ],
  declarations: [MyrequestPage]
})
export class MyrequestPageModule {}
