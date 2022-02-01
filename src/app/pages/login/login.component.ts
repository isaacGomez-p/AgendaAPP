import { AppComponent } from './../../app.component';
import { RegistroComponent } from './../registro/registro.component';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AgricultorService } from 'src/app/services/agricultor.service';
import { UserEntity } from 'src/app/model/userEntity';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  cedula: number;
  clave: string;

  constructor(private toastController: ToastController, private modalController: ModalController, private router: Router, private agricultorService: AgricultorService, private appComponent: AppComponent) { }

  ngOnInit() {}

  login(form){
    if(form.value.clave === 0 && form.value.user ===''){
      this.toastConfirmacion('Ingrese las credenciales.', 'danger');
    }else{
      let user = new UserEntity();
      user.document = form.value.user+"";
      user.password = form.value.clave;
      this.agricultorService.login(user).subscribe((data)=>{
        console.log("data-> " +JSON.stringify(data) +  " - " + data.status);
        if(data.status == 200){
          this.cedula = null;
          this.clave = null;
          this.router.navigateByUrl('/home');
          this.appComponent.loginEstado = true;
          window.localStorage.setItem("agricultor", JSON.stringify(data.result));          
          this.toastConfirmacion('Bienvenido ' + data.result.firstName + " " + data.result.lastName, 'success');
        }else{          
          this.toastConfirmacion('Datos incorrectos.', 'danger');
        }
      }, err => {
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
