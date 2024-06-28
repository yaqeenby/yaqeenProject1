import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CurrencyCardComponent } from './components/currency-card/currency-card.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LineChartComponent,
    CurrencyCardComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
