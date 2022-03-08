import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

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
  precedenteId: number;
  prioridad: number;
  id: number;
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
    console.log("--- " + this.nombre);
    if(this.nombre !== undefined && this.nombre !== null && this.nombre !== ""){

      if(this.accion === "Editar"){
        let spUen = JSON.parse(localStorage.getItem("SP_UEN"))
        spUen.map((item)=>{
          if(item.id === this.id){
            item.nombre = this.nombre
          }
        })
        localStorage.setItem("SP_UEN", JSON.stringify(spUen))  
        this.router.navigateByUrl('/nivel');
      }else{
        //Va a guardar
        let spUen = JSON.parse(localStorage.getItem("SP_UEN"))
        
        let cont = 0;
        if(spUen === null || spUen === undefined){
          spUen = []      
        }else{
          cont = spUen.length;
        }

        spUen.push({
          id: cont,
          nombre: this.nombre,
          prioridad: this.prioridad,
          precedente: this.precedenteId,
          code: this.generaCodigo()
        })

        localStorage.setItem("SP_UEN", JSON.stringify(spUen))  
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
