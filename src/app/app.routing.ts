import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
// Import Containers
import {LoginPage} from './features/authentification/pages/login/login.page';
import {LogoutPage} from './features/authentification/pages/logout/logout.page';
import {AuthGuard} from './core/auth';

export const routes: Routes = [
  {path: 'app', loadChildren: () => import('./containers/default-layout/default-layout.module').then(m => m.DefaultLayoutModule), canActivate: [AuthGuard]},
  {path: 'login', component: LoginPage, data: {title: 'Page de connexion'}},
  {path: 'logout', component: LogoutPage},
  { path: '', redirectTo: '/app', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
