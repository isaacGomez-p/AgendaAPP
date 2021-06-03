import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Finca } from 'src/app/model/finca';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Siembra } from 'src/app/model/siembra';
import { Planilla } from 'src/app/model/planilla';
import { Producto } from 'src/app/model/producto';
import { Agricultor } from 'src/app/model/agricultor';

@Component({
  selector: 'app-aplicacion',
  templateUrl: 'aplicacion.page.html',
  styleUrls: ['aplicacion.page.scss']
})
export class AplicacionPage implements OnInit {

  siembras: Siembra[];

  fincaLista: Finca[];
  listaLotes: Siembra[];
  productos: Producto[];
  agricultor: Agricultor[];

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

  estadoFincaEditar: boolean = false;
  nombreFincaEditar: String;

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

  titulo: String;

  planillas: Planilla[]

  idPLanilla: number; 

  nombreBoton: String;

  constructor(private paramsUrl: ActivatedRoute, private toastController: ToastController, private loadingController: LoadingController, private router: Router) { }

  ngOnInit() {
    this.cargarFincasLS();
    if(this.paramsUrl.snapshot.paramMap.get('idEditar') === 'a'){
      this.titulo = "Planilla de aplicación";      
      this.nombreBoton = "Registrar";
    }else{
      this.titulo = "Editar planilla";
      this.nombreBoton = "Editar";
      this.cargarDatosEditar(parseInt(this.paramsUrl.snapshot.paramMap.get('idEditar')));
    }        
  }

  ionViewDidEnter() {
    this.cargarFincasLS();
  }

  cargarDatosEditar(id){
    if (JSON.parse(window.localStorage.getItem("planillas")) === null) {
      this.toastConfirmacion('No tiene planillas registradas.', 'warning');
    } else {
      this.estadoFincaEditar = true;
      this.planillas = JSON.parse(window.localStorage.getItem("planillas"));
      console.log("planilla" + JSON.stringify(this.planillas));
      this.planillas.map((item) => {
        if (item.planilla_id === id) {
          this.idPLanilla = item.planilla_id;
          this.actividad = item.actividad;
          this.control = item.control;
          this.prevencion = item.prevencion;
          this.fertilizacion = item.fertilizacion;
          this.dosis = item.dosis;
          this.mezcla_total = item.mezcla_total;
          this.total_dosis = item.total_dosis;
          this.elaborado = item.elaborado;
          this.fecha_aplicacion = item.fecha_aplicacion+"";
          this.calidad_ejecucion = parseInt(item.calidad_ejecucion+"");
          //this.calidad_ejecucion = item.calidad_ejecucion;
          this.fincaLista.map((finca) => {
            if(item.finca_id === finca.finca_id){
              this.nombreFincaEditar = 'Finca actual: ' + finca.nombre;
              this.finca = finca.finca_id;
              this.buscarLotesEditar(this.finca);
            }
          })
        }
      });
    }    
  }

  cargarFincasLS() {
    if (JSON.parse(window.localStorage.getItem("fincas")) === null || JSON.parse(window.localStorage.getItem("fincas")).length === 0) {
      this.toastConfirmacion('No tiene fincas registradas. Por favor actualice la pagina.', 'warning');
    } else {
      this.fincaLista = JSON.parse(window.localStorage.getItem("fincas"));
    }
    if (JSON.parse(window.localStorage.getItem("productos")) === null || JSON.parse(window.localStorage.getItem("productos")).length === 0) {
      this.toastConfirmacion('No tiene productos registrados.', 'warning');
    } else {
      this.productos = JSON.parse(window.localStorage.getItem("productos"));
    }
    if(JSON.parse(window.localStorage.getItem("planillas")) ===null) {
      this.toastConfirmacion('No tiene planillas registradas.', 'warning');
    }else{
      this.planillas = JSON.parse(window.localStorage.getItem("planillas"));
    }
    
  }

  buscarLotes(form) {
    this.finca = form.value.finca;
    this.siembras = JSON.parse(window.localStorage.getItem("siembras"));
    if(this.siembras.length > 0){
      this.listaLotes = [];
      this.siembras.map((item)=>{
        if(item.finca_id === parseInt(form.value.finca)){
          this.listaLotes.push(item);
        }
      })
      if(this.listaLotes.length <= 0){
        this.toastConfirmacion("La finca seleccionada no tiene siembras registradas", "warning")  
      }else{
        this.estadoSiguiente = true;
      }
    }else{
      this.listaLotes = [];
      this.toastConfirmacion("La finca seleccionada no tiene siembras registradas", "warning")
    }
    /*this.serviceSiembra.getSiembrasFinca(form.value.finca).subscribe((data) => {
      if (data.length > 0) {
        this.listaLotes = data;
        this.estadoSiguiente = true;
      } else {
        this.listaLotes = [];
        this.toastConfirmacion("La finca seleccionada no tiene siembras registradas", "warning")
      }
    })*/
  }

