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

  constructor(public navCtrl: NavController,private route: ActivatedRoute,private geolocation: Geolocation) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.geolocation.watchPosition().subscribe((resp) => {
          console.log(resp)
          // resp.coords.longitude
         });
      }
    })
    
  }

  public moveToCongrats() {
    this.navCtrl.navigateRoot('/congrats');
  };
}
