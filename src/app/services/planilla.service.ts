import { Planilla } from './../model/planilla';
import { NumeroPlanilla } from './../model/numeroPlanilla';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})

export class PlanillaService {

  private dataUrl: string = "assets/json/pedidos.json"

  //private urlService: string = "http://190.60.254.186/Publicada/api"

  private urlService: string = environment.url
  private _controller: string = this.urlService + "/spreedsheet/"
  private _guardar: string = this._controller + "save"  
  private _cargarDatos: string = this._controller + "list"
  
  private login = [];

  constructor(private http: HttpClient, public navCtrl: NavController) {
  }

  latitud: number = 0;
  longitud: number = 0;

  postPlanillaAplicacion(datos: Planilla) {
    return this.http.post(`${this._guardar}/`, datos);
  }

  putPlanillaAplicacion(datos: Planilla, id: number) {
    return this.http.put(`${this._cargarDatos}/`+ + id, datos);
  }

  postNumeroPlanilla(datos: NumeroPlanilla) {
    return this.http.post(`${this.urlService}/AGD_N_Planilla`, datos);
  }

  getNumerosPlanillas(idUsuario: number): Observable<NumeroPlanilla[]> {
    return this.http.get<NumeroPlanilla[]>(`${this.urlService}/AGD_N_Planilla/` + idUsuario);
  }

  getPlanillas(idPlanilla: number): Observable<Planilla[]> {
    return this.http.get<Planilla[]>(`${this.urlService}/AGD_Planilla_de_aplicacion/` + idPlanilla);
  }

  deletePlanillas(idPlanilla: number) {
    return this.http.delete(`${this.urlService}/AGD_Planilla_de_aplicacion?planilla_id=` + idPlanilla);
  }
}