import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {DetailsPageComponent} from './details-page/details-page.component';
const routes: Routes = [
  {
    path:'',
    component:LandingComponent
  },
  {
    path:'details',
    component:DetailsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
