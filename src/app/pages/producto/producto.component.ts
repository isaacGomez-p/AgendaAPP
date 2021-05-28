import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {

  productos: Producto[];

  nombre: String;
  variedad: String;

  productoId: number;

  duracionRefresh: number = 2000;
  nombreBoton: String = "Registrar";
  constructor(private loadingController: LoadingController, private serviceProducto: ProductoService, public alertController: AlertController, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.cargarProductosLS();
  }

  registrar(form) {
    if (this.nombreBoton === "Editar") {
      let datos = new Producto();
      datos = {
        nombre: form.value.nombre,
        producto_id: this.productoId,
        variedad: form.value.variedad
      }
      this.serviceProducto.putFinca(datos, this.productoId).subscribe(() => {
        this.toastConfirmacion("Se edito correctamente", "success");
        this.resetDatos();
      }, err => {
        this.toastConfirmacion("Error, ya se encuentra registrado.", "danger");
      });
    } else {
      if (this.nombreBoton === "Registrar") {
        let datos = new Producto();
        datos = {
          nombre: form.value.nombre,
          producto_id: 0,
          variedad: form.value.variedad
        }
        this.serviceProducto.postFinca(datos).subscribe(() => {
          this.toastConfirmacion("Se registro correctamente", "success");
          this.resetDatos();
        }, err => {
          this.toastConfirmacion("Error, ya se encuentra registrado.", "danger");
        });
      }
    }

  }

  resetDatos() {
    this.nombre = null;
    this.variedad = null;
    this.nombreBoton = "Registrar";
  }

  cargarProductosLS() {
    if (JSON.parse(window.localStorage.getItem("productos")) === null || JSON.parse(window.localStorage.getItem("productos")).length === 0) {
      this.toastConfirmacion('No tiene productos registrados. Por favor actualice.', 'warning');
    } else {
      this.productos = JSON.parse(window.localStorage.getItem("productos"));
    }
  }

  doRefresh(event) {
    this.cargarProductosBD();
    this.presentLoading();
    setTimeout(() => {
      event.target.complete();
    }, this.duracionRefresh);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espera...',
      duration: this.duracionRefresh
    });
    await loading.present();
  }

  async toastConfirmacion(mensaje, colorT) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: colorT,
      duration: 2000
    });
    toast.present();
  }

  cargarProductosBD() {
    this.serviceProducto.getAll(0).subscribe((data) => {
      if (data !== null) {
        if (data.length > 0) {
          this.productos = data;
          window.localStorage.setItem('productos', JSON.stringify(data));
        }
      } else {
        this.toastConfirmacion('No se encontraron productos registrados.', 'warning');
      }
    })
  }

  editar(id) {
    this.productos.map((item) => {
      if (item.producto_id === id) {
        this.nombre = item.nombre;
        this.variedad = item.variedad;
        this.productoId = item.producto_id;
        this.nombreBoton = "Editar";
      }
    });
  }
}
