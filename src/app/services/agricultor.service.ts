import{ HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { UserEntity } from '../model/userEntity';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/apiResponse';


@Injectable({
  providedIn: 'root'
})

export class AgricultorService {

  //private dataUrl: string = "assets/json/pedidos.json"

  private urlService: string = environment.url
  private _controller: string = this.urlService + "/user/"
  private _guardarAgricultor: string = this._controller + "save"  
  private _traerTodosUsuarios: string = this._controller + "list"  
  private _traerUsuarioPorId: string = this._controller + "getById"  
  private _login: string = this._controller + "login"
  private _labels: string = this.urlService + "/labels/list"
  constructor(private http: HttpClient, public navCtrl: NavController) {    
  }

  latitud: number = 0;
  longitud: number = 0;

  postAgricultor(user: UserEntity){
    return this.http.post(`${this._guardarAgricultor}`, user);
  }

  putAgricultor(datos: UserEntity, id: number){
    return this.http.put(`${this.urlService}/AGD_Agricultor/`+id, datos);
  }

  login(user: UserEntity): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this._login, user);    
  }

  /*login(user: UserEntity) : Promise<ApiResponse>{
    //return this.http.get<UserEntity[]>(`${this.urlService}/AGD_Agricultor?cedula=`+cedula+`&clave=`+clave);
    return this.http.post<ApiResponse>(`${this._login}`, user).toPromise<ApiResponse>();
  }*/

  getLabels() : Promise<ApiResponse>{
    //return this.http.get<UserEntity[]>(`${this.urlService}/AGD_Agricultor?cedula=`+cedula+`&clave=`+clave);
    return this.http.get<ApiResponse>(`${this._labels}`).toPromise<ApiResponse>();
  }

  getAllUser(idUsuario: number): Observable<UserEntity[]>{       
    return this.http.get<UserEntity[]>(`${this._traerTodosUsuarios}`+idUsuario);
  }

  getUserById(idUsuario: number): Promise<ApiResponse>{       
    return this.http.get<ApiResponse>(`${this._traerUsuarioPorId}`+`?userId=`+idUsuario).toPromise<ApiResponse>();
  }
}