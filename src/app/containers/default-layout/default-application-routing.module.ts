import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultLayoutComponent} from './default-layout.component';


const routes: Routes = [
  {
    path: '', component: DefaultLayoutComponent, data: {title: 'Accueil'}, children: [
      { path: 'enlevements', loadChildren: () => import('../../features/enlevements/enlevements.module').then(m => m.EnlevementsModule), /*canActivate: [AuthoritiesGuard],*/ /*data: { authorities: ['settings'], title: 'Administration'}*/ },
      { path: '', redirectTo: '/enlevements' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultApplicationRoutingModule { }
