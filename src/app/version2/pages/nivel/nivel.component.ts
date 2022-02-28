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
  boton: string;
  cont: number = 0;
  nivel: number = 0;
  precedente: number[] = [];
  buttonActive: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {}

  ionViewDidEnter(){
    this.niveles = JSON.parse(window.localStorage.getItem("labels"))
    
    if(window.localStorage.getItem("labels") !== undefined || window.localStorage.getItem("labels") !== null){    this.titulo = this.niveles[this.cont].descripcion;
      this.cargarDatosNivel();
    }    
    
  }

  cargarDatosNivel(){
    this.titulo = this.niveles[this.cont].plural;
    this.boton = this.niveles[this.cont].descripcion;
    this.nivel = this.niveles[this.cont].prioridad;
    
    this.cargarLista();
  }

  cargarLista(){
    console.log("____________ precedente " + JSON.stringify(this.precedente))
    console.log("____________ Nivel: " + this.nivel + " -- Precedente: " + this.precedente[this.cont-1])
    this.listaDatos = [];
    if(window.localStorage.getItem("SP_UEN") !== undefined && window.localStorage.getItem("SP_UEN") !== null){
      let datos = JSON.parse(window.localStorage.getItem("SP_UEN"));
      datos.map((item)=>{
        if(this.nivel === 0){          
          if(item.prioridad === this.nivel){
            this.listaDatos.push(item);
            console.log("____________ agrego "  +JSON.stringify(item))
          }
        }else{
          if(item.precedente === this.precedente[this.cont-1] && item.prioridad === this.nivel){
            this.listaDatos.push(item);
            console.log("____________ agrego "  +JSON.stringify(item))
          }
        }
      })
    }    
  }

  siguienteNivel(ld){
    console.log("siguienteNivel")
    
    if(this.niveles.length > this.cont) {
      this.cont++;
      console.log("this.cont: " + (this.cont))
      this.titulo = this.niveles[this.cont-1].descripcion;      
      this.precedente.push(ld.id);
      this.cargarDatosNivel();
    }else{
      console.log("no hay mas niveles")
    }
    
  }

  volver(){
    console.log("volver _______" + JSON.stringify(this.precedente) + " ---- " +this.cont)

    if(this.cont !== 0){      
      this.cont--;      
      console.log("this.cont: " + (this.cont-1))
      this.precedente.forEach((value,index)=>{
        if(this.precedente.length - 1 === index){
          this.precedente.splice(index,1);
        }
      });
      this.titulo = this.niveles[this.cont].descripcion;      
      this.cargarDatosNivel();
      
      this.precedente[this.cont-1];
      
    }else{
      console.log("no hay mas niveles 2")
    }
  }

  nuevo(){
    console.log("_______" + JSON.stringify(this.precedente))
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
    this.router.navigateByUrl('/agregar');
  }

  insertarActividad(){
    this.router.navigateByUrl('/planillas');
  }

}
