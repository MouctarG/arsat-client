import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultLayoutComponent} from './default-layout.component';
import {DefaultApplicationRoutingModule} from './default-application-routing.module';
import {AppHeaderModule, AppSidebarModule} from '@coreui/angular';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

@NgModule({
  declarations: [
    DefaultLayoutComponent,
    ...APP_CONTAINERS
  ],
  imports: [
    CommonModule,
    DefaultApplicationRoutingModule,
    AppHeaderModule,
    AppSidebarModule
  ]
})
export class DefaultLayoutModule { }
