import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LandEntity } from 'src/app/model/finca';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Siembra } from 'src/app/model/siembra';
import { Planilla } from 'src/app/model/planilla';
import { ProductEntity } from 'src/app/model/producto';
import { UserEntity } from 'src/app/model/userEntity';
import { NumeroPlanilla } from 'src/app/model/numeroPlanilla';

@Component({
  selector: 'app-aplicacion',
  templateUrl: 'aplicacion.page.html',
  styleUrls: ['aplicacion.page.scss']
})
export class AplicacionPage implements OnInit {

  siembras: Siembra[];

  fincaLista: LandEntity[];
  listaLotes: Siembra[];
  productos: ProductEntity[];
  agricultor: UserEntity;

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
  codigoFinca: String;
  duracionRefresh: number = 2000;

  estadoSiguiente: boolean = true;

  estadoFincaEditar: boolean = false;
  nombreFincaEditar: String;
  estadoEditar: boolean = false;
  controlTipo = ["Control", "Nutrición", "Prevención"]

  listaEjecucion = ["Ejecutado", "No ejecutado", "Por ejecutar"];

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

  planillas: Planilla[] = [];

  idPLanilla: number;

  nombreBoton: String;

  loteNombre: String;
  prioridadId: number;
  productoNombre: String;
  ejecucionNombre: String;

