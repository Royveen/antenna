import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';

@Component({
  selector: 'app-pointing-up',
  templateUrl: './pointing-up.component.html',
  styleUrls: ['./pointing-up.component.scss'],
})
export class PointingUpComponent {
  public satelliteObject: any = null;
  public deviceOrientationSubscription: Subscription = null;
  constructor(public navCtrl: NavController, private route: ActivatedRoute,
    private deviceOrientation: DeviceOrientation) { 
     
    }

    ionViewDidEnter() {
     window.addEventListener('deviceorientation',(event)=> {
       console.log(`${event.alpha} ${event.beta} ${event.gamma}`);
     }, {once: true});
     this.route.queryParams.subscribe((params) => {
      if (params && params.data) {
        this.satelliteObject = params.data;
        // Get the device current compass heading
         this.deviceOrientation.getCurrentHeading().then(
          (data: DeviceOrientationCompassHeading) => console.log(data),
          (error: any) => console.log(error)
        );
      }
    })

  }

  ionViewDidLeave() {
    if(this.deviceOrientationSubscription)
      this.deviceOrientationSubscription.unsubscribe();
  }
  
  public moveToCongrats() {
    this.navCtrl.navigateRoot('/congrats', {
      queryParams: {
        data: this.satelliteObject
      }
    });
  };
}
