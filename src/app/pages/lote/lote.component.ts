import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lote',
  templateUrl: './lote.component.html',
  styleUrls: ['./lote.component.scss'],
})
export class LoteComponent implements OnInit {

  titulo: String;

  nombreLote: String;

  constructor(private paramsUrl: ActivatedRoute) { 
    this.titulo = paramsUrl.snapshot.paramMap.get('titulo')
  }

  ngOnInit() {}

  agregarLote(form){

  }

}
