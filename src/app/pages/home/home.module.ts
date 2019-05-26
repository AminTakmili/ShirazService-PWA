import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { HomePage } from './home.page';
import { DetailComponent } from './detail/detail.component';
import { Step1Component } from './request-service/step1/step1.component';
import { Step2Component } from './request-service/step2/step2.component';
import { Step3Component } from './request-service/step3/step3.component';
import { Step4Component } from './request-service/step4/step4.component';
import { Step5Component } from './request-service/step5/step5.component';


const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }
  ,{
    path: 'detail',
    component: DetailComponent,
  },
  {
    path:  'request-service/step-1',
    component: Step1Component
  },
  {
    path:  'request-service/step-2',
    component: Step2Component
  },
  {
    path:  'request-service/step-3',
    component: Step3Component
  },
  {
    path:  'request-service/step-4',
    component: Step4Component
  },
  {
    path:  'request-service/step-5',
    component: Step5Component
  },  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    LeafletModule
  ],
  declarations: [
    HomePage, 
    DetailComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
  ]
})
export class HomePageModule { }
