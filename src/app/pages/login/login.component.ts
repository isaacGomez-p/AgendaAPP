import { AppComponent } from './../../app.component';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AgricultorService } from 'src/app/services/agricultor.service';
import { UserEntity } from 'src/app/model/userEntity';
import { LevelEntity } from 'src/app/model/levelEntity';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  labelReponse : any;
  cedula: number;
  clave: string;
  levels: LevelEntity[];
  user: UserEntity;

  constructor(private toastController: ToastController, private modalController: ModalController, private router: Router, private agricultorService: AgricultorService, private appComponent: AppComponent) { }

  ngOnInit() {}

  /*login(form){
    console.log("hihih");
  }*/

  async login(form){
    if(form.value.clave === 0 && form.value.user ===''){
      this.toastConfirmacion('Ingrese las credenciales.', 'danger');
    }else{
      let user = new UserEntity();
      user.document = form.value.user+"";
      user.password = form.value.clave;
      try {
        /*this.response = await this.agricultorService.login(user)
        if(this.response.status == 200){*/
        this.agricultorService.login(user).subscribe((data)=>{
          if(data.status == 200){
            this.cedula = null;
            this.clave = null;        
            this.appComponent.loginEstado = true;

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
            window.localStorage.setItem("SP_UEN", JSON.stringify(this.user.sp_uen_list === undefined || this.user.sp_uen_list === null ? [] : this.user.sp_uen_list)) 
            
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
            this.levels = this.user.levels;
            window.localStorage.setItem("labels", JSON.stringify(this.levels)); 
            this.toastConfirmacion('Bienvenido'+ this.user.firstName + " " + this.user.lastName, 'success');

            this.router.navigateByUrl('/nivel');
          }else{          
          this.toastConfirmacion('Datos incorrectos.', 'warning');
        }
      })
      } catch (e){
        this.toastConfirmacion('Error con el servidor', 'danger')
      }          
      
      
      /*}, err => {
        this.toastConfirmacion('Error con el servidor.', 'danger');
      });
       /*this.proveedorDatos.getLogin(form.value.password, form.value.user).subscribe((data)=>{
        
        if(data.length > 0)  {         
          //this.limpiar_JSON_enLocalStorage(form.value.user);
          window.localStorage.setItem("cedula", form.value.user);
          window.localStorage.setItem( "session", 'true');
          window.localStorage.setItem( "usuario", data[0].Nombre_Conductor); 
          //this.nombreUsuario = data[0].Nombre_Conductor; 
          //this.nombreUsuario = "Bienvenido";          
          form.value.user = '';
          form.value.password = 0;
          this.usuario = '';
          this.clave = '';         
          this.router.navigateByUrl('/home');         
        }else{
          this.toastConfirmacion('Datos incorrectos.', 'danger');
        }       
      }, (error) =>{
        this.toastConfirmacion("Ha ocurrido un error.", "danger");
      })*/
    }
  }

  registrar(){
    this.router.navigateByUrl('/registrar/registrar');
  }

  qrcode() {
    this.router.navigateByUrl('/qrcode');
  }

  /*async registrar() {
    const modal = await this.modalController.create({
      component: RegistroComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }]*/

  async toastConfirmacion(mensaje, colorT) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: colorT,
      duration: 2000
    });
    toast.present();
  }

}
