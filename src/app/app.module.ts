import { PointingDirectionComponent } from './pointing-direction/pointing-direction.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageModule } from './home/home.module';
import { FindingComponent } from './finding/finding.component';
import { PointingUpComponent } from './pointing-up/pointing-up.component';
import { CongratulationsComponent } from './congratulations/congratulations.component';
import { SatelliteService } from './services/satellite-service';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [AppComponent,FindingComponent,PointingDirectionComponent,PointingUpComponent,CongratulationsComponent],
  entryComponents: [
    FindingComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HomePageModule],
  providers: [
    StatusBar,
    SplashScreen,
    SatelliteService,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
