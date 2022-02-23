import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconSetService } from '@coreui/icons-angular';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {AuthentificationModule} from './features/authentification/authentification.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthentificationModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    IconSetService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
