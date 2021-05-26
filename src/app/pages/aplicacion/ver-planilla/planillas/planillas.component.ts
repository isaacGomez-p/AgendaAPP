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

  ngOnInit() {
    this.cargarPlanillasLS();
  }

  cargarPlanillasLS(){
    if(JSON.parse(window.localStorage.getItem("planillas")) === null || JSON.parse(window.localStorage.getItem("planillas")).length === 0){
      this.toastConfirmacion('No tiene planillas registradas. Por favor actualice la pagina.', 'warning');
    }else{
      this.planillas =  JSON.parse(window.localStorage.getItem("planillas"));
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
    this.planillaService.getPlanillas(Number.parseInt(localStorage.getItem('buscarPlanilla'))).subscribe((data) => {
      if(data !== null){
        if(data.length > 0){           
          let fincas = JSON.parse(window.localStorage.getItem('fincas'));
          for(let item of data){                        
            for(let f of fincas){              
              if(f.finca_id === item.finca_id){                
                item.fincaNombre = f.nombre;
              }
            }            
          }
          this.planillas = data;
          window.localStorage.setItem("planillas", JSON.stringify(data));
        }else{
          this.toastConfirmacion("No se encontraron planillas de aplicación registradas", "warning");
        }
      }
    })
  }

  registrar(){
    this.router.navigateByUrl('/aplicacion');
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
