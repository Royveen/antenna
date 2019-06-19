import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-pointing-direction',
  templateUrl: './pointing-direction.component.html',
  styleUrls: ['./pointing-direction.component.scss'],
})
export class PointingDirectionComponent implements OnInit  {

  public satelliteObject:any=null;
  public hour_hand_prop:any = {
    'top.%': 24,
    'left.%': 47,
    transform:''
  }
  public disableNext = false;
  constructor(public navCtrl: NavController, 
    private route: ActivatedRoute,private geolocation: Geolocation) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.satelliteObject = params.data;
        this.hour_hand_prop.transform = `rotate(-${this.satelliteObject.altitude}deg)`;
      }
    })

    this.geolocation.watchPosition().subscribe((resp) => {
      if(resp.coords.altitude === this.satelliteObject.altitude ) {
        this.hour_hand_prop.transform = '';
        this.disableNext = false;
      }else {
        this.hour_hand_prop.transform = `rotate(-${resp.coords.altitude}deg)`
      }
     });
  }

  public moveToFinding() {
    this.navCtrl.navigateRoot('/pointingup',{
      queryParams: {
        data: this.satelliteObject
    }
  });
  };

}
