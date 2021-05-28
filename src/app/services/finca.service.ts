import{ HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Finca } from '../model/finca';


@Injectable({
  providedIn: 'root'
})

export class FincaService {

  private dataUrl: string = "assets/json/pedidos.json"

  private urlService: string = "http://190.60.254.186/Publicada/api"

  //private urlService: string = "https://localhost:44341/api";
  private login = [];

  constructor(private http: HttpClient, public navCtrl: NavController) {    
  }

  latitud: number = 0;
  longitud: number = 0;

  postFinca(datos: Finca){
    return this.http.post(`${this.urlService}/AGD_Finca`, datos);
  }

  putFinca(datos: Finca, id: number){
    return this.http.put(`${this.urlService}/AGD_Finca/`+id, datos);
  }

  getAllUser(idUsuario: number): Observable<Finca[]>{       
    return this.http.get<Finca[]>(`${this.urlService}/AGD_Finca/`+idUsuario);
  }
}