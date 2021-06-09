import { Planilla } from 'src/app/model/planilla';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ActionSheetController } from '@ionic/angular';
import { Siembra } from 'src/app/model/siembra';
import { SiembraService } from 'src/app/services/siembra.service';
import { PlanillaService } from 'src/app/services/planilla.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ver-siembra',
  templateUrl: './ver-siembra.component.html',
  styleUrls: ['./ver-siembra.component.scss'],
})
export class VerSiembraComponent implements OnInit {

  duracionRefresh: number = 2000;

  siembras: Siembra[];
  planillas: Planilla[];
  planillasEliminar: Planilla[];
  lista: Siembra[];
  siembrasLS: Siembra[];
  enableBackdropDismiss = false;
  showBackdrop = true;
  shouldPropagate = false;

  constructor(private planillaService: PlanillaService, private siembraService: SiembraService, private actionSheetCtrl: ActionSheetController, private serviceSiembra: SiembraService, private loadingController: LoadingController, public alertController: AlertController, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.cargarSiembrasLS();
  }

  ionViewDidEnter() {
    this.cargarSiembrasLS();
  }

  cargarSiembrasLS() {
    if (JSON.parse(window.localStorage.getItem("buscarSiembraFinca")) === null) {
      this.router.navigateByUrl('/verFinca');
    } else {
      this.siembrasLS = JSON.parse(window.localStorage.getItem("siembras"));
      if (this.siembrasLS !== null) {
        if (this.siembrasLS.length > 0) {
          this.siembras = [];
          this.siembrasLS.map((item) => {
            console.log("antes: " + item.finca_id);
            if (item.finca_id === parseInt(JSON.parse(window.localStorage.getItem("buscarSiembraFinca")))) {
              console.log("entro: " + item.finca_id);
              this.siembras.push(item);
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

  async masInfo(siembra) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Detalles',
      message: '<strong>Variedad: </strong> ' + siembra.variedad + '<br><strong>Plantas: </strong>' + siembra.plantas + '<br><strong>Año: </strong>' + siembra.anio + '<br><strong>Semana: </strong>' + siembra.semana + '<br><strong>Día: </strong>' + siembra.dia,
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

  async menuSiembras(siembra) {
    const alert = await this.actionSheetCtrl.create({
      header: 'Eventos',
      buttons: [
        {
          text: 'Detalles',
          role: 'selected',
          icon: 'add-outline',
          handler: () => {
            this.masInfo(siembra);
          }
        },
        {
          text: 'Editar',
          role: 'selected',
          icon: 'layers-outline',
          handler: () => {
            this.router.navigateByUrl('/siembra/Editar/' + siembra.plano_id);
          }
        },
        {
          text: 'Eliminar',
          role: 'selected',
          icon: 'layers-outline',
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
          if (item.plano_id !== siembra.plano_id) {
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
          this.planillaService.deletePlanillas(item.planilla_id).subscribe(() => {

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
