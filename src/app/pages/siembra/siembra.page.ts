import { SiembraService } from './../../services/siembra.service';
import { Siembra } from './../../model/siembra';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Finca } from 'src/app/model/finca';
import { LoadingController } from '@ionic/angular';
import { FincaService } from 'src/app/services/finca.service';
import { Router } from '@angular/router';
import { Producto } from 'src/app/model/producto';

@Component({
  selector: 'app-siembra',
  templateUrl: './siembra.page.html',
  styleUrls: ['./siembra.page.scss']
})
export class SiembraPage implements OnInit{

  //Primer formulario
  finca: number;
  lote: String = '';
  nombreFinca: String;

  //Segundo Formulario
  surco: number;
  producto: String;
  variedad: String;
  cant_plantas: number;
  anio: number;
  semana: number;
  dia: number;

  listaFincas: Finca[];
  productos: Producto[];

  //Control para los formularios
  estadoFormulario2: boolean = false;
  estadoFincaAsignada: boolean = false;
  //Variable para los metodos de refresh
  duracionRefresh: number = 2000;

  constructor(private toastController: ToastController, private siembraService: SiembraService, private loadingController: LoadingController, private fincaService: FincaService, private router: Router) {
  }

  ngOnInit() {
    console.log('entro ng')
    this.cargarFincas();
  }  

  ionViewDidEnter(){
    console.log('entro ion')
    this.cargarFincas();
  }

  cargarDatos(){
    if(JSON.parse(window.localStorage.getItem("buscarSiembraFinca")) !== null){      
      if(this.listaFincas.length > 0){
        for(let i = 0; i<this.listaFincas.length; i++){
          if(this.listaFincas[i].finca_id === JSON.parse(window.localStorage.getItem("buscarSiembraFinca"))){               
            this.finca = this.listaFincas[i].finca_id;            
            this.nombreFinca = this.listaFincas[i].nombre;                      
          }
        }
      }
    }else{
      this.router.navigateByUrl('/verFinca');
    }    
  }

  siguiente1(form){
    this.finca = form.value.finca;
    this.lote = form.value.lote;
    this.estadoFormulario2 = true;
  }

  anterior(){
    this.estadoFormulario2 = false;
  }

  registrar(form){  
    let siembra = new Siembra();    
    for(let p of this.productos){
      console.log(' ' + JSON.stringify(p));
      if(p.producto_id === Number.parseInt(form.value.producto)){        
        this.variedad = p.variedad;
        this.producto = p.nombre;
      }
    }        
    siembra = {
      plano_id: 0,
      plantas: form.value.cant_plantas,
      surco: form.value.surco,
      variedad: this.variedad,
      producto: this.producto,
      anio: form.value.anio,
      dia: form.value.dia,
      semana: form.value.semana,
      finca_id: JSON.parse(window.localStorage.getItem("buscarSiembraFinca")),
      lote: this.lote
    }       
    try{
      this.siembraService.postSiembra(siembra).subscribe((data) =>{
        this.toastConfirmacion("Siembra registrada correctamente", "success");
        this.formatearValores()
      }, err => {
        this.toastConfirmacion("Error, ya se encuentra registrado.", "danger");        
      });
    }catch(exception){
      this.toastConfirmacion("Ha ocurrido un error en el servidor.", "danger");
    }
  }

  async toastConfirmacion(mensaje, colorT) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: colorT,
      duration: 2000
    });
    toast.present();
  }

  cargarFincas(){
    if(JSON.parse(window.localStorage.getItem("fincas")) === null || JSON.parse(window.localStorage.getItem("fincas")).length === 0){
      this.toastConfirmacion('No tiene fincas registradas.', 'warning');
    }else{
      this.listaFincas =  JSON.parse(window.localStorage.getItem("fincas"));      
      this.cargarDatos();
    }      
    if(JSON.parse(window.localStorage.getItem("productos")) === null || JSON.parse(window.localStorage.getItem("productos")).length === 0){
      this.toastConfirmacion('No tiene productos registrados.', 'warning');
    }else{
      this.productos =  JSON.parse(window.localStorage.getItem("productos"));            
    }      
  }

  formatearValores(){
    this.finca = null;
    this.lote = null;
    this.semana = null;
    this.surco = null;
    this.variedad = null;
    this.anio = null;
    this.cant_plantas = null;
    this.dia = null;
    this.estadoFormulario2 = false;
  }

  // Función para refrescar la página
  doRefresh(event) {    
    this.cargarFincas();
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
