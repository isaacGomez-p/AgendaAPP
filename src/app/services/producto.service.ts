import{ HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Producto } from '../model/producto';


@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  private dataUrl: string = "assets/json/pedidos.json"

  private urlService: string = "http://190.60.254.186/Publicada/api"

  //private urlService: string = "https://localhost:44341/api";
  private login = [];

  constructor(private http: HttpClient, public navCtrl: NavController) {    
  }  

  postProducto(datos: Producto){
    return this.http.post(`${this.urlService}/AGD_Producto`, datos);
  }

  putProducto(datos: Producto, id: number){
    return this.http.put(`${this.urlService}/AGD_Producto/`+id, datos);
  }

  getAll(idUsuario: number): Observable<Producto[]>{       
    return this.http.get<Producto[]>(`${this.urlService}/AGD_Producto/`+idUsuario);
  }
}