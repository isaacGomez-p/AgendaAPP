import{ HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Agricultor } from '../model/agricultor';


@Injectable({
  providedIn: 'root'
})

export class AgricultorService {

  private dataUrl: string = "assets/json/pedidos.json"

  private urlService: string = "http://190.60.254.186/Publicada/api"

  //private urlService: string = "https://localhost:44341/api";
  
  constructor(private http: HttpClient, public navCtrl: NavController) {    
  }

  latitud: number = 0;
  longitud: number = 0;

  postAgricultor(datos: Agricultor){
    return this.http.post(`${this.urlService}/AGD_Agricultor`, datos);
  }

  putAgricultor(datos: Agricultor, id: number){
    return this.http.put(`${this.urlService}/AGD_Agricultor/`+id, datos);
  }

  login(cedula: number, clave: string){
    return this.http.get<Agricultor[]>(`${this.urlService}/AGD_Agricultor?cedula=`+cedula+`&clave=`+clave);
  }

  getAllUser(idUsuario: number): Observable<Agricultor[]>{       
    return this.http.get<Agricultor[]>(`${this.urlService}/AGD_Finca/`+idUsuario);
  }
}