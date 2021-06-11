import { Agricultor } from './../../model/agricultor';
import { SiembraService } from './../../services/siembra.service';
import { Siembra } from './../../model/siembra';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Finca } from 'src/app/model/finca';
import { LoadingController } from '@ionic/angular';
import { FincaService } from 'src/app/services/finca.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/model/producto';

@Component({
  selector: 'app-siembra',
  templateUrl: './siembra.page.html',
  styleUrls: ['./siembra.page.scss']
})
export class SiembraPage implements OnInit {

  agricultor: Agricultor[];

  //Primer formulario
  finca: number;
  lote: string = '';
  nombreFinca: String;
  loteSeleccionado: string;
  //Segundo Formulario
  surco: number;
  producto: String;
  variedad: String;
  productoNombre: String;
  cant_plantas: number;
  anio: number;
  semana: number;
  dia: number;

  listaFincas: Finca[];
  productos: Producto[];
  lotes = ["-- Nuevo --"];
  //Control para los formularios
  estadoFormulario2: boolean = false;
  estadoFincaAsignada: boolean = false;
  estadoLoteNuevo: boolean = false;
  estadoCampoLote: boolean = true;
  //Variable para los metodos de refresh
  duracionRefresh: number = 2000;

  siembras: Siembra[];

  titulo: string;
  nombreBoton: string;

  constructor(private paramsUrl: ActivatedRoute, private toastController: ToastController, private siembraService: SiembraService, private loadingController: LoadingController, private fincaService: FincaService, private router: Router) {
  }

  ngOnInit() {

    /*if (this.paramsUrl.snapshot.paramMap.get('idEditar') === 'A') {
      this.titulo = "Plano de siembra";
      this.nombreBoton = "Registrar";
    } else {
      this.titulo = "Editar siembra";
      this.nombreBoton = "Editar";
      this.cargarDatosEditar(parseInt(this.paramsUrl.snapshot.paramMap.get('idEditar')));
    }
    this.cargarDatosLS();*/
  }

  ionViewDidEnter() {
    if (this.paramsUrl.snapshot.paramMap.get('idEditar') === 'A') {
      this.titulo = "Plano de siembra";
      this.nombreBoton = "Registrar";
    } else {
      this.titulo = "Actualizar siembra";
      this.nombreBoton = "Actualizar";
      this.cargarDatosEditar(parseInt(this.paramsUrl.snapshot.paramMap.get('idEditar')));
    }
    this.cargarDatosLS();
  }

  cargarDatosEditar(id) {
    this.siembras = JSON.parse(window.localStorage.getItem("siembras"));
    this.productos = JSON.parse(window.localStorage.getItem("productos"));
    this.siembras.map((item) => {
      if (item.plano_id === id) {
        this.lote = item.lote
        this.surco = item.surco
        this.productos.map((itemP) => {
          if (itemP.codigo === item.producto) {
            this.producto = itemP.producto_id+""
          }
        })
        this.cant_plantas = item.plantas
        this.anio = item.anio
        this.semana = item.semana
        this.dia = item.dia
        this.productoNombre = "Producto: " + item.producto + " - " + item.variedad
        this.loteSeleccionado = item.lote
      }
    });
  }

  cargarDatos() {
    if (JSON.parse(window.localStorage.getItem("buscarSiembraFinca")) !== null) {
      if (this.listaFincas.length > 0) {
        for (let i = 0; i < this.listaFincas.length; i++) {
          if (this.listaFincas[i].finca_id === JSON.parse(window.localStorage.getItem("buscarSiembraFinca"))) {
            this.finca = this.listaFincas[i].finca_id;
            this.nombreFinca = this.listaFincas[i].nombre;
          }
        }
      }
    } else {
      this.router.navigateByUrl('/verFinca');
    }
  }

  siguiente1(form) {
    this.finca = form.value.finca;
    if (this.loteSeleccionado === "--Nuevo--") {
      this.lote = form.value.lote;
    }
    this.estadoFormulario2 = true;
  }

  anterior() {
    this.estadoFormulario2 = false;
  }

  validacionDatos(form): boolean {
    if (form.value.dia > 31 || form.value.dia < 1) {
      this.toastConfirmacion("Error, verifique el día", "warning");
      return false;
    }
    if (form.value.semana > 52 || form.value.semana < 1) {
      this.toastConfirmacion("Error, verifique la semana", "warning");
      return false;
    }
    let fecha = new Date();

    if (form.value.anio > fecha.getFullYear() || form.value.anio < 1990) {
      this.toastConfirmacion("Error, verifique el año", "warning");
      return false;
    }
    return true;
  }

