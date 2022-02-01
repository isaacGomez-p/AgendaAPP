import{ HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { LandEntity } from '../model/finca';
import { environment } from './../../environments/environment'
import { ApiResponse } from '../model/apiResponse';

@Injectable({
  providedIn: 'root'
})

export class FincaService {

  private dataUrl: string = "assets/json/pedidos.json"

  private urlService: string = environment.url;
  private _controller: string = this.urlService + "/land/";
  private _guardarFinca: string = this._controller + "save";
  private _traerTodosFincas: string = this._controller + "list";    

  constructor(private http: HttpClient, public navCtrl: NavController) {    
  }

  latitud: number = 0;
  longitud: number = 0;

  postFinca(land: LandEntity){
    return this.http.post(`${this._guardarFinca}`, land);
  }

  putFinca(datos: LandEntity, id: number){
    return this.http.put(`${this.urlService}/AGD_Finca/`+id, datos);
  }

  getAllLands(idUsuario: number): Observable<ApiResponse>{       
    return this.http.get<ApiResponse>(`${this._traerTodosFincas}?idUsuario=`+idUsuario);
  }
}