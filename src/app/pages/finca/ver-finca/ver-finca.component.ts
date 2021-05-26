import { FincaService } from './../../../services/finca.service';
import { Component, OnInit } from '@angular/core';
import { Finca } from 'src/app/model/finca';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router, PreloadAllModules } from '@angular/router';

@Component({
  selector: 'app-ver-finca',
  templateUrl: './ver-finca.component.html',
  styleUrls: ['./ver-finca.component.scss'],
})
export class VerFincaComponent implements OnInit {

  fincas: Finca[];
  duracionRefresh: number = 2000;

  constructor(private fincaService: FincaService, private toastController: ToastController, private loadingController: LoadingController, private router: Router) { 
  }

  ngOnInit() {
    this.cargarFincasLS();
    window.localStorage.removeItem("buscarSiembraFinca")
  }
  
  cargarFincasLS(){
    if(JSON.parse(window.localStorage.getItem("fincas")) === null || JSON.parse(window.localStorage.getItem("fincas")).length === 0){
      this.toastConfirmacion('No tiene fincas registradas. Por favor actualice la pagina.', 'warning');
    }else{
      this.fincas =  JSON.parse(window.localStorage.getItem("fincas"));
    }
    
  }

  cargarFincasBD(){
    this.fincaService.getAllUser(1).subscribe((data)=>{
      if(data.length > 0){
        this.fincas = data;      
        window.localStorage.setItem( "fincas", JSON.stringify(data));
      }else{
        this.toastConfirmacion('No tiene fincas registradas.', 'warning') 
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

  doRefresh(event) {    
    window.localStorage.removeItem("buscarSiembraFinca")
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

  verSiembras(id){
    window.localStorage.setItem( "buscarSiembraFinca", JSON.stringify(id));
    this.router.navigateByUrl('/verSiembra');
  }
}
