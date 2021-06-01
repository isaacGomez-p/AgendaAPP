import { AgricultorService } from './../../services/agricultor.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Agricultor } from 'src/app/model/agricultor';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  titulo: string;
  nombre: string;
  apellido: string;
  cedula: number;
  clave: string;
  claveConfirmacion: string;

  constructor(private toastController: ToastController, private paramsUrl: ActivatedRoute, private router: Router, private modalController: ModalController, private agricultorService: AgricultorService) {
    this.titulo = this.paramsUrl.snapshot.paramMap.get('titulo')
  }

  ngOnInit() { }

  volver() {
    this.router.navigateByUrl('/login');
  }

  async dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  registro(form) {
    if (this.validarDatos(form) === true) {
      let datos = new Agricultor();
      datos = {
        agricultor_id: 0,
        apellido: form.value.apellido,
        cedula: form.value.cedula,
        clave: form.value.clave,
        estado: 1,
        nombre: form.value.nombre
      }
      this.agricultorService.postAgricultor(datos).subscribe(() => {
        this.toastConfirmacion("Guardado Correctamente.", "success");
        this.reset();
        this.router.navigateByUrl('/login');
      }, err => {
        this.toastConfirmacion("Error, ya se encuentra registrado.", "danger");
      });
    }
  }

  reset(){
    this.nombre = null;
    this.apellido = null;
    this.cedula = null;
    this.clave = null;
    this.claveConfirmacion = null;
  }

  validarDatos(form): boolean {
    let clave: String
    let claveConfirmacion: String
    clave = form.value.clave;
    claveConfirmacion = form.value.claveConfirmacion;
    console.log('1 - ' +clave)
    console.log('2 - ' +claveConfirmacion)
    if (clave !== claveConfirmacion) {
      this.toastConfirmacion("Las claves no coinciden.", "warning");
      return false;
    }

    if (form.value.cedula > 999999999) {
      this.toastConfirmacion("Cédula incorrecta.", "warning");
      return false;
    }

    if (form.value.cedula < 9999999) {
      this.toastConfirmacion("Cédula incorrecta.", "warning");
      return false;
    }

    return true;
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
