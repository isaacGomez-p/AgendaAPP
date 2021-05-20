import { SiembraService } from './../../services/siembra.service';
import { Siembra } from './../../model/siembra';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Finca } from 'src/app/model/finca';

@Component({
  selector: 'app-siembra',
  templateUrl: './siembra.page.html',
  styleUrls: ['./siembra.page.scss']
})
export class SiembraPage implements OnInit{

  listaFincas: Finca[];

  constructor(private toastController: ToastController, private siembraService: SiembraService) {
    if(JSON.parse(window.localStorage.getItem("fincas")) === null || JSON.parse(window.localStorage.getItem("fincas")).length === 0){
      this.toastConfirmacion('No tiene fincas registradas.', 'warning')
    }else{
      this.listaFincas = JSON.parse(window.localStorage.getItem("fincas"));
    }
  }

  registrar(form){
    console.log('entro lote: ' + form.value.lote);
    console.log('entro surco: ' + form.value.surco);
    console.log('entro producto: ' + form.value.producto);
    console.log('entro variedad: ' + form.value.variedad);
    console.log('entro cant_plantas: ' + form.value.cant_plantas);    
    console.log('entro finca: ' + form.value.finca);

   /* let siembra = new Siembra();
    siembra.producto = form.value.producto;
    siembra.lote = form.value.lote;
    siembra.plantas = form.value.cant_plantas;
    siembra.surco = form.value.surco;
    siembra.variedad = form.value.variedad;
    siembra.anio = form.value.anio;
    siembra.dia = form.value.dia;
    siembra.semana = form.value.semana;
    this.siembraService.postSiembra(siembra).subscribe((data) =>{
      this.toastConfirmacion("Siembra registrada correctamente", "success");
    });

    /*siembra.dia = form.value.fecha_siembra.getUTCDay();
    siembra.anio = form.value.fecha_siembra.getFullYear();
    siembra.se = form.value.fecha_siembra.getFullYear();*/

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