  constructor(private paramsUrl: ActivatedRoute, private toastController: ToastController, private loadingController: LoadingController, private router: Router) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.cargarPrioridad()
    this.cargarFincasLS();
    if (this.paramsUrl.snapshot.paramMap.get('idEditar') === 'a') {
      this.titulo = "Planilla de aplicación";
      this.nombreBoton = "Registrar";
      this.estadoEditar = false;
    } else {
      this.titulo = "Editar planilla";
      this.nombreBoton = "Editar";
      this.estadoEditar = true;
      this.cargarDatosEditar(parseInt(this.paramsUrl.snapshot.paramMap.get('idEditar')));
    }
  }

  cargarPrioridad(){
    let prioridad = JSON.parse(window.localStorage.getItem("insertarActividad"));
    this.loteNombre = prioridad.descripcion
    this.prioridadId = prioridad.idNombre
  }

  cargarDatosEditar(id) {
    if (JSON.parse(window.localStorage.getItem("planillasActividad")) === null) {
      this.toastConfirmacion('No tiene planillas registradas.', 'warning');
    } else {
      this.estadoFincaEditar = true;
      this.planillas = JSON.parse(window.localStorage.getItem("planillasActividad"));
      console.log("planilla" + JSON.stringify(this.planillas));
      this.planillas.map((item) => {
        if (item.spreadsheetId === id) {
          this.lote = parseInt(item.lote+"")
          console.log(" lote " + this.lote)
          this.ejecucion = item.status
          this.idPLanilla = item.spreadsheetId;
          this.producto = item.producto
          this.productoNombre = item.producto
          this.ejecucionNombre = item.status
          this.actividad = item.activity;
          this.control = item.control;
          this.prevencion = item.prevention;
          this.fertilizacion = item.fertilization;
          this.dosis = item.dose;
          this.mezcla_total = item.totalMix;
          this.total_dosis = item.totalDose;
          this.elaborado = item.madeBy;
          this.fecha_aplicacion = item.filingDate + "";
          this.calidad_ejecucion = parseInt(item.quality + "");
          //this.calidad_ejecucion = item.calidad_ejecucion;
          this.fincaLista.map((finca) => {
            if (item.landId === finca.landId) {
              this.nombreFincaEditar = 'Finca actual: ' + finca.name;
              this.finca = finca.landId;
              this.codigoFinca = finca.code;
              this.buscarLotesEditar(this.finca);
              this.listaLotes.map((itemLote) => {
                if (itemLote.id === parseInt(item.lote + "")) {
                  this.loteNombre = itemLote.batch + " - Surco: " + itemLote.groove
                  
                }
              })
            }
          })          
        }
      });
    }
  }

  cargarFincasLS() {
    console.log("planillas"+this.planillas);
    this.productos = []
      this.productos.push(
        {
          product_id: 1,
          agregar: true,
          code: 'asdasdsad',
          edicion: false,
          name: "Camaron",
          user: null,
          variety: "Vannamei"
        }
      )
      this.fincaLista = []
    /*if (JSON.parse(window.localStorage.getItem("fincas")) === null || JSON.parse(window.localStorage.getItem("fincas")).length === 0) {
      this.toastConfirmacion('No tiene fincas registradas. Por favor actualice la pagina.', 'warning');
    } else {
      this.fincaLista = JSON.parse(window.localStorage.getItem("fincas"));
    }*/
    /*if (JSON.parse(window.localStorage.getItem("productos")) === null || JSON.parse(window.localStorage.getItem("productos")).length === 0) {
      this.toastConfirmacion('No tiene productos registrados.', 'warning');      
      
    } else {
      this.productos = JSON.parse(window.localStorage.getItem("productos"));
    }*/
    if (JSON.parse(window.localStorage.getItem("planillasActividad")) === null) {
      this.toastConfirmacion('No tiene planillas registradas.', 'warning');
    } else {
      this.planillas = JSON.parse(window.localStorage.getItem("planillasActividad"));
    }

  }

  buscarLotes(form) {
    this.finca = form.value.finca;
    if(this.fincaLista == null){
      this.toastConfirmacion("Por favor verifique que haya sincronizado.", "warning");
    }else{    
      this.fincaLista.map((item)=>{
        if(parseInt(this.finca+"") === item.landId){
          console.log("entro codigo " + item.code)
          this.codigoFinca = item.code
        }
      })
      this.siembras = JSON.parse(window.localStorage.getItem("siembras"));
      if(this.siembras == null){
        this.toastConfirmacion("Por favor verifique que haya sincronizado.", "warning");
      }else{    
        if (this.siembras.length > 0) {
          this.listaLotes = [];
          this.siembras.map((item) => {
            if (item.land.landId === parseInt(form.value.finca)) {
              this.listaLotes.push(item);              
            }
          })
          if (this.listaLotes.length <= 0) {
            this.toastConfirmacion("La finca seleccionada no tiene siembras registradas", "warning")
          } else {
            this.estadoSiguiente = true;
          }
        } else {
          this.listaLotes = [];
          this.toastConfirmacion("La finca seleccionada no tiene siembras registradas", "warning")
        }
      }
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

  seleccionarLote(lote){
    console.log("--- " + JSON.stringify(lote))
    this.listaLotes.map((item)=> {
      if(item.id === Number(lote)){
        this.producto = item.product.name + " - " + item.product.variety
      }
    })
    
  }

  buscarLotesEditar(id) {
    this.finca = id;
    this.fincaLista.map((item)=>{
      if(this.finca === item.landId){
        console.log("entro codigo editar " + item.code)
        this.codigoFinca = item.code
      }
    })
    this.siembras = JSON.parse(window.localStorage.getItem("siembras"));
    if (this.siembras.length > 0) {
      this.listaLotes = [];
      this.siembras.map((item) => {
        if (item.land.landId === parseInt(id)) {
          this.listaLotes.push(item);
        }
      })
      if (this.listaLotes.length <= 0) {
        this.toastConfirmacion("La finca seleccionada no tiene siembras registradas - Editar", "warning")
      } else {
        this.estadoSiguiente = true;
      }
    } else {
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
      if (p.product_id === Number.parseInt(form.value.producto)) {
        this.producto = p.code
      }
    }
    if (this.titulo === "Editar planilla") {
      /*this.servicePlanilla.putPlanillaAplicacion(datos, this.idPLanilla).subscribe(() => {
        this.toastConfirmacion("Se edito correctamente correctamente", "success")
        
        this.resetDatos();
        this.estadoSiguiente = false;
      });*/

      /*let numeroPlanilla: NumeroPlanilla[] = JSON.parse(window.localStorage.getItem('numeroPlanillas'))
      let codigoNumero = "";
      let objetoNumeroPlanilla = new NumeroPlanilla();
      for (let n of numeroPlanilla) {
        if (n.nSpreadsheetId === Number.parseInt(localStorage.getItem('buscarPlanilla'))) {
          codigoNumero = n.code
          objetoNumeroPlanilla = n;
        }
      }  
*/
      let objetoNumeroPlanilla = new NumeroPlanilla();   
      console.log("this.idPLanilla -> " + this.idPLanilla)   
      this.planillas.map(item => {
        console.log("item.spreadsheetId  -> " + item.spreadsheetId )   
        if (item.spreadsheetId === this.idPLanilla) {
          item.activity = form.value.actividad
          item.quality = form.value.calidad_ejecucion
          item.control = form.value.control
          item.dose = form.value.dosis
          item.madeBy = form.value.elaborado
          item.status = form.value.ejecucion
          item.filingDate = new Date(form.value.fecha_aplicacion)
          item.filingDate = new Date()
          item.fertilization = form.value.control
          item.lote = form.value.lote
          item.totalMix = form.value.mezcla_total
          item.spreadsheetId = this.idPLanilla
          item.prevention = form.value.control
          item.producto = this.producto
          item.totalDose = form.value.total_dosis
          item.nSpreadsheet = objetoNumeroPlanilla
          item.landId = Number.parseInt(this.finca + "")
          item.codeLand = this.codigoFinca + ""
          item.fincaNombre = null
          this.toastConfirmacion('Planilla editada correctamente.', 'success');
          this.resetDatos();
         // this.estadoSiguiente = false;
          item.agricultor_id = this.agricultor.id;
        }
      })

      console.log("" + JSON.stringify(this.planillas));
    } else {
      console.log("ASDSADASDDAS----------1")
      let cont = 0;
      this.planillas.map((item) => {
        if (item.spreadsheetId <= 0) {
          cont++;
        }
      })
      let codigo = "";
      /*this.siembras.map((item) => {
        if (item.id === parseInt(form.value.lote)) {
          codigo = item.code
        }
      });*/

//      let numeroPlanilla: NumeroPlanilla[] = JSON.parse(window.localStorage.getItem('numeroPlanillas'))
      let codigoNumero = "";
      let objetoNumeroPlanilla = new NumeroPlanilla();
  /*    for (let n of numeroPlanilla) {
        if (n.nSpreadsheetId === Number.parseInt(localStorage.getItem('buscarPlanilla'))) {
          codigoNumero = n.code
          objetoNumeroPlanilla = n;
        }
      }      
*/
console.log("ASDSADASDDAS----------2 -> " + JSON.stringify(this.agricultor) + " - " + form.value.fecha_aplicacion)
      let datos = new Planilla();
      datos = {
        activity: form.value.actividad,
        quality: form.value.calidad_ejecucion,
        control: form.value.control,
        dose: form.value.dosis,
        madeBy: form.value.elaborado,
        status: form.value.ejecucion,
        applicationDate: new Date(form.value.fecha_aplicacion),
        filingDate: new Date,
        fertilization: form.value.control,
        lote: form.value.lote,
        totalMix: form.value.mezcla_total,
        spreadsheetId: cont * (-1),
        prevention: form.value.control,
        producto: this.producto,
        totalDose: form.value.total_dosis,
        nSpreadsheet: objetoNumeroPlanilla,
        landId: Number.parseInt(this.finca + ""),
        fincaNombre: null,
        agricultor_id: this.agricultor.id,
        code: codigo,
        agregar: false,
        codeNSpreadsheet: codigoNumero,
        fechaString: null,
        codeLand: this.codigoFinca + "",
        fechaAplicacionString: null,
        name: null,
        plantingMaps: null,
        priority: this.prioridadId
      }
      console.log("ASDSADASDDAS----------3")
      this.planillas.push(datos)
      this.toastConfirmacion('Planilla registrada correctamente.', 'success');
      this.resetDatos();
      console.log("ASDSADASDDAS----------4")
    }
    window.localStorage.setItem("planillasActividad", JSON.stringify(this.planillas));
    this.router.navigateByUrl('/planillas');
    console.log("ASDSADASDDAS----------5")
  }

  horaLocalCO(hora: Date): Date {
    console.log("_________ " + hora)
    let HoraInicio = hora;
    HoraInicio.setMinutes
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
    //this.estadoSiguiente = false;
    this.codigoFinca = null;
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

  volver() {
    /*if (this.nombreBoton === "Editar") {

      this.router.navigateByUrl('/planillas');
    } else {
     // this.estadoSiguiente = false;
    }*/
    this.router.navigateByUrl('/planillas');
  }

}
