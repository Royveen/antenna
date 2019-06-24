import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-pointing-up',
  templateUrl: './pointing-up.component.html',
  styleUrls: ['./pointing-up.component.scss'],
})
export class PointingUpComponent implements OnInit {
  public satelliteObject:any=null;
  constructor(public navCtrl: NavController,private route: ActivatedRoute,private geolocation: Geolocation) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.satelliteObject = params.data;
        this.geolocation.watchPosition().subscribe((resp) => {
            // Working
            // checking if can be done with CSS only or need Canvas too
         });
      }
    })
    
  }

  public moveToCongrats() {
    this.navCtrl.navigateRoot('/congrats',{
      queryParams: {
        data: this.satelliteObject
    }
  });
  };
}
