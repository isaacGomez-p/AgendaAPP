import { UserEntity } from '../../model/userEntity';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandEntity } from 'src/app/model/finca';
import { FincaService } from 'src/app/services/finca.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-finca',
  templateUrl: './finca.component.html',
  styleUrls: ['./finca.component.scss'],
})
export class FincaComponent implements OnInit {
  agricultor: UserEntity;
  titulo: String;

  nombreFinca: String;
  idFinca: number;
  idAgricultor: number;
  estado: number;

  firstLabel : String;
  labelList : any;

  fincas: LandEntity[];

  nombreBoton: String;

  constructor(private router: Router, private paramsUrl: ActivatedRoute, private fincaService: FincaService, private toastController: ToastController) {

  }

  ionViewDidEnter() { 
    this.labelList = JSON.parse(window.localStorage.getItem("labels"));
  }

  onChangeTime(event){
    console.log("on change"+ event)
    // this.labelList = 
  }

  onInputTime(input){
    console.log("input time"+ input)
  }
  
  ngOnInit() {
    this.cargarFincasLS();
    window.localStorage.removeItem("buscarSiembraFinca")
    this.titulo = this.paramsUrl.snapshot.paramMap.get('titulo')
    if (this.paramsUrl.snapshot.paramMap.get('idEditar') !== null && this.paramsUrl.snapshot.paramMap.get('idEditar') !== 'A') {
      this.llenarCampoEditar(parseInt(this.paramsUrl.snapshot.paramMap.get('idEditar')))
      this.nombreBoton = "Actualizar";
    } else {
      this.nombreBoton = "Agregar";
    }    
  }

  cargarFincasLS(){
    if(JSON.parse(window.localStorage.getItem("fincas")) === null || JSON.parse(window.localStorage.getItem("fincas")).length === 0){
      this.toastConfirmacion('No tiene fincas registradas. Por favor actualice la pagina.', 'warning');
    }else{
      this.fincas =  JSON.parse(window.localStorage.getItem("fincas"));
    }
  }

  llenarCampoEditar(id) {
    if (JSON.parse(window.localStorage.getItem("fincas")) === null || JSON.parse(window.localStorage.getItem("fincas")).length === 0) {
      this.toastConfirmacion('No tiene fincas registradas.', 'warning');
    } else {
      this.fincas = JSON.parse(window.localStorage.getItem("fincas"));
      this.fincas.map((item) => {
        if (item.landId === id) {
          this.nombreFinca = item.name;
          this.estado = item.status;
          this.idFinca = item.landId;
          this.idAgricultor = item.user.id;
        }
      });
    }
  }

  agregarFinca(form) {
    this.agricultor = JSON.parse(window.localStorage.getItem('agricultor'))
    if (this.nombreBoton === "Agregar") {      
      let cont = 0;
      let validacion = true;
      this.fincas = JSON.parse(window.localStorage.getItem("fincas"));
      if(this.fincas == null){
        this.fincas = [];
        window.localStorage.setItem("fincas", JSON.stringify(this.fincas));
      }
      if(this.fincas.length > 0){
        this.fincas.map((item)=>{
          if(item.landId <= 0){
            cont++;
          }
        })
        this.fincas.map((item)=>{
          if(item.name.toString() === form.value.nombreFinca){
            validacion = false;
          }
        })
      }      
      if(validacion === true){
        let datos = new LandEntity();
        datos = {
          name: form.value.firstValue,
          status: 1, //Estado 1 indica que esta activo
          user: this.agricultor,
          landId: cont * -1,
          edicion: false,
          agregar: false,
          code: this.generaCodigo()  
        }
        this.fincas.push(datos);     
        this.nombreFinca = null;   
        this.toastConfirmacion("Ingresado correctamente.","success");
        window.localStorage.setItem("fincas", JSON.stringify(this.fincas));
        this.router.navigateByUrl('/verFinca');
      }else{
        this.toastConfirmacion("La finca ya se encuentra registrada.","warning");
      }      
     
    } else {
      if (this.nombreBoton === "Actualizar") {        
        this.fincas.map((item)=>{
          if(item.landId === this.idFinca){
            item.status = this.estado;
            item.name = form.value.firstValue;
            item.user = this.agricultor;
            item.edicion = true;
          }
        })        
        this.toastConfirmacion("Actualizado correctamente.","success");        
        console.log('edito');
        window.localStorage.setItem("fincas", JSON.stringify(this.fincas));
        this.router.navigateByUrl('/verFinca');
      }else{
        console.log('no entro');
      }
    }
    
  }

  generaCodigo(): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+ABCDEFGHIJKLMNOPQRSTUVXYZ';    
    for (let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
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
