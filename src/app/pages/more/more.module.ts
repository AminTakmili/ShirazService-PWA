import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MorePage } from './more.page';
import { SocialNetworkComponent } from './social-network/social-network.component';


const routes: Routes = [
  {
    path: '',
    component: MorePage
  },
  {
    path : 'social-network',
    component : SocialNetworkComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MorePage,SocialNetworkComponent]
})
export class MorePageModule {}
