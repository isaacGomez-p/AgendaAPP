import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html',
  styleUrls: ['./nivel.component.scss'],
})
export class NivelComponent implements OnInit {

  niveles: any = [];
  listaDatos: any = []
  titulo: string;
  subtitulo:string = "";
  boton: string;
  cont: number = 0;
  nivel: number = 0;
  precedente: number[] = [];
  buttonActive: boolean = false;
  disponibleBotonPlanilla: boolean = false;
  habilitarEspacio: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {}

  ionViewDidEnter(){
    this.niveles = JSON.parse(window.localStorage.getItem("labels"))
    
    if(window.localStorage.getItem("labels") !== undefined || window.localStorage.getItem("labels") !== null){   
      this.cargarTitulo()
      this.cargarDatosNivel();
    }    
    
  }

  cargarDatosNivel(){        
    this.boton = this.niveles[this.cont].descripcion;
    this.nivel = this.niveles[this.cont].prioridad;
    if(this.niveles[this.cont].disponiblePlanilla){
      this.disponibleBotonPlanilla = true;
    }else{
      this.disponibleBotonPlanilla = false;
    }
    this.cargarLista();
  }

  cargarLista(){
    
    this.listaDatos = [];
    if(window.localStorage.getItem("SP_UEN") !== undefined && window.localStorage.getItem("SP_UEN") !== null){
      let datos = JSON.parse(window.localStorage.getItem("SP_UEN"));
      datos.map((item)=>{
        if(this.nivel === 0){          
          if(item.prioridad === this.nivel){
            this.listaDatos.push(item);
          }
        }else{
          if(item.precedente === this.precedente[this.cont-1] && item.prioridad === this.nivel){
            this.listaDatos.push(item);
          }
        }
        if(this.cont === 0){
          this.subtitulo = undefined;
        }else{
          if(item.id === this.precedente[this.cont-1]){                          
            if(this.subtitulo === undefined){
              this.subtitulo = item.nombre;              
            }    
          }
        }
      })   
    } 
  }

  edit(ld){ 
    let precedenteId = 0;
    if(this.nivel !== 0){
      precedenteId = this.precedente[this.cont]
    }
    let datos = {
      prioridad: this.nivel,
      titulo: this.titulo,
      singular: this.boton,
      precedente: precedenteId,
      nombre: ld.nombre,
      id: ld.id
    }
    window.localStorage.setItem("precedente", JSON.stringify(datos));
    this.router.navigateByUrl('/agregar/Editar');
  }

  siguienteNivel(ld){    
    this.cont++;
    if(this.niveles.length > this.cont) {      
      console.log("this.cont: " + (this.cont))
            
      this.precedente.push(ld.id);
      this.cargarDatosNivel();
      this.cargarDatosSubTitulo(true)
      this.cargarTitulo()
    }else{
      this.cont--;
      console.log("no hay mas niveles")
    }
    
  }

  volver(){
    if(this.cont !== 0){      
      this.cont--;      
      console.log("this.cont: " + (this.cont-1))
      this.precedente.forEach((value,index)=>{
        if(this.precedente.length - 1 === index){
          this.precedente.splice(index,1);
        }
      });
       
      this.cargarDatosNivel();
      
      this.precedente[this.cont-1];
      this.cargarDatosSubTitulo(false)
      this.cargarTitulo()
    }else{
      console.log("no hay mas niveles 2")
    }
  }

  nuevo(){
    let precedenteId = 0;
    if(this.nivel !== 0){
      precedenteId = this.precedente[this.cont-1]
    }
    let datos = {
      prioridad: this.nivel,
      titulo: this.titulo,
      singular: this.boton,
      precedente: precedenteId
    }
    window.localStorage.setItem("precedente", JSON.stringify(datos));
    this.router.navigateByUrl('/agregar/Agregar');
  }

  insertarActividad(ld){
    let sepUn = JSON.parse(window.localStorage.getItem("SP_UEN"));
    let nombreGrupo;
    let idNombre;
    sepUn.map((item)=>{
      if(item.id === this.precedente[this.cont-1]){
        nombreGrupo = ld.nombre;
        idNombre = ld.id
      }
    })
    
    let datos = {
      descripcion: nombreGrupo,
      plural: this.niveles[this.cont].plural,
      idNombre: idNombre,      
    }
    localStorage.setItem("insertarActividad", JSON.stringify(datos))
    this.router.navigateByUrl('/planillas');
  }

  cargarTitulo(){
    this.titulo = this.niveles[this.cont].plural;
  }

  cargarDatosSubTitulo(agregar){
    if(agregar){
      this.subtitulo = "";
      this.habilitarEspacio = false    
      let cont = 0;
      let contAux = 0;
      this.precedente.map((item)=>{
        let sepUn = JSON.parse(window.localStorage.getItem("SP_UEN"));
        sepUn.map((sep)=>{
          if(sep.id === item){
            if(cont === 0){
              this.subtitulo = sep.nombre
            }else{
              this.subtitulo = this.subtitulo + " - " +sep.nombre      
            }
            cont++;
          }
        })
        contAux++;
        if(contAux > 2){
          this.habilitarEspacio = true
        }
      })
    }else{
      this.subtitulo = "";
      let cont = 0;
      let contAux = 0;
      this.habilitarEspacio = false
      this.precedente.map((item)=>{
        let sepUn = JSON.parse(window.localStorage.getItem("SP_UEN"));
        sepUn.map((sep)=>{
          if(sep.id === item){
            if(cont === 0){
              this.subtitulo = sep.nombre
            }else{
              this.subtitulo = this.subtitulo + " - " +sep.nombre
            }            
            cont++;
          }
        })
        contAux++;
        if(contAux > 2){
          this.habilitarEspacio = true
        }
      })
    }
    window.localStorage.setItem("subtitulo", this.subtitulo);   
  }

}