  registrar(form) {
    this.agricultor = JSON.parse(window.localStorage.getItem('agricultor'))
    if (this.validacionDatos(form) === true) {
      if (this.nombreBoton === "Registrar") {
        let validacion = true;
        if (validacion === true) {
          let siembra = new Siembra();
          for (let p of this.productos) {
            if (p.producto_id === Number.parseInt(form.value.producto)) {
              this.variedad = p.variedad;
              this.producto = p.codigo
            }
          }
          let cont = 0;
          this.siembras.map((item) => {
            if (item.plano_id <= 0) {
              cont++;
            }
          });

          let fincas = JSON.parse(window.localStorage.getItem("fincas"));
          let codigo = "";
          for (let f of fincas) {
            if (f.finca_id === parseInt(JSON.parse(window.localStorage.getItem("buscarSiembraFinca")))) {
              codigo = f.codigo;
            }
          }

          siembra = {
            plano_id: cont * -1,
            plantas: form.value.cant_plantas,
            surco: form.value.surco,
            variedad: this.variedad,
            producto: this.producto,
            anio: form.value.anio,
            dia: form.value.dia,
            semana: form.value.semana,
            finca_id: JSON.parse(window.localStorage.getItem("buscarSiembraFinca")),
            lote: this.lote,
            agricultor_id: this.agricultor[0].agricultor_id,
            codigo: this.generaCodigo(),
            agregar: false,
            codigo_finca: codigo
          }
          this.siembras.push(siembra);
          this.toastConfirmacion("Siembra registrada correctamente", "success");
          this.formatearValores()
          window.localStorage.setItem('siembras', JSON.stringify(this.siembras));
          this.router.navigateByUrl('/verSiembra');

        } else {
          this.toastConfirmacion("Error, ya se encuentra registrado.", "warning");
        }
      } else {
        let id = parseInt(this.paramsUrl.snapshot.paramMap.get('idEditar'))
        for (let p of this.productos) {
          if (p.producto_id === Number.parseInt(form.value.producto)) {
            this.variedad = p.variedad;
            this.producto = p.codigo
          }
        }
        let codigo = "";
        let codigo_finca = "";
        let finca_id = 0;

        this.siembras.map((item) => {
          if (item.plano_id === id) {
            codigo_finca = item.codigo_finca
            finca_id = item.finca_id
            codigo = item.codigo
          }
        })
        let siembra = new Siembra();
        siembra = {
          plano_id: id,
          plantas: form.value.cant_plantas,
          surco: form.value.surco,
          variedad: this.variedad,
          producto: this.producto,
          anio: form.value.anio,
          dia: form.value.dia,
          semana: form.value.semana,
          finca_id: finca_id,
          lote: this.lote,
          agricultor_id: this.agricultor[0].agricultor_id,
          codigo: codigo,
          agregar: false,
          codigo_finca: codigo_finca
        }
        let validacion = 0;
        console.log(" " + JSON.stringify(siembra))
        this.siembras.map((item) => {
          if (item.plano_id === id) {
            item.surco = form.value.surco
            item.variedad = this.variedad
            item.producto = this.producto
            item.lote = this.lote
            item.dia = form.value.dia
            item.semana = form.value.semana
            item.anio = form.value.anio
            item.plantas = form.value.cant_plantas
            validacion = 1
          }
        })
        if (validacion === 1) {
          this.toastConfirmacion("Siembra actualizada correctamente", "success");
          this.formatearValores()
          window.localStorage.setItem('siembras', JSON.stringify(this.siembras));
          this.router.navigateByUrl('/verSiembra');
        }
      }
    }
  }

  generaCodigo(): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+ABCDEFGHIJKLMNOPQRSTUVXYZ';
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }


  async toastConfirmacion(mensaje, colorT) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: colorT,
      duration: 2000
    });
    toast.present();
  }

  cargarDatosLS() {
    //Carga todas las siembras del LocalStorage
    if (JSON.parse(window.localStorage.getItem("siembras")) === null) {
      this.toastConfirmacion('No tiene siembras registradas.', 'warning');
    } else {
      this.siembras = JSON.parse(window.localStorage.getItem("siembras"));
      this.lotes = [];
      this.lotes.push("--Nuevo--");
      this.siembras.map((item) => {
        if (item.finca_id === parseInt(JSON.parse(window.localStorage.getItem("buscarSiembraFinca")))) {
          console.log("entro " + item.finca_id + " - " + item.plano_id);
          let validacion = true;
          this.lotes.map((l) => {
            if (l === item.lote) {
              validacion = false;
            }
          });
          if (validacion === true) {
            this.lotes.push(item.lote);
          }
        }
      })
    }

    if (JSON.parse(window.localStorage.getItem("fincas")) === null || JSON.parse(window.localStorage.getItem("fincas")).length === 0) {
      this.toastConfirmacion('No tiene fincas registradas.', 'warning');
    } else {
      this.listaFincas = JSON.parse(window.localStorage.getItem("fincas"));
      this.cargarDatos();
    }
    if (JSON.parse(window.localStorage.getItem("productos")) === null || JSON.parse(window.localStorage.getItem("productos")).length === 0) {
      this.toastConfirmacion('No tiene productos registrados.', 'warning');
    } else {      
      this.productos = JSON.parse(window.localStorage.getItem("productos"));
      if(this.productos.length === 0){
        this.toastConfirmacion('Por favor registre productos.', 'warning');
      }
    }
  }

  seleccionarLote(lote) {
    if (lote !== "--Nuevo--") {
      this.lote = lote;
      this.estadoCampoLote = true;
    } else {
      this.lote = null;
      this.estadoCampoLote = false;
    }
  }

  formatearValores() {
    this.finca = null;
    this.lote = null;
    this.semana = null;
    this.surco = null;
    this.variedad = null;
    this.anio = null;
    this.cant_plantas = null;
    this.dia = null;
    this.estadoFormulario2 = false;
    this.loteSeleccionado = null;
  }

  // Función para refrescar la página
  doRefresh(event) {
    this.cargarDatosLS();
    this.presentLoading();
    setTimeout(() => {
      event.target.complete();
    }, this.duracionRefresh);
  }

  // Función para refrescar la página
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espera...',
      duration: this.duracionRefresh
    });
    await loading.present();
  }


}
