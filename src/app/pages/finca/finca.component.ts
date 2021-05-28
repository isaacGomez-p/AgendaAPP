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

  nombreFinca: String;
  idFinca: number;
  idAgricultor: number;
  estado: number;

  fincas: Finca[];

  nombreBoton: String;

  constructor(private paramsUrl: ActivatedRoute, private fincaService: FincaService, private toastController: ToastController) {

  }

  ngOnInit() {
    this.titulo = this.paramsUrl.snapshot.paramMap.get('titulo')
    if (this.paramsUrl.snapshot.paramMap.get('idEditar') !== null && this.paramsUrl.snapshot.paramMap.get('idEditar') !== '0') {
      this.llenarCampoEditar(parseInt(this.paramsUrl.snapshot.paramMap.get('idEditar')))
      this.nombreBoton = "Editar";
    } else {
      this.nombreBoton = "Agregar";
    }
  }

  llenarCampoEditar(id) {
    if (JSON.parse(window.localStorage.getItem("fincas")) === null || JSON.parse(window.localStorage.getItem("fincas")).length === 0) {
      this.toastConfirmacion('No tiene fincas registradas.', 'warning');
    } else {
      this.fincas = JSON.parse(window.localStorage.getItem("fincas"));
      this.fincas.map((item) => {
        if (item.finca_id === id) {
          this.nombreFinca = item.nombre;
          this.estado = item.estado;
          this.idFinca = item.finca_id;
          this.idAgricultor = item.id_agricultor;
        }
      });
    }
  }

  agregarFinca(form) {
    if (this.nombreBoton === "Agregar") {
      let datos = new Finca();
      datos.nombre = form.value.nombreFinca;
      datos.estado = 1; //Estado 1 indica que esta activo
      datos.id_agricultor = 1;
      console.log('agrego');
      this.fincaService.postFinca(datos).subscribe((data) => {
        this.toastConfirmacion('Finca agregada correctamente.', 'success')
        this.nombreFinca = null;
      });
    } else {
      if (this.nombreBoton === "Editar") {
        let datos = new Finca();
        datos.finca_id = this.idFinca;
        datos.nombre = form.value.nombreFinca;
        datos.estado = this.estado;
        datos.id_agricultor = this.idAgricultor;
        this.fincaService.putFinca(datos, this.idFinca).subscribe((data) => {
          this.toastConfirmacion('Finca editada correctamente.', 'success')
          this.nombreFinca = null;
        });
        console.log('edito');
      }else{
        console.log('no entro');
      }
    }

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
