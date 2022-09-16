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
import { LevelEntity } from './model/levelEntity';
import { SP_UEN } from './model/SP_UEN';

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
  levels: LevelEntity[];
  user: UserEntity;
  SP_UEN : SP_UEN[];


  loginEstado: boolean = false;

  constructor(
    private planillaService: PlanillaService, 
    private alertController: AlertController, 
    private actionSheetCtrl: ActionSheetController, 
    private router: Router,
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

  sincronizar() {
    console.log("ENTRA A SINCRONIZAR");
    
    //carga los datos del agricultor
    this.agricultor = JSON.parse(window.localStorage.getItem('agricultor'));

    /*this.fincas = JSON.parse(window.localStorage.getItem('fincas'));

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
    window.localStorage.setItem("fincas", JSON.stringify(this.fincas));*/

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
      let success, error = 0;
      console.log("1----");
      
      this.planillas = JSON.parse(window.localStorage.getItem("planillasActividad"));
      this.planillas.map(planilla => {
        planilla.user = this.agricultor;        
        console.log("2----" + JSON.stringify(planilla));
        if(!planilla.agregar){
          console.log("3----");
          this.planillaService.postPlanilla(planilla).subscribe(response =>{
            if(response.status == 200){
              console.log("Succesfully sync"+ ++success);
              
            }else{
              console.log("Sync failed"+ ++error);
              
            }
          });
        }
      })
    }

    if (JSON.parse(window.localStorage.getItem("SP_UEN")) === null) {
      this.toastConfirmacion('No tiene niveles para sincronizar.', 'warning');
    } else {
      this.SP_UEN = JSON.parse(window.localStorage.getItem("SP_UEN"));
      this.SP_UEN.map(item => {
        if(!item.agregar){
          item.user = this.agricultor;
          this.userService.postSpUen(item).subscribe(response =>{
            if(response.status == 200){
              console.log("Succesfully sync");
            }else{
              console.log("Sync failed");
            }
          })
        }
      })
            
    }

    
  }

  async descargarDatos() {
    
    /*let cont: number = 0;
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

    
/*
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
/*
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
    })*/
    this.agricultor = JSON.parse(window.localStorage.getItem('agricultor'))
    this.userService.getUserById(this.agricultor.id).subscribe((data)=>{
      if(data.status == 200){      
        //this.appComponent.loginEstado = true;

        this.user = JSON.parse(JSON.stringify(data.result));
        /*this.labelReponse = [
          "Label 1",
          "LKabel 2",
          "Label 3"
        ]*/
        /*this.productos = this.user.products; /*[
          {
            name : 'Papa',
            agregar: true,
            code: '1234',
            edicion: false,
            product_id: 1,
            variety: 'Criolla',
            user: null
          },
          {
            name : 'Papa',
            agregar: true,
            code: '1232',
            edicion: false,
            product_id: 2,
            variety: 'De año',
            user: null
          },
          {
            name : 'Papa',
            agregar: true,
            code: '1233',
            edicion: false,
            product_id: 3,
            variety: 'Salada',
            user: null
          }
        ]*/

          // (await this.agricultorService.getLabels()).result;
        //user.city = "Bogota";
        //user.dept = "Bogota";
        //user.email = "email@email.com";
        //user.firstName = "Test";
        //user.id = 1;
        //user.status = 1;
        //user.products = this.productos;planillasActividad
        window.localStorage.setItem("planillasActividad", JSON.stringify(this.user.planillas));       
        window.localStorage.setItem("agricultor", JSON.stringify(this.user));       
        window.localStorage.setItem("labels", JSON.stringify(this.user.levels));
        window.localStorage.setItem("SP_UEN", JSON.stringify(this.user.sp_uen_list)) 

        //this.levels = this.user.levels;
        //window.localStorage.setItem("labels", JSON.stringify(this.levels));
        /*let niveles = [
          {
            prioridad: 0,
            descripcion: "Grupo Productor",
            plural: "Grupos Productores",
            disponiblePlanilla: false
          },
          {
            prioridad: 1,
            descripcion: "Predio",
            plural: "Predios",
            disponiblePlanilla: false
          },
          {
            prioridad: 2,
            descripcion: "Piscina",
            plural: "Piscinas",
            disponiblePlanilla: true
          }
        ]  */
        this.toastConfirmacion('Bienvenido'+ this.user.firstName + " " + this.user.lastName, 'success');

        this.router.navigateByUrl('/nivel');
      }else{          
      this.toastConfirmacion('Datos incorrectos.', 'warning');
    }
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