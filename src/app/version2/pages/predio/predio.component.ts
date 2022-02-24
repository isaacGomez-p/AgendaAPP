import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-predio',
  templateUrl: './predio.component.html',
  styleUrls: ['./predio.component.scss'],
})
export class PredioComponent implements OnInit {

  predios: any = []

  constructor(private router: Router) { }

  ngOnInit() {}

  verPiscina(predio){

  }

  volver(){
    this.router.navigateByUrl('/grupoProductor');
  }

  nuevoPredio(){
    
  }

}
