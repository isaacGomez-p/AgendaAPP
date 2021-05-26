import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Finca } from 'src/app/model/finca';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PlanillaService } from 'src/app/services/planilla.service';
import { FincaService } from 'src/app/services/finca.service';
import { SiembraService } from 'src/app/services/siembra.service';
import { Siembra } from 'src/app/model/siembra';
import { Planilla } from 'src/app/model/planilla';
import { Producto } from 'src/app/model/producto';


@Component({
  selector: 'app-aplicacion',
  templateUrl: 'aplicacion.page.html',
  styleUrls: ['aplicacion.page.scss']
})
export class AplicacionPage implements OnInit {

  fincaLista: Finca[];
  listaLotes: Siembra[];
  productos: Producto[];

  finca: number;
  lote: number;
  actividad: String;
  control: String;
  prevencion: String;
  fertilizacion: String;
  producto: String;
  dosis: number;
  mezcla_total: number;
  total_dosis: number;
  elaborado: String;
  fecha_aplicacion: String;
  ejecucion: String;
  calidad_ejecucion: number;

  duracionRefresh: number = 2000;

  estadoSiguiente: boolean = false;


  listaEjecucion = ["Ejecutado", "No ejecutado"];

  listaActividad = ["Foliar", "Drench", "Biologic", "Protección Flor (Insect.)",
    "Protección Flor (Fungi.)",
    "Protección Rebrotes (Insect.)",
    "Protección Rebrotes (Fungi.)",
    "Poda",
    "PBZ",
    "Detonant",
    "Flor",
    "Cosecha",
    "Plateo",
    "Guadaña"]

  constructor(private toastController: ToastController, private loadingController: LoadingController, private router: Router, private servicePlanilla: PlanillaService, private serviceFinca: FincaService, private serviceSiembra: SiembraService) { }

  ngOnInit() {
    this.cargarFincasLS();
  }

  ionViewDidEnter() {
    this.cargarFincasLS();
  }

  cargarFincasLS() {
    if (JSON.parse(window.localStorage.getItem("fincas")) === null || JSON.parse(window.localStorage.getItem("fincas")).length === 0) {
      this.toastConfirmacion('No tiene fincas registradas. Por favor actualice la pagina.', 'warning');
    } else {
      this.fincaLista = JSON.parse(window.localStorage.getItem("fincas"));
    }
    if(JSON.parse(window.localStorage.getItem("productos")) === null || JSON.parse(window.localStorage.getItem("productos")).length === 0){
      this.toastConfirmacion('No tiene productos registrados.', 'warning');
    }else{
      this.productos =  JSON.parse(window.localStorage.getItem("productos"));            
    }
  }

  buscarLotes(form) {
    this.finca = form.value.finca;
    this.serviceSiembra.getSiembrasFinca(form.value.finca).subscribe((data) => {
      if (data.length > 0) {
        this.listaLotes = data;
        this.estadoSiguiente = true;
      } else {
        this.listaLotes = [];
        this.toastConfirmacion("La finca seleccionada no tiene siembras registradas", "warning")
      }
    })
  }


  registrar(form) {    

    for(let p of this.productos){
      console.log(' ' + JSON.stringify(p));
      if(p.producto_id === Number.parseInt(form.value.producto)){        
        this.producto = p.nombre + " - " + p.variedad;
      }
    }       

    let datos = new Planilla();
    datos = {
      actividad: form.value.actividad,
      calidad_ejecucion: form.value.calidad_ejecucion,
      control: form.value.control,
      dosis: form.value.dosis,
      elaborado: form.value.elaborado,
      estado: form.value.ejecucion,
      fecha_aplicacion: new Date(form.value.fecha_aplicacion),
      fecha_formulacion: new Date(),
      fertilizacion: form.value.fertilizacion,
      lote: form.value.lote,
      mezcla_total: form.value.mezcla_total,
      planilla_id: form.value.planilla_id,
      prevencion: form.value.prevencion,
      producto: this.producto,
      total_dosis: form.value.total_dosis,
      n_planilla: Number.parseInt(localStorage.getItem('buscarPlanilla')),
      finca_id: this.finca,
      fincaNombre: null
    }    
    this.servicePlanilla.postPlanillaAplicacion(datos).subscribe(() => {
      this.toastConfirmacion("Se registro correctamente", "success")
      this.resetDatos();
    }, err => {
      this.toastConfirmacion("Error.", "danger");
    });
  }

  resetDatos() {
    this.finca = null;
    this.lote = null;
    this.actividad = null;
    this.control = null;
    this.prevencion = null;
    this.fertilizacion = null;
    this.producto = null;
    this.dosis = null;
    this.mezcla_total = null;
    this.total_dosis = null;
    this.elaborado = null;
    this.fecha_aplicacion = null;
    this.ejecucion = null;
    this.calidad_ejecucion = null;
    this.estadoSiguiente = false;
  }

  doRefresh(event) {
    window.localStorage.removeItem("buscarPlanilla")
    this.cargarFincasBD();
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

  cargarFincasBD() {
    this.serviceFinca.getAllUser(1).subscribe((data) => {
      if (data.length === 0) {
        this.toastConfirmacion('No se encontraron datos registrados.', 'warning');
      } else {
        this.fincaLista = data;
        window.localStorage.setItem("planillas", JSON.stringify(data));
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

}
