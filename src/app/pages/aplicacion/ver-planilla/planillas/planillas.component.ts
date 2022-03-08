import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Planilla } from 'src/app/model/planilla';
import { Siembra } from 'src/app/model/siembra';
import { FincaService } from 'src/app/services/finca.service';
import { PlanillaService } from 'src/app/services/planilla.service';

@Component({
  selector: 'app-planillas',
  templateUrl: './planillas.component.html',
  styleUrls: ['./planillas.component.scss'],
})
export class PlanillasComponent implements OnInit {

  planillasLS: Planilla[];
  planillas: Planilla[];
  siembras: Siembra[];
  duracionRefresh: number = 2000;

  constructor(private loadingController: LoadingController, private router: Router, private planillaService: PlanillaService, private toastController: ToastController, private fincaService: FincaService) { }

  ionViewDidEnter(){
    this.inicioCargarPlanillasLS();
  }

  ngOnInit() {
    this.inicioCargarPlanillasLS();
  }

  inicioCargarPlanillasLS(){

    console.log("Cargando planillas")
    if(JSON.parse(window.localStorage.getItem("planillasActividad")) === undefined || JSON.parse(window.localStorage.getItem("planillasActividad")) === null || JSON.parse(window.localStorage.getItem("planillasActividad")).length === 0){
      this.toastConfirmacion('No tiene planillas registradas.', 'warning');
      this.planillas = []
      //this.planillas =  JSON.parse(window.localStorage.getItem("planillasActividad"));
    }else{                   
      let planillasPrioridad =  JSON.parse(window.localStorage.getItem("planillasActividad"));
      console.log("planillasPrioridad-> " + JSON.stringify(planillasPrioridad))
      let prioridad = JSON.parse(window.localStorage.getItem("insertarActividad"))
      this.planillas = []
      planillasPrioridad.map((item)=> {
        if(item.priority === prioridad.idNombre){
          item.fincaNombre = prioridad.descripcion
          this.planillas.push(item)
        }
      });
      /*this.planillas.map((item)=>{
        if(item.n_planilla_id !== parseInt(window.localStorage.getItem('buscarPlanilla'))){
          this.planillas = [];
        }
      });*/
    } 

/*
    if(JSON.parse(window.localStorage.getItem("planillas")) === null){
      this.toastConfirmacion('No tiene planillas registradas. Por favor descargue los datos.', 'warning');
    }else{
      this.planillasLS =  JSON.parse(window.localStorage.getItem("planillas"));
      this.planillas = [];
      this.planillasLS.map((item)=>{
        if(item.nSpreadsheet.nSpreadsheetId === parseInt(window.localStorage.getItem('buscarPlanilla'))){
          this.planillas.push(item)
        }        
      });      
      this.cargarPlanillasLS();
    }    */
  }

  doRefresh(event) {    
    //window.localStorage.removeItem("buscarPlanilla")
    this.cargarPlanillasLS();
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

  cargarPlanillasLS(){
    if(this.planillas !== null){
      this.planillas.map(item =>{
        let fincas = JSON.parse(window.localStorage.getItem('fincas'));
        for(let f of fincas){
          if(item.codeLand === f.codigo){
            item.fincaNombre = f.nombre;
          }
        }
        let siembras =  JSON.parse(window.localStorage.getItem('siembras'));
        for(let s of siembras){
          if(parseInt(item.lote+"") === parseInt(s.plano_id)){
            let split = item.filingDate.toString().split('T')
            item.fechaString = split[0]
            item.lote = s.lote + " - Surco: " + s.surco
          }
        }

        let productos =  JSON.parse(window.localStorage.getItem('productos'));
        for(let s of productos){
          if(item.producto === s.codigo){                        
            item.producto = s.nombre + " - Variedad: " + s.variedad
          }
        } 

        let split = item.filingDate.toString().split('T')
        item.fechaAplicacionString = split[0]

      })    
    }else{
      this.toastConfirmacion("No hay planillas registradas", "warning");
    }
  }

  registrar(){
    this.router.navigateByUrl('/aplicacion/a');
  }

  async toastConfirmacion(mensaje, colorT) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: colorT,
      duration: 2000
    });
    toast.present();
  }

  editar(id){
    console.log("____ id planilla " + id)
    this.router.navigateByUrl('/aplicacion/'+id);
  }

  volver(){
    this.router.navigateByUrl('/nivel');
  }

}
