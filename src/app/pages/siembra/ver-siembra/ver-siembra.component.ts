import { Planilla } from 'src/app/model/planilla';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ActionSheetController } from '@ionic/angular';
import { Siembra } from 'src/app/model/siembra';
import { SiembraService } from 'src/app/services/siembra.service';
import { PlanillaService } from 'src/app/services/planilla.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductEntity } from 'src/app/model/producto';

@Component({
  selector: 'app-ver-siembra',
  templateUrl: './ver-siembra.component.html',
  styleUrls: ['./ver-siembra.component.scss'],
})
export class VerSiembraComponent implements OnInit {

  duracionRefresh: number = 2000;

  siembras: Siembra[];
  planillas: Planilla[];
  productos: ProductEntity[];
  planillasEliminar: Planilla[];
  lista: Siembra[];
  siembrasLS: Siembra[];
  enableBackdropDismiss = false;
  showBackdrop = true;
  shouldPropagate = false;

  constructor(private planillaService: PlanillaService, private siembraService: SiembraService, private actionSheetCtrl: ActionSheetController, private serviceSiembra: SiembraService, private loadingController: LoadingController, public alertController: AlertController, private router: Router, private toastController: ToastController) { }

  ngOnInit() {    
  }

  ionViewDidEnter() {
    this.cargarSiembrasLS();
  }

  cargarSiembrasLS() {
    if (JSON.parse(window.localStorage.getItem("buscarSiembraFinca")) === null) {
      this.router.navigateByUrl('/verFinca');
    } else {
      this.siembrasLS = JSON.parse(window.localStorage.getItem("siembras"));
      this.productos = JSON.parse(window.localStorage.getItem("productos"));
      if (this.siembrasLS !== null) {
        if (this.siembrasLS.length > 0) {
          this.siembras = [];
          this.siembrasLS.map((item) => {            
            if (item.land.landId === parseInt(JSON.parse(window.localStorage.getItem("buscarSiembraFinca")))) {
              this.siembras.push(item);
              /*this.productos.map((itemP)=>{
                if(itemP.code === item.product.code){
                  item.product = itemP;
                  this.siembras.push(item);
                }
              })*/          
            }
          });
          if (this.siembras.length <= 0) {
            this.toastConfirmacion("La finca seleccionada no tiene siembras registradas.", "warning")
          }
        } else {
          this.toastConfirmacion("No se encontraron siembras registradas.", "warning")
        }
      } else {
        this.toastConfirmacion("Por favor sincronice los datos.", "warning")
      }
    }
  }

  cargarSiembrasService(id: number) {
    this.serviceSiembra.getSiembrasFinca(id).subscribe((data) => {
      if (data.length > 0) {
        this.siembras = data;
        this.toastConfirmacion("Siembras registradas", "success")
      } else {
        this.siembras = [];
        this.toastConfirmacion("La finca seleccionada no tiene siembras registradas", "warning")
      }
    })
  }

  cargarSiembras() {
    if (JSON.parse(window.localStorage.getItem("buscarSiembraFinca")) === null) {
      this.router.navigateByUrl('/verFinca');
    } else {
      this.cargarSiembrasService(JSON.parse(window.localStorage.getItem("buscarSiembraFinca")));
    }
  }

  doRefresh(event) {
    this.cargarSiembrasLS();
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

  async masInfo(siembra: Siembra) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Detalles',
      message:  '<table align="left">  '+
                ' <caption> Detalles </caption>'+
                ' <tr> '+
                '   <th> '+
                '     Variedad:   '+
                '   </th> '+
                '   <td> '+ siembra.variedad +
                '   </td> '+
                ' </tr>  '+
                ' <tr> '+
                '   <th> '+
                '     Productos:    '+
                '   </th> '+
                '   <td> '+ siembra.product.name + " - " + siembra.product.variety +
                '   </td> '+
                ' </tr>  '+
                ' <tr> '+
                '   <th> '+
                '     Plantas:    '+
                '   </th> '+
                '   <td> '+ siembra.plants +
                '   </td> '+
                ' </tr>  '+
                ' <tr> '+
                '   <th> '+
                '     Año:    '+
                '   </th> '+
                '   <td> '+ siembra.year +
                '   </td> '+
                ' </tr>  '+
                ' <tr> '+
                '   <th> '+
                '     Semana:    '+
                '   </th> '+
                '   <td> '+ siembra.week +
                '   </td> '+
                ' </tr>  '+
                ' <tr> '+
                '   <th> '+
                '     Día:   '+
                '   </th> '+
                '   <td> '+ siembra.day +
                '   </td> '+
                ' </tr>  '+
                '</table>',                               
      buttons: [
        /*{
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },*/ {
          text: 'Cerrar',
          handler: () => {

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

  agregarSiembra() {
    this.router.navigateByUrl('/siembra/Agregar/A');
  }

  async menuSiembras(siembra: Siembra) {
    const alert = await this.actionSheetCtrl.create({
      header: 'Eventos',
      buttons: [
        {
          text: 'Detalles',
          role: 'selected',
          icon: 'information-circle-outline',
          handler: () => {
            this.masInfo(siembra);
          }
        },
        {
          text: 'Editar',
          role: 'selected',          
          icon: 'create-outline',
          handler: () => {
            this.router.navigateByUrl('/siembra/Editar/' + siembra.id);
          }
        },
        {
          text: 'Eliminar',
          role: 'selected',
          icon: 'trash-outline',
          handler: () => {
            this.eliminarAlert(siembra);
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

  async eliminarAlert(siembra) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta!',
      message: '¿Está seguro que desea <strong>eliminar</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.eliminar(siembra)
          }
        }
      ]
    });

    await alert.present();
  }

  eliminar(siembra) {
    if (siembra.plano_id <= 0) {
      this.planillas = JSON.parse(window.localStorage.getItem("planillas"));
      let validacion = false;
      this.planillasEliminar = []
      if (this.planillas.length > 0) {
        this.planillas.map((item) => {
          if (parseInt(item.lote + "") !== siembra.plano_id) {
            this.planillasEliminar.push(item)
          }
        })
        this.planillas = []
        this.planillas = this.planillasEliminar
        validacion = true;
      } else {
        validacion = true;
      }
      if (validacion === true) {
        this.lista = [];
        this.siembras.map((item) => {
          if (item.id !== siembra.plano_id) {
            this.lista.push(item)
          }
        })
        this.siembras = [];
        this.siembras = this.lista;

        this.toastConfirmacion("Siembra eliminada exitosamente.", "success")
        window.localStorage.setItem('siembras', JSON.stringify(this.siembras));
        window.localStorage.setItem('planillas', JSON.stringify(this.planillas));
      }

    } else {
      this.planillas = JSON.parse(window.localStorage.getItem("planillas"));
      this.planillas.map((item) => {
        if (parseInt(item.lote + "") === siembra.plano_id) {
          this.planillaService.deletePlanillas(item.spreadsheetId).subscribe(() => {

          }, error => {
            this.toastConfirmacion("Por favor asegurese que tiene conexión a internet.", "danger")
          })
        }
      })

      this.siembraService.deleteSiembra(siembra.plano_id).subscribe(() => {
        this.toastConfirmacion("Siembra eliminada exitosamente..", "success")
      }, error => {
        this.toastConfirmacion("Por favor asegurese que tiene conexión a internet.", "danger")
      })

    }
  }
}
