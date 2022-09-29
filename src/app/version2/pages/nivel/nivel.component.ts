import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SP_UEN } from 'src/app/model/SP_UEN';

@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html',
  styleUrls: ['./nivel.component.scss'],
})
export class NivelComponent implements OnInit {

  niveles: any = [];
  listaDatos: any = [];
  titulo: string;
  subtitulo: String = "";
  boton: string;
  cont: number = 0;
  nivel: number = 0;
  precedente: String[] = [];
  buttonActive: boolean = false;
  disponibleBotonPlanilla: boolean = false;
  habilitarEspacio: boolean = false;
  listaSpUen: SP_UEN[] = [];

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
    this.niveles.map(item =>{
      if(item.prioridad === this.cont){
        this.boton = item.descripcion;
        this.nivel = item.prioridad;
        if(item.disponiblePlanilla){
          this.disponibleBotonPlanilla = true;
        }else{
          this.disponibleBotonPlanilla = false;
        }
        this.cargarLista();
      }
    })
  }

  cargarLista(){
    this.listaDatos = [];
    if(window.localStorage.getItem("SP_UEN") !== undefined && window.localStorage.getItem("SP_UEN") !== null){
      this.listaSpUen = JSON.parse(window.localStorage.getItem("SP_UEN"));
      this.listaSpUen.map((item)=>{
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
          if(item.precedente === this.precedente[this.cont-1]){                          
            if(this.subtitulo === undefined){
              this.subtitulo = item.nombre;              
            }    
          }
        }
      })   
    }
    
  }

  edit(ld){ 
    /*let precedenteId = "";
    console.log("A  VER " + JSON.stringify(this.precedente));
    
    if(this.nivel !== 0){
      precedenteId = this.precedente[this.cont].toString()
    }*/
    let datos = {
      prioridad: this.nivel,
      titulo: this.titulo,
      singular: this.boton,
      precedente: ld.code,
      nombre: ld.nombre,
      id: ld.id
    }
    window.localStorage.setItem("precedente", JSON.stringify(datos));
    this.router.navigateByUrl('/agregar/Editar');
  }

  siguienteNivel(ld){    
    this.cont++;
    if(this.niveles.length > this.cont) {
      this.precedente.push(ld.code);
      this.cargarDatosNivel();
      this.cargarDatosSubTitulo(true)
      this.cargarTitulo()
    }else{
      this.cont--;
    }
    
  }

  volver(){
    if(this.cont !== 0){      
      this.cont--;
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
    let precedenteId = "";
    if(this.nivel !== 0){
      precedenteId = this.precedente[this.cont-1].toString()
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
      if(item.code === this.precedente[this.cont-1]){
        nombreGrupo = ld.nombre;
        idNombre = ld.code
      }
    })
    
    this.niveles.map(item =>{
      if(this.cont === item.prioridad){       
        let datos = {
          descripcion: nombreGrupo,
          plural: item.plural,
          idNombre: idNombre,      
        }
        localStorage.setItem("insertarActividad", JSON.stringify(datos))
      }
    })
    
    
    this.router.navigateByUrl('/planillas');
  }

  cargarTitulo(){
    
    this.niveles.map(item =>{
      if(this.cont === item.prioridad){
        this.titulo = item.plural;        
      }
    })
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
    window.localStorage.setItem("subtitulo", this.subtitulo.toString());   
  }

}
