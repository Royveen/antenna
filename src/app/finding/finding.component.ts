import { SatelliteService } from './../services/satellite-service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-finding',
  templateUrl: './finding.component.html',
  styleUrls: ['./finding.component.scss'],
})
export class FindingComponent implements OnInit {

  constructor(public navCtrl: NavController, public satServ: SatelliteService) { }
  public satelliteObject: any = null;

  ngOnInit() {

    this.satServ.getSatellite().subscribe((data)=> {
     const setName = setTimeout(()=>{
          this.satelliteObject = data;
    },3000);
    });
  }

  public moveToFinding() {
    this.navCtrl.navigateForward('/pointing',{
      queryParams: {
        data: this.satelliteObject
    }
  });
  };
}
