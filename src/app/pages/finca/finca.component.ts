import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Finca } from 'src/app/model/finca';
import { FincaService } from 'src/app/services/finca.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-finca',
  templateUrl: './finca.component.html',
  styleUrls: ['./finca.component.scss'],
})
export class FincaComponent implements OnInit {

  titulo: String;

  nombreFinca: string;

  constructor(private paramsUrl: ActivatedRoute, private fincaService: FincaService, private toastController: ToastController) { 
    this.titulo = paramsUrl.snapshot.paramMap.get('titulo')
  }

  ngOnInit() {}
  
  agregarFinca(form){    
    let datos = new Finca();
    datos.nombre = form.value.nombreFinca;
    datos.estado = 1; //Estado 1 indica que esta activo
    datos.id_agricultor = 1; 
    this.fincaService.postFinca(datos).subscribe((data) => {
      this.toastConfirmacion('Finca agregada correctamente.', 'success')
      this.nombreFinca = null;
    });
  }

  async toastConfirmacion(mensaje, colorT) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: colorT,
      duration: 2000
    });
    toast.present();
  }

}
