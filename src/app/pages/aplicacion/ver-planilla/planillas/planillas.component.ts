import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Finca } from 'src/app/model/finca';
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
    if(JSON.parse(window.localStorage.getItem("planillas")) === null){
      this.toastConfirmacion('No tiene planillas registradas. Por favor descargue los datos.', 'warning');
    }else{
      this.planillasLS =  JSON.parse(window.localStorage.getItem("planillas"));
      this.planillas = [];
      this.planillasLS.map((item)=>{
        if(item.n_planilla === parseInt(window.localStorage.getItem('buscarPlanilla'))){
          this.planillas.push(item)
        }        
      });      
      this.cargarPlanillasLS();
    }    
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
          if(item.codigo_finca === f.codigo){
            item.fincaNombre = f.nombre;
          }
        }
        let siembras =  JSON.parse(window.localStorage.getItem('siembras'));
        for(let s of siembras){
          if(parseInt(item.lote+"") === parseInt(s.plano_id)){
            let split = item.fecha_formulacion.toString().split('T')
            item.fechaString = split[0]
            item.lote = s.lote + " - Surco: " + s.surco
          }
        }

        let productos =  JSON.parse(window.localStorage.getItem('productos'));
        for(let s of productos){
          if(parseInt(item.producto+"") === parseInt(s.producto_id+"")){                        
            item.producto = s.nombre + " - Variedad: " + s.variedad
          }
        } 

        let split = item.fecha_aplicacion.toString().split('T')
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

}
