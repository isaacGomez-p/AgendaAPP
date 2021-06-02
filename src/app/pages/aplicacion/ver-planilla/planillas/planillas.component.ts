import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Finca } from 'src/app/model/finca';
import { Planilla } from 'src/app/model/planilla';
import { FincaService } from 'src/app/services/finca.service';
import { PlanillaService } from 'src/app/services/planilla.service';

@Component({
  selector: 'app-planillas',
  templateUrl: './planillas.component.html',
  styleUrls: ['./planillas.component.scss'],
})
export class PlanillasComponent implements OnInit {

  planillas: Planilla[];

  duracionRefresh: number = 2000;

  constructor(private loadingController: LoadingController, private router: Router, private planillaService: PlanillaService, private toastController: ToastController, private fincaService: FincaService) { }

  ionViewDidEnter(){
    this.cargarPlanillasLS();
  }

  ngOnInit() {
    this.cargarPlanillasLS();
  }

  cargarPlanillasLS(){
    if(JSON.parse(window.localStorage.getItem("planillas")) === null){
      this.toastConfirmacion('No tiene planillas registradas. Por favor actualice la pagina.', 'warning');
    }else{
      this.planillas =  JSON.parse(window.localStorage.getItem("planillas"));
      this.planillas.map((item)=>{
        if(item.n_planilla !== parseInt(window.localStorage.getItem('buscarPlanilla'))){
          this.planillas = [];
        }
      });
      this.cargarPlanillasBD();
    }    
    
  }

  doRefresh(event) {    
    //window.localStorage.removeItem("buscarPlanilla")
    this.cargarPlanillasBD();
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

  cargarPlanillasBD(){
    if(this.planillas !== null){
      this.planillas.map(item =>{
        let fincas = JSON.parse(window.localStorage.getItem('fincas'));
        for(let f of fincas){
          if(item.finca_id === f.finca_id){
            item.fincaNombre = f.nombre;
          }
        }      
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
