import { AppComponent } from './../../app.component';
import { RegistroComponent } from './../registro/registro.component';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AgricultorService } from 'src/app/services/agricultor.service';
import { UserEntity } from 'src/app/model/userEntity';
import { ApiResponse } from 'src/app/model/apiResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  response : ApiResponse;
  labelReponse : any;
  cedula: number;
  clave: string;

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
        this.response = await this.agricultorService.login(user)
        if(this.response.status == 200){
          this.cedula = null;
          this.clave = null;        
          this.appComponent.loginEstado = true;
          //productorService
          this.labelReponse = (await this.agricultorService.getLabels()).result;
          window.localStorage.setItem("agricultor", JSON.stringify(this.response.result));       
          window.localStorage.setItem("labels", JSON.stringify(this.labelReponse));
          this.toastConfirmacion('Bienvenido ' + this.response.result.firstName + " " + this.response.result.lastName, 'success');
  
          let niveles = [
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
          ]  
          window.localStorage.setItem("labels", JSON.stringify(niveles)); 
  
          this.router.navigateByUrl('/nivel');
        }else{          
          this.toastConfirmacion('Datos incorrectos.', 'warning');
        }
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
          
          
          //console.log("asdddddddddddd"+ data[0].Nombre_Conductor);
          
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
