import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { EditInfoComponent } from './edit-info/edit-info.component';
import { ExpertIntroductionComponent } from './expert-introduction/expert-introduction.component';
import { MyCommentsComponent } from './my-comments/my-comments.component';
import { SupportComponent } from './support/support.component';

import { MyScoreComponent } from './my-score/my-score.component';
import { ExperienceComponent } from './expert-introduction/experience/experience.component';
import { ServiceLocationComponent } from './expert-introduction/service-location/service-location.component';

const routes: Routes = [
  { path: '', component: ProfilePage } ,
  { path: 'edit-information', component: EditInfoComponent } ,
  { path: 'expert-introduction', component: ExpertIntroductionComponent } ,
  { path: 'expert-introduction/experience', component: ExperienceComponent } ,
  { path: 'expert-introduction/service-location', component: ServiceLocationComponent } ,
  { path: 'my-Comments', component: MyCommentsComponent } ,
  { path: 'support', component: SupportComponent } ,

  { path: 'my-score', component: MyScoreComponent } ,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProfilePage,
    EditInfoComponent,
    ExpertIntroductionComponent,
    MyCommentsComponent,
    SupportComponent,
    MyScoreComponent,
    ExperienceComponent,
    ServiceLocationComponent
  ],
  entryComponents :[
  ]
})
export class ProfilePageModule {}
