import { Agricultor } from './../../model/agricultor';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Finca } from 'src/app/model/finca';
import { FincaService } from 'src/app/services/finca.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-finca',
  templateUrl: './finca.component.html',
  styleUrls: ['./finca.component.scss'],
})
export class FincaComponent implements OnInit {
  agricultor: Agricultor[];
  titulo: String;

  nombreFinca: String;
  idFinca: number;
  idAgricultor: number;
  estado: number;

  fincas: Finca[];

  nombreBoton: String;

  constructor(private router: Router, private paramsUrl: ActivatedRoute, private fincaService: FincaService, private toastController: ToastController) {

  }

  cargarFincasLS(){
    if(JSON.parse(window.localStorage.getItem("fincas")) === null || JSON.parse(window.localStorage.getItem("fincas")).length === 0){
      this.toastConfirmacion('No tiene fincas registradas. Por favor actualice la pagina.', 'warning');
    }else{
      this.fincas =  JSON.parse(window.localStorage.getItem("fincas"));
    }
  }

  ngOnInit() {
    this.cargarFincasLS();
    window.localStorage.removeItem("buscarSiembraFinca")
    this.titulo = this.paramsUrl.snapshot.paramMap.get('titulo')
    if (this.paramsUrl.snapshot.paramMap.get('idEditar') !== null && this.paramsUrl.snapshot.paramMap.get('idEditar') !== '0') {
      this.llenarCampoEditar(parseInt(this.paramsUrl.snapshot.paramMap.get('idEditar')))
      this.nombreBoton = "Editar";
    } else {
      this.nombreBoton = "Agregar";
    }
  }

  llenarCampoEditar(id) {
    if (JSON.parse(window.localStorage.getItem("fincas")) === null || JSON.parse(window.localStorage.getItem("fincas")).length === 0) {
      this.toastConfirmacion('No tiene fincas registradas.', 'warning');
    } else {
      this.fincas = JSON.parse(window.localStorage.getItem("fincas"));
      this.fincas.map((item) => {
        if (item.finca_id === id) {
          this.nombreFinca = item.nombre;
          this.estado = item.estado;
          this.idFinca = item.finca_id;
          this.idAgricultor = item.id_agricultor;
        }
      });
    }
  }

  agregarFinca(form) {
    this.agricultor = JSON.parse(window.localStorage.getItem('agricultor'))
    if (this.nombreBoton === "Agregar") {      
      let cont = 0;
      this.fincas.map((item)=>{
        if(item.finca_id <= 0){
          cont++;
        }
      })
      let validacion = true;
      this.fincas.map((item)=>{
        if(item.nombre.toString() === form.value.nombreFinca){
          validacion = false;          
        }
      })
      if(validacion === true){
        let datos = new Finca();
        datos = {
          nombre: form.value.nombreFinca,
          estado: 1, //Estado 1 indica que esta activo
          id_agricultor: this.agricultor[0].agricultor_id,
          finca_id: cont * -1,
          edicion: false          
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
      if (this.nombreBoton === "Editar") {        
        this.fincas.map((item)=>{
          if(item.finca_id === this.idFinca){
            item.estado = this.estado;
            item.nombre = form.value.nombreFinca;
            item.id_agricultor = this.agricultor[0].agricultor_id;
            item.edicion = true;
          }
        })        
        this.toastConfirmacion("Editado correctamente.","success");        
        console.log('edito');
        window.localStorage.setItem("fincas", JSON.stringify(this.fincas));
        this.router.navigateByUrl('/verFinca');
      }else{
        console.log('no entro');
      }
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

}
