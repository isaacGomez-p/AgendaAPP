import { Planilla } from 'src/app/model/planilla';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Siembra } from 'src/app/model/siembra';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {

  productos: Producto[];
  productosEliminar: Producto[];
  planillas: Planilla[];
  siembras: Siembra[];
  nombre: String;
  variedad: String;

  productoId: number;
  codigo: String;
  duracionRefresh: number = 2000;
  nombreBoton: String = "Registrar";

  estadoBotonEliminar: boolean = true;
  constructor(private loadingController: LoadingController, private serviceProducto: ProductoService, public alertController: AlertController, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.cargarProductosLS();
  }

  registrar(form) {
    if (this.nombreBoton === "Editar") {

      this.productos.map((item) => {
        if (item.producto_id === this.productoId) {
          item.nombre = form.value.nombre,
            item.variedad = form.value.variedad
            item.edicion = true;
        }
      });
      this.toastConfirmacion("Se edito correctamente", "success");
      window.localStorage.setItem('productos', JSON.stringify(this.productos));
    } else {
      if (this.nombreBoton === "Registrar") {
        this.productos = JSON.parse(window.localStorage.getItem('productos'));
        let cont = 0;
        this.productos.map((item) => {
          if (item.producto_id <= 0) {
            cont++;
          }
        })
        let validacion = true;
        this.productos.map((item) => {
          if (item.nombre.toString() === form.value.nombre && item.variedad === form.value.variedad) {
            validacion = false;
          }
        })
        if (validacion === true) {
          let datos = new Producto();
          datos = {
            nombre: form.value.nombre,
            producto_id: cont * -1,
            variedad: form.value.variedad,
            edicion: false,
            agregar: false,
            codigo: this.generaCodigo()
          }
          this.productos.push(datos);
          this.toastConfirmacion("Se registro correctamente", "success");
          this.resetDatos()
          window.localStorage.setItem('productos', JSON.stringify(this.productos));
        } else {
          this.toastConfirmacion("Error, ya se encuentra registrado.", "warning");
        }
      }
    }

  }

  resetDatos() {
    this.nombre = null;
    this.variedad = null;
    this.productoId = null; 
    this.codigo = null;
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
    this.cargarProductosLS();
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
        this.codigo = item.codigo;
        this.nombreBoton = "Editar";
        this.estadoBotonEliminar = false;
      }
    });
  }

  generaCodigo(): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+ABCDEFGHIJKLMNOPQRSTUVXYZ';
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  eliminar(form) {
    this.planillas = JSON.parse(window.localStorage.getItem("planillas"));
    this.siembras = JSON.parse(window.localStorage.getItem("siembras"));
    let validacionPlanillas = true;
    let validacionSiembras = true;
    this.planillas.map((item) => {
      if (item.producto === this.codigo) {
        validacionPlanillas = false;
      }
    })
    this.siembras.map((item)=>{
      if(item.producto === this.codigo) {
        validacionSiembras = false;
      }
    })
    if (validacionSiembras === true) {
      if (validacionPlanillas === true) {
        if (this.productoId <= 0) {
          this.productosEliminar = [];
          this.productos.map((item)=>{
            if(item.producto_id !== this.productoId){
              this.productosEliminar.push(item);
            }
          })
          this.productos = []
          this.productos = this.productosEliminar
          this.estadoBotonEliminar = true;
          window.localStorage.setItem("productos", JSON.stringify(this.productos));
        } else {
          this.serviceProducto.deleteProducto(this.productoId).subscribe(() => {
            this.toastConfirmacion('Producto eliminado correctamente.', 'success');
            this.serviceProducto.getAll(0).subscribe((data)=>{
              this.productos = data
              window.localStorage.setItem("productos", JSON.stringify(data));
            })
            this.estadoBotonEliminar = true;            
          }, error => {
            this.toastConfirmacion('Por favor asegurese que tiene conexión a internet.', 'danger');
          })          
        }
        this.resetDatos();
      } else {
        this.toastConfirmacion('El producto esta asignado a una planilla.', 'danger');
      }
    } else {
      this.toastConfirmacion('El producto esta asignado a una siembra.', 'danger');
    }
  }
}
