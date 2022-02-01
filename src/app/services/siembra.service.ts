import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Siembra } from '../model/siembra';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class SiembraService {

    //private urlService: string = "http://190.60.254.186/Publicada/api"

    private urlService: string = environment.url
    private _controller: string = this.urlService + "/plantingMap/"
    private _guardar: string = this._controller + "save"

    constructor(private http: HttpClient, public navCtrl: NavController) {
    }

    latitud: number = 0;
    longitud: number = 0;

    postSiembra(datos: Siembra) {
        return this.http.post(`${this._guardar}`, datos);
    }

    getSiembrasFinca(idFinca: number): Observable<Siembra[]> {
        return this.http.get<Siembra[]>(`${this.urlService}/AGD_Plano_de_siembra/` + idFinca);
    }

    deleteSiembra(idSiembra: number){
        return this.http.delete(`${this.urlService}/AGD_Plano_de_siembra?plano_id=` + idSiembra);
    }

}