  buscarLotesEditar(id){
    this.finca = id;
    this.siembras = JSON.parse(window.localStorage.getItem("siembras"));
    if(this.siembras.length > 0){
      this.listaLotes = [];
      this.siembras.map((item)=>{
        if(item.finca_id === parseInt(id)){
          this.listaLotes.push(item);
        }
      })
      if(this.listaLotes.length <= 0){
        this.toastConfirmacion("La finca seleccionada no tiene siembras registradas - Editar", "warning")  
      }else{
        this.estadoSiguiente = true;
      }
    }else{
      this.listaLotes = [];
      this.toastConfirmacion("La finca seleccionada no tiene siembras registradas - Editar", "warning")
    }





    /*this.serviceSiembra.getSiembrasFinca(id).subscribe((data) => {
      if (data.length > 0) {
        this.listaLotes = data;
        this.estadoSiguiente = true;
      } else {
        this.listaLotes = [];
        this.toastConfirmacion("La finca seleccionada no tiene siembras registradas", "warning")
      }
    })*/
  }  


  registrar(form) {
    this.agricultor = JSON.parse(window.localStorage.getItem('agricultor'))
    console.log("planilla1" + JSON.stringify(this.planillas));
    for (let p of this.productos) {
      console.log(' ' + JSON.stringify(p));
      if (p.producto_id === Number.parseInt(form.value.producto)) {
        this.producto = p.nombre + " - " + p.variedad;
      }
    }

    
    if(this.titulo === "Editar planilla"){
      /*this.servicePlanilla.putPlanillaAplicacion(datos, this.idPLanilla).subscribe(() => {
        this.toastConfirmacion("Se edito correctamente correctamente", "success")
        
        this.resetDatos();
        this.estadoSiguiente = false;
      });*/
      this.planillas.map( item => {
        if(item.planilla_id === this.idPLanilla){
          item.actividad = form.value.actividad
          item.calidad_ejecucion = form.value.calidad_ejecucion
          item.control= form.value.control
          item.dosis= form.value.dosis
          item.elaborado= form.value.elaborado
          item.estado= form.value.ejecucion
          item.fecha_aplicacion= new Date(form.value.fecha_aplicacion)
          item.fecha_formulacion= new Date()
          item.fertilizacion= form.value.fertilizacion
          item.lote= form.value.lote
          item.mezcla_total= form.value.mezcla_total
          item.planilla_id= this.idPLanilla
          item.prevencion=form.value.prevencion
          item.producto=this.producto
          item.total_dosis=form.value.total_dosis
          item.n_planilla= Number.parseInt(localStorage.getItem('buscarPlanilla'))
          item.finca_id= Number.parseInt(this.finca+""),
          item.fincaNombre= null
          this.toastConfirmacion('Planilla editada correctamente.', 'success');
          this.resetDatos();
          this.estadoSiguiente = false;
          item.agricultor_id = this.agricultor[0].agricultor_id;
        }        
      })
      

    }else{
      /*this.servicePlanilla.postPlanillaAplicacion(datos).subscribe(() => {
        this.toastConfirmacion("Se registro correctamente", "success")
        this.resetDatos();
      }, err => {
        this.toastConfirmacion("Error.", "danger");
      });*/
      let cont = 0;
      this.planillas.map((item)=>{
        if(item.planilla_id <= 0){
          cont++;
        }
      })
      let datos = new Planilla();
      datos = {
      actividad: form.value.actividad,
      calidad_ejecucion: form.value.calidad_ejecucion,
      control: form.value.control,
      dosis: form.value.dosis,
      elaborado: form.value.elaborado,
      estado: form.value.ejecucion,
      fecha_aplicacion: this.horaLocalCO(new Date(form.value.fecha_aplicacion)),
      fecha_formulacion: this.horaLocalCO(new Date),
      fertilizacion: form.value.fertilizacion,
      lote: form.value.lote,
      mezcla_total: form.value.mezcla_total,
      planilla_id: cont*(-1),
      prevencion: form.value.prevencion,
      producto: this.producto,
      total_dosis: form.value.total_dosis,
      n_planilla: Number.parseInt(localStorage.getItem('buscarPlanilla')),
      finca_id: Number.parseInt(this.finca+""),
      fincaNombre: null,
      agricultor_id: this.agricultor[0].agricultor_id
    }
      this.planillas.push(datos)
      this.toastConfirmacion('Planilla registrada correctamente.', 'success');
      this.resetDatos();
    }
    window.localStorage.setItem("planillas", JSON.stringify(this.planillas));
    this.router.navigateByUrl('/planillas');
    
  }

  horaLocalCO(hora: Date): Date {
    let HoraInicio = hora;
    HoraInicio.setUTCFullYear(HoraInicio.getFullYear());
    HoraInicio.setUTCMonth(HoraInicio.getMonth());
    HoraInicio.setUTCDate(HoraInicio.getUTCDay());
    HoraInicio.setUTCHours(HoraInicio.getUTCHours() - 5);
    HoraInicio.setUTCMinutes(HoraInicio.getUTCMinutes());
    HoraInicio.setUTCSeconds(HoraInicio.getUTCSeconds());
    return HoraInicio;
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
    this.cargarFincasLS();
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

  /*cargarFincasBD() {
    this.serviceFinca.getAllUser(1).subscribe((data) => {
      if (data.length === 0) {
        this.toastConfirmacion('No se encontraron datos registrados.', 'warning');
      } else {
        this.fincaLista = data;
        window.localStorage.setItem("planillas", JSON.stringify(data));
      }
    })
  }*/

  async toastConfirmacion(mensaje, colorT) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: colorT,
      duration: 2000
    });
    toast.present();
  }

  volver(){
    this.estadoSiguiente = false;
  }

}
