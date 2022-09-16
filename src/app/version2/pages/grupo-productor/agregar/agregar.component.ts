import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SP_UEN } from 'src/app/model/SP_UEN';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss'],
})
export class AgregarComponent implements OnInit {

  // Data passed in by componentProps
  @Input() data: any;
  titulo: string;
  accion: string;
  nombre: string = "";
  singular: string = "";
  precedenteId: String;
  prioridad: number;
  id: number;
  spUen : SP_UEN[];

  constructor(public modalController: ModalController,
    private router: Router,
    private paramsUrl: ActivatedRoute) { }

  ngOnInit() {}

  ionViewDidEnter(){
    let precedente = JSON.parse(window.localStorage.getItem("precedente"));
    this.titulo = precedente.titulo
    this.singular = precedente.singular
    this.precedenteId = precedente.precedente
    this.prioridad = precedente.prioridad
    this.nombre = "";

    this.accion = this.paramsUrl.snapshot.paramMap.get('accion')
    if(this.accion === "Editar"){
      this.cargarDatosEditar(precedente);
    }

  }

  cargarDatosEditar(datos){
    this.nombre = datos.nombre
    this.id = datos.id
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    /*this.modalController.dismiss({
      'dismissed': true
    });*/
    this.router.navigateByUrl('/nivel');
  }

  guardar(){
    if(this.nombre !== undefined && this.nombre !== null && this.nombre !== ""){
      if(this.accion === "Editar"){
        this.spUen = JSON.parse(localStorage.getItem("SP_UEN"))
        this.spUen.map((item)=>{
          if(item.id === this.id){
            item.nombre = this.nombre
          }
        })
        localStorage.setItem("SP_UEN", JSON.stringify(this.spUen))  
        this.router.navigateByUrl('/nivel');
      }else{
        //Va a guardar
        this.spUen = JSON.parse(localStorage.getItem("SP_UEN"))
        
        let cont = 0;
        if(this.spUen === null || this.spUen === undefined){
          this.spUen = []      
        }else{
          cont = this.spUen.length;
        }

        
        let sp = new SP_UEN();
        sp.id = cont*-1
        sp.nombre = this.nombre
        sp.prioridad =  this.prioridad
        sp.precedente = this.precedenteId
        sp.code = this.generaCodigo()        
        sp.agregar = false;
        this.spUen.push(sp);

        localStorage.setItem("SP_UEN", JSON.stringify(this.spUen))  
        this.router.navigateByUrl('/nivel');
      }
    }else{
      console.log("ERROR: nombreGrupo: " + this.nombre)
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

}
