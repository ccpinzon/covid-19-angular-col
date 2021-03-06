import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ChartModule} from './chart/chart.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {InfoBoxesModule} from './info-boxes/info-boxes.module';
import {TableModule} from './table/table.module';
import { HomeComponent } from './home/home.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import {MapaColombiaModule} from './mapa-colombia/mapa-colombia.module';
import {MaterialModule} from './modal/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PlaceModalComponent } from './modal/place-modal/place-modal.component';
import {SharedModule} from './shared/shared.module';
import {FooterModule} from './shared/components/footer/footer.module';
import { CountryMobileComponent } from './country-mobile/country-mobile.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlaceModalComponent,
    CountryMobileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule,
    SharedModule,
    LeafletModule.forRoot(),
    InfoBoxesModule,
    TableModule,
    MapaColombiaModule,
    NgxMapboxGLModule.withConfig({accessToken: environment.accessToken}),
    MaterialModule,
    BrowserAnimationsModule,
    FooterModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PlaceModalComponent]
})
export class AppModule { }
