import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'page',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: '../search/search.module#SearchPageModule'
          }
        ]
      },
      {
        path: 'myrequest',
        children: [
          {
            path: '',
            loadChildren: '../myrequest/myrequest.module#MyrequestPageModule'
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../profile/profile.module#ProfilePageModule'
          }
        ]
      },
      {
        path: 'more',
        children: [
          {
            path: '',
            loadChildren: '../more/more.module#MorePageModule'
          }
        ]
      },
      
      {
        path: '',
        redirectTo: '/page/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/page/home',
    pathMatch: 'full'
  }
];

// const routes: Routes = [
// 	{ path: '', redirectTo: 'tabs1', pathMatch: 'full' },
// 	{ path: 'tabs1', loadChildren: '../tab1/tab1.module#Tab1PageModule',  },
// 	{ path: 'tabs2', loadChildren: '../tab2/tab2.module#Tab2PageModule',  },
// 	{ path: 'tabs3', loadChildren: '../tab3/tab3.module#Tab3PageModule',  },

// ];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
