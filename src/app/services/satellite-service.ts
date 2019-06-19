import { Injectable } from '@angular/core';
import { Observable,of } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  
export class SatelliteService {
  
    public satelliteInformation: any = {
        satellite_id: "09871234",
        satellite_name: 'SATTEFIUS-117',
        azimuth_kitchener: 211.1,
        azimuth_austin: 211.1,
        altitude: 30.0,
        orbital_slot: 103.0,
        orbital_slot_direction: 'W'
    }
    
    public getSatellite():Observable<any> {
        return of(this.satelliteInformation).pipe();
    }

}