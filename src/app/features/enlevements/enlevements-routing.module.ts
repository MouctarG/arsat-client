import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EnlevementsPage} from './pages/enlevements/enlevements-page.component';

const routes: Routes = [
  {
    path: '', component: EnlevementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnlevementsRoutingModule { }
