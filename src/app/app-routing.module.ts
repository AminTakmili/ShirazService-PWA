import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { VerifyGuard } from './guards/verify.guard';
import { LoginGuard } from './guards/login.guard';
import { AppGuard } from './guards/app.guard';

const routes: Routes = [
	{ path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canActivate: [LoginGuard] },
	{ path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [AppGuard] },
	{ path: 'verify', loadChildren: './pages/verify/verify.module#VerifyPageModule', canActivate: [VerifyGuard] },
	{ path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule', canActivate: [AppGuard] },
];
@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
