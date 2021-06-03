import { NumeroPlanilla } from './model/numeroPlanilla';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FincaComponent } from './pages/finca/finca.component';
import { ToastController } from '@ionic/angular';
import { LoginComponent } from '../app/pages/login/login.component';
import { PlanillaService } from './services/planilla.service';
import { Agricultor } from './model/agricultor';
import { FincaService } from './services/finca.service';
import { Finca } from './model/finca';
import { ProductoService } from './services/producto.service';
import { Producto } from './model/producto';
import { Planilla } from './model/planilla';
import { Siembra } from './model/siembra';
import { SiembraService } from './services/siembra.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  
  usuario : string = "";

  agricultor: Agricultor[];
  fincas: Finca[];
  numeroPlanillas: NumeroPlanilla[];
  productos: Producto[];
  planilla: Planilla[];
  siembras: Siembra[];
  tituloFinca: String = '';

  loginEstado: boolean = false;  

  constructor(private siembraService: SiembraService, private serviceProducto: ProductoService, private fincaService: FincaService, private planillaService: PlanillaService, private alertController: AlertController, private actionSheetCtrl: ActionSheetController, private router: Router, private finca: FincaComponent, private toastController: ToastController) {}

  ngOnInit() {  
    
  }

  async configuracion() {
    const alert = await this.actionSheetCtrl.create({
      header: 'Configuración',
      buttons: [
        {
          text: 'Inicio',
          role: 'selected',
          icon: 'home-outline',
          handler: () => {            
            this.router.navigateByUrl('/home');
          }
        },
        {
          text: 'Sincronizar',
          role: 'selected',          
          icon: 'cloud-upload-outline',
          handler: () => {            
            this.presentAlertConfirmSincronizar()            
          }
        },
        {
          text: 'Descargar',
          role: 'selected',          
          icon: 'cloud-download-outline',
          handler: () => {            
            this.presentAlertConfirmDescargar();
          }
        },
        {
          text: 'Cerrar sesión',
          role: 'selected',          
          icon: 'power-outline',
          handler: () => {                                    
            this.loginEstado = false;
            this.router.navigateByUrl('/login');
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertConfirmDescargar() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje de confirmación',
      message: '<strong>¿Desea descargar todos los datos?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.descargarDatos()
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirmSincronizar() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje de confirmación',
      message: '<strong>¿Desea sincronizar todos los datos?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.sincronizar();
          }
        }
      ]
    });

    await alert.present();
  }

  sincronizar(){
    this.fincas = JSON.parse(window.localStorage.getItem('fincas'));
    
    if(this.fincas.length > 0){
      this.fincas.map((item)=>{
        if(item.finca_id <= 0 ){
          this.fincaService.postFinca(item).subscribe(()=>{
            
          });
        }else{
          if(item.edicion === true){
            this.fincaService.putFinca(item, item.finca_id).subscribe(()=>{

            })
          }
        }
        
      })
    }

    this.numeroPlanillas = JSON.parse(window.localStorage.getItem('numeroPlanillas'));
    if(this.numeroPlanillas.length > 0){
      this.numeroPlanillas.map((item)=>{
        if(item.n_planilla_id <= 0){
          this.planillaService.postNumeroPlanilla(item).subscribe(()=>{

          })
        }
      })
    }

    this.productos = JSON.parse(window.localStorage.getItem('productos'));
    if(this.productos.length > 0){
      this.productos.map((item)=>{
        if(item.producto_id <= 0){
          this.serviceProducto.postProducto(item).subscribe(()=>{

          });
        } else{
          if(item.edicion === true){
            this.serviceProducto.putProducto(item, item.producto_id).subscribe(()=>{
              
            })
          }
        }
      });
    }

    this.siembras = JSON.parse(window.localStorage.getItem("siembras"));
    if(this.siembras.length > 0){
      this.siembras.map((item) => {
        if(item.plano_id <= 0){
          this.siembraService.postSiembra(item).subscribe(()=>{

          })
        }
      })
    }
  }

  descargarDatos(){  
    let cont : number = 0;  
    this.agricultor = JSON.parse(window.localStorage.getItem('agricultor'))

    this.planillaService.getNumerosPlanillas(this.agricultor[0].agricultor_id).subscribe((data) => {
      window.localStorage.setItem("numeroPlanillas", JSON.stringify(data));        
    }, err => {
      this.toastConfirmacion("Error en cargar todas las planillas.", "danger");
    })

    this.fincaService.getAllUser(this.agricultor[0].agricultor_id).subscribe((data) => {
      window.localStorage.setItem("fincas", JSON.stringify(data));  
    }, err => {
      this.toastConfirmacion("Error en cargar fincas.", "danger");
    })

    this.serviceProducto.getAll(0).subscribe((data) => {
      this.productos = data;
      window.localStorage.setItem('productos', JSON.stringify(data));
    }, err => {
      this.toastConfirmacion("Error en cargar productos.", "danger");
    })    

    this.planillaService.getPlanillas(this.agricultor[0].agricultor_id).subscribe((data) => {
      this.planilla = data;
      window.localStorage.setItem('planillas', JSON.stringify(data));
    }, err => {
      this.toastConfirmacion("Error al cargar planilla.", "danger");
    })

    this.siembras = [];
    window.localStorage.setItem('siembras', JSON.stringify(this.siembras));
    /*this.planillaService.getPlanillas(this.agricultor[0].agricultor_id).subscribe((data) => {
      this.planilla = data;
      window.localStorage.setItem('planillas', JSON.stringify(data));
    }, err => {
      this.toastConfirmacion("Error al cargar planilla.", "danger");
    })*/
  }

  async menuFinca() {
    const alert = await this.actionSheetCtrl.create({
      header: 'Finca',
      buttons: [
        {
          text: 'Agregar una finca',
          role: 'selected',
          icon: 'add-outline',
          handler: () => {
            this.tituloFinca = "Agregar una finca";
            //this.finca.setTitulo("Agregar una finca")            
            this.router.navigateByUrl('/finca/Agregar una finca/0');
          }
        },
        {
          text: 'Ver todas las fincas',
          role: 'selected',
          icon: 'layers-outline',
          handler: () => {                        
            this.router.navigateByUrl('/verFinca');
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await alert.present();
  }
 
  async menuSiembra() {
    const alert = await this.actionSheetCtrl.create({
      header: 'Siembra',
      buttons: [
        {
          text: 'Agregar siembra',
          role: 'selected',
          icon: 'add-outline',
          handler: () => {
            window.localStorage.removeItem("buscarSiembraFinca")
            this.router.navigateByUrl('/siembra');
          }
        },        
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await alert.present();
  }

  
  async menuPlanilla() {    
    const alert = await this.actionSheetCtrl.create({
      header: 'Aplicación',
      buttons: [
        {
          text: 'Ver planilla',
          role: 'selected',
          icon: 'layers-outline',
          handler: () => {
            this.router.navigateByUrl('/verPlanilla');
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await alert.present();
  }

  async menuProductos(){
    const alert = await this.actionSheetCtrl.create({
      header: 'Productos',
      buttons: [
        {
          text: 'Ver productos',
          role: 'selected',
          icon: 'layers-outline',
          handler: () => {
            this.router.navigateByUrl('/producto');
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await alert.present();    
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