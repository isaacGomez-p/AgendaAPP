import { NumeroPlanilla } from './model/numeroPlanilla';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FincaComponent } from './pages/finca/finca.component';
import { ToastController } from '@ionic/angular';
import { LoginComponent } from '../app/pages/login/login.component';
import { PlanillaService } from './services/planilla.service';
import { UserEntity } from './model/userEntity';
import { FincaService } from './services/finca.service';
import { LandEntity } from './model/finca';
import { ProductoService } from './services/producto.service';
import { ProductEntity } from './model/producto';
import { Planilla } from './model/planilla';
import { Siembra } from './model/siembra';
import { SiembraService } from './services/siembra.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FcmService } from './services/fcm.service';
import { AgricultorService } from './services/agricultor.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  usuario: string = "";

  agricultor: UserEntity;
  fincas: LandEntity[];
  numeroPlanillas: NumeroPlanilla[];
  productos: ProductEntity[];
  planillas: Planilla[];
  siembras: Siembra[];
  tituloFinca: String = '';

  loginEstado: boolean = false;

  constructor(
    private siembraService: SiembraService, 
    private serviceProducto: ProductoService, 
    private fincaService: FincaService, 
    private planillaService: PlanillaService, 
    private alertController: AlertController, 
    private actionSheetCtrl: ActionSheetController, 
    private router: Router, 
    private finca: FincaComponent, 
    private toastController: ToastController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcmService: FcmService,
    private userService: AgricultorService) { 
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
 
      // Trigger the push setup 
      this.fcmService.initPush();
    });
  }

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
        }/*,
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
        }*/,
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

  sincronizar() {
    //carga los datos del agricultor
    this.agricultor = JSON.parse(window.localStorage.getItem('agricultor'));

    this.fincas = JSON.parse(window.localStorage.getItem('fincas'));

    if (this.fincas.length > 0) {
      this.fincas.map((item) => {
        if (item.landId <= 0) {
          if (item.agregar === false) {
            this.fincaService.postFinca(item).subscribe(() => {
              item.agregar = true;
            });
          }
        } else {
          if (item.edicion === true) {
            this.fincaService.putFinca(item, item.landId).subscribe(() => {

            })
          }
        }

      })
    }
    window.localStorage.setItem("fincas", JSON.stringify(this.fincas));

    /*this.numeroPlanillas = JSON.parse(window.localStorage.getItem('numeroPlanillas'));
    if (this.numeroPlanillas.length > 0) {
      this.numeroPlanillas.map((item) => {
        if (item.n_planilla_id <= 0) {
          if (item.agregar === false) {
            this.planillaService.postNumeroPlanilla(item).subscribe(() => {
              item.agregar = true;
            })
          }
        }
      })
    }
    window.localStorage.setItem("numeroPlanillas", JSON.stringify(this.numeroPlanillas));
    */

    //productos
    /*this.productos = JSON.parse(window.localStorage.getItem('productos'));
    if (this.productos.length > 0) {
      this.productos.map((item) => {
        if (item.product_id <= 0) {
          if (item.agregar === false) {
            this.serviceProducto.postProducto(item).subscribe(() => {
              item.agregar = true;
            });
          }
        } else {
          if (item.edicion === true) {
            this.serviceProducto.putProducto(item, item.product_id).subscribe(() => {

            })
          }
        }
      });
    }
    window.localStorage.setItem('productos', JSON.stringify(this.productos));*/
  

    //siembra
    /*this.siembras = JSON.parse(window.localStorage.getItem("siembras"));
    if (this.siembras !== null) {
      if (this.siembras.length > 0) {
        this.siembras.map((item) => {
          if (item.id <= 0) {
            if (item.agregar === false) {
              this.siembraService.postSiembra(item).subscribe(siembras_ => {
                item.agregar = true;                
                if(siembras_){
                  this.planilla = JSON.parse(window.localStorage.getItem("planillas"));
                  if (this.planilla.length > 0) {
                    this.planilla.map((item) => {
                      if (item.spreadsheetId <= 0) {
                        console.log("  " + JSON.stringify(item))
                        this.planillaService.postPlanillaAplicacion(item).subscribe(() => {
                          item.agregar = true;
                      })
                    }
                  })
                }
                window.localStorage.setItem('planillas', JSON.stringify(this.planilla));
                }
              })
            }
          }
        })
      }
    }
    window.localStorage.setItem('siembras', JSON.stringify(this.siembras));*/
    if (JSON.parse(window.localStorage.getItem("planillasActividad")) === null) {
      this.toastConfirmacion('No tiene planillas para sincronizar.', 'warning');
    } else {
      this.planillas = JSON.parse(window.localStorage.getItem("planillasActividad"));
      this.planillas.map(planilla => {
        if(planilla.agregar){

        }
      })
    }

    
  }

  async descargarDatos() {
    let cont: number = 0;
    console.log("______ descargar datos")
    this.agricultor = JSON.parse(window.localStorage.getItem('agricultor'))
    //this.agricultor = (await this.userService.getUserById(this.agricultor.id)).result;
    window.localStorage.setItem('agricultor', JSON.stringify(this.agricultor));
    //carga los productos del LS
    window.localStorage.setItem('productos', JSON.stringify([])); 
    console.log("______ 1")
    /*this.userService.getUserById(this.agricultor.id).subscribe(data => {
      this.agricultor = data.result;
      window.localStorage.setItem('agricultor', JSON.stringify(this.agricultor));
      console.log(".... " + JSON.stringify(this.agricultor))
      console.log(".... " + JSON.stringify(this.agricultor.products))
      //carga los productos del LS
      window.localStorage.setItem('productos', JSON.stringify(this.agricultor.products)); 
    });*/
//  if(this.agricultor.products != null){}

    

    this.planillaService.getNumerosPlanillas(this.agricultor.id).subscribe((data) => {
      window.localStorage.setItem("numeroPlanillas", JSON.stringify(data));
    }, err => {
      window.localStorage.setItem("numeroPlanillas", JSON.stringify([]));
      this.toastConfirmacion("Error en cargar todas las planillas.", "danger");
    })
    
    this.fincaService.getAllLands(this.agricultor.id).subscribe((data) => {
      console.log(" -------- finca : " + JSON.stringify(data));
      window.localStorage.setItem("fincas", JSON.stringify(data.result));
    }, err => {
      window.localStorage.setItem("fincas", JSON.stringify([]));
      this.toastConfirmacion("Error en cargar fincas.", "danger");
    })

    /*this.serviceProducto.getAll(0).subscribe((data) => {
      this.productos = data;
      window.localStorage.setItem('productos', JSON.stringify(data));
    }, err => {
      window.localStorage.setItem('productos', JSON.stringify([]));
      this.toastConfirmacion("Error en cargar productos.", "danger");
    })*/

    this.planillaService.getPlanillas(this.agricultor.id).subscribe((data) => {
      this.planillas = data;
      window.localStorage.setItem('planillas', JSON.stringify(data));
    }, err => {
      window.localStorage.setItem('planillas', JSON.stringify([]));
      this.toastConfirmacion("Error al cargar planilla.", "danger");
    })

    this.siembraService.getSiembrasFinca(this.agricultor.id).subscribe((data) => {
      window.localStorage.setItem('siembras', JSON.stringify(data));
    }, err => {
      window.localStorage.setItem('siembras', JSON.stringify([]));
      this.toastConfirmacion("Error al cargar siembras.", "danger");
    })
    
  }

  async menuFinca() {
    const alert = await this.actionSheetCtrl.create({
      header: 'Niveles',
      buttons: [
        {
          text: 'Administrar',
          role: 'selected',
          icon: 'layers-outline', //add-outline
          handler: () => {
            this.router.navigateByUrl('/nivel');
          }
        }/*,
        {
          text: 'Ver todas las fincas',
          role: 'selected',
          icon: 'layers-outline',
          handler: () => {
            this.router.navigateByUrl('/verFinca');
          }
        }*/,
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

  async menuProductos() {
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