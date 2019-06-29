import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { createText } from '@angular/core/src/view/text';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-pointing-direction',
  templateUrl: './pointing-direction.component.html',
  styleUrls: ['./pointing-direction.component.scss'],
})
export class PointingDirectionComponent {

  public satelliteObject: any = null;
  public geolocationSubscription: Subscription = null;
  @ViewChild('canvas') public canvas: any;
  private cx: CanvasRenderingContext2D;

  public disableNext = false;
  constructor(public navCtrl: NavController,
    private route: ActivatedRoute, private geolocation: Geolocation) { }

  ionViewDidEnter() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');
    canvasEl.width = 250;
    canvasEl.height = 250;

    const clockFace = document.createElement('img'),
      clockSpoke = document.createElement('img'),
      clockMinute = document.createElement('img'),
      clockHour = document.createElement('img');

    clockFace.src = 'assets/FE_svgs/clock face.svg';
    clockSpoke.src = 'assets/FE_svgs/clock spoke.svg';
    clockMinute.src = 'assets/FE_svgs/minute hand.svg';
    clockHour.src = 'assets/FE_svgs/hour hand.svg';

    this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.satelliteObject = params.data;
        setTimeout(() => {
          this.drawFace(this.cx, canvasEl, clockFace, clockSpoke);
          this.drawHand(this.cx, 0, clockMinute, clockFace, clockSpoke);
          this.drawHand(this.cx, this.satelliteObject.altitude, clockHour, clockFace, clockSpoke);
        }, 500);
      }
    })

    this.geolocationSubscription = this.geolocation.watchPosition().subscribe((resp) => {
      console.log(resp.coords.altitude);
      if (resp) {
        if (this.satelliteObject.altitude === resp.coords.altitude) {
          setTimeout(() => {
            this.drawFace(this.cx, canvasEl, clockFace, clockSpoke);
            this.drawHand(this.cx, 0, clockMinute, clockFace, clockSpoke);
            this.drawHand(this.cx, 0, clockHour, clockFace, clockSpoke);
          }, 500);
        } else {
          setTimeout(() => {
            this.drawFace(this.cx, canvasEl, clockFace, clockSpoke);
            this.drawHand(this.cx, 0, clockMinute, clockFace, clockSpoke);
            this.drawHand(this.cx, resp.coords.altitude, clockHour, clockFace, clockSpoke);
          }, 500);
        }
      }
    });


  }

  ionViewDidLeave() {
    this.geolocationSubscription.unsubscribe();
  }

  public moveToFinding() {
    this.navCtrl.navigateRoot('/pointingup', {
      queryParams: {
        data: this.satelliteObject
      }
    });
  };

  public drawFace(ctx, canvasEl, clockFace, clockSpoke) {
    this.clearCanvas(ctx, canvasEl);
    ctx.beginPath();
    ctx.drawImage(clockFace, 0, 0);
    ctx.beginPath();
    ctx.drawImage(clockSpoke, clockFace.width / 2 - clockSpoke.width / 2, clockFace.height / 2 - clockSpoke.height / 2);
  }

  public drawHand(ctx, degree, clockImage, clockFace, clockSpoke) {

    ctx.beginPath();
    if (degree != 0) {
      ctx.translate(clockFace.width / 2, clockFace.height / 2);
      ctx.rotate(degree * Math.PI / 180);
      ctx.drawImage(clockImage, -clockImage.width / 2, -clockImage.width / 2);
      ctx.rotate(-degree);
    } else {
      ctx.drawImage(clockImage, clockFace.width / 2 - clockImage.width / 2,
        clockFace.height / 2 - clockSpoke.height / 2 - clockImage.height);
    }
  }

  public clearCanvas(context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
  }
}
