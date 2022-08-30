import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-qrcomponent',
  templateUrl: './qrcomponent.component.html',
  styleUrls: ['./qrcomponent.component.scss'],
})
export class QrcomponentComponent implements OnInit {

  qrData = null;
  createdCode = null;
  scannedCode = null;

  constructor(public navCtrl:NavController) { }

  ngOnInit() {}

  createCode(){
    this.createdCode = this.qrData;
    console.log("si llega" + this.qrData);
  }

  scanCode(){

  }

}
