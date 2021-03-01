import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoughnutComponent } from './charts/doughnut/doughnut.component';
import { BarComponent } from './charts/bar/bar.component';
import { AreaComponent } from './charts/area/area.component';

@NgModule({
  declarations: [
    AppComponent,
    DoughnutComponent,
    BarComponent,
    AreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
