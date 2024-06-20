import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
