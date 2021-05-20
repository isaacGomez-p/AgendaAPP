import { FincaService } from './../../../services/finca.service';
import { Component, OnInit } from '@angular/core';
import { Finca } from 'src/app/model/finca';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ver-finca',
  templateUrl: './ver-finca.component.html',
  styleUrls: ['./ver-finca.component.scss'],
})
export class VerFincaComponent implements OnInit {

  fincas: Finca[];

  constructor(private fincaService: FincaService, private toastController: ToastController) { 
    fincaService.getAllUser(1).subscribe((data)=>{
      if(data.length > 0){
        this.fincas = data;      
        window.localStorage.setItem( "fincas", JSON.stringify(data));
      }else{
        this.toastConfirmacion('No tiene fincas registradas.', 'warning') 
      }
    })    
  }

  async toastConfirmacion(mensaje, colorT) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: colorT,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {}

}
