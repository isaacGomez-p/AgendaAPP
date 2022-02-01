import { AgricultorService } from './../../services/agricultor.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { UserEntity } from 'src/app/model/userEntity';

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

  correo: string;
  departamento: string;
  ciudad: string;

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
      let datos = new UserEntity();
      datos = {
        id: 0,
        lastName: form.value.apellido,
        document: form.value.cedula,
        password: form.value.clave,
        status: 1,
        firstName: form.value.nombre,
        city: form.value.ciudad,
        email: form.value.correo,
        dept: form.value.depto,
        products: null
      }
      console.log("userEntity -> " + JSON.stringify(datos));
      this.agricultorService.postAgricultor(datos).subscribe(() => {
        this.toastConfirmacion("Guardado Correctamente.", "success");
        this.reset();
        this.router.navigateByUrl('/login');
      }, err => {
        this.toastConfirmacion("Error, ya se encuentra registrado.", "danger");
      });
    }
  }

  reset() {
    this.nombre = null;
    this.apellido = null;
    this.cedula = null;
    this.clave = null;
    this.claveConfirmacion = null;
    this.correo = null;
    this.ciudad = null;
    this.departamento = null;
  }

  validarDatos(form): boolean {
    let clave: String
    let claveConfirmacion: String
    clave = form.value.clave;
    claveConfirmacion = form.value.claveConfirmacion;
    console.log('1 - ' + clave)
    console.log('2 - ' + claveConfirmacion)
    if (clave !== claveConfirmacion) {
      this.toastConfirmacion("Las claves no coinciden.", "warning");
      return false;
    }

    let posicionArroba = form.value.correo.lastIndexOf('@');
    let posicionPunto = form.value.correo.lastIndexOf('.');
    if (!(posicionArroba < posicionPunto && posicionArroba > 0 && form.value.correo.indexOf('@@') === -1 && posicionPunto > 2 && (form.value.correo.length - posicionPunto) > 2)) {
      this.toastConfirmacion("Por favor, ingrese un correo válido.", "warning");      
      return false;
    }

    if (form.value.cedula > 99999999999) {
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
