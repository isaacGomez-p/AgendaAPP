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
  fechaFiltro: Date;

  constructor(private loadingController: LoadingController, private router: Router, private planillaService: PlanillaService, private toastController: ToastController, private fincaService: FincaService) { }

  ionViewDidEnter(){
    this.inicioCargarPlanillasLS(null, false);
  }

  ngOnInit() {
    this.inicioCargarPlanillasLS(null, false);
  }

  inicioCargarPlanillasLS(date, estaFiltrando){    
    if(JSON.parse(window.localStorage.getItem("planillasActividad")) === undefined || JSON.parse(window.localStorage.getItem("planillasActividad")) === null || JSON.parse(window.localStorage.getItem("planillasActividad")).length === 0){
      this.toastConfirmacion('No tiene planillas registradas.', 'warning');
      this.planillas = []
      //this.planillas =  JSON.parse(window.localStorage.getItem("planillasActividad"));
    }else{                   
      let planillasPrioridad =  JSON.parse(window.localStorage.getItem("planillasActividad"));      
      let prioridad = JSON.parse(window.localStorage.getItem("insertarActividad"))
      this.planillas = []
      planillasPrioridad.map((item)=> {
        
        if(item.priority === prioridad.idNombre){
          item.fincaNombre = prioridad.descripcion
          if(item.colorQuality === null || item.colorQuality === undefined || item.colorQuality === ""){
            if(item.quality === 0 && item.quality < 2){
              item.colorQuality = "danger"
            }else{
              if(item.quality >= 2 && item.quality < 4){
                item.colorQuality = "warning"
              }else{
                if(item.quality >= 4 && item.quality < 5){
                  item.colorQuality = "primary"
                }
              }
            }
          }                    
          item.qualityRango = (item.quality*2)/10
          if(estaFiltrando){            
            //Variables para la fecha de la planilla
            let dia;
            let mes;
            let anio;
            var fecha = new Date(item.applicationDate);
            dia = fecha.getDate();
            mes = fecha.getMonth();
            anio= fecha.getFullYear();            
            if(date.dia === dia && date.mes === mes && date.anio === anio){              
              this.planillas.push(item)
            }
          }else{            
            this.planillas.push(item)
          }
          
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
    this.router.navigateByUrl('/aplicacion/'+id);
  }

  volver(){
    this.router.navigateByUrl('/nivel');
  }

  filtrarPorFecha(){    
    //Variables para la fecha que filtra
    let dia;
    let mes;
    let anio;
    var fecha = new Date(this.fechaFiltro);
    dia = fecha.getDate();
    mes = fecha.getMonth();
    anio= fecha.getFullYear();    
    let date = {
      dia: dia,
      mes: mes,
      anio: anio
    }
    this.inicioCargarPlanillasLS(date, true);
  }

}
