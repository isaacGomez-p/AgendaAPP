import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Siembra } from '../model/siembra';


@Injectable({
    providedIn: 'root'
})

export class SiembraService {

    private urlService: string = "http://190.60.254.186/Publicada/api"

    constructor(private http: HttpClient, public navCtrl: NavController) {
    }

    latitud: number = 0;
    longitud: number = 0;

    postSiembra(datos: Siembra) {
        return this.http.post(`${this.urlService}/AGD_Plano_de_siembra`, datos);
    }

    getSiembrasFinca(idFinca: number): Observable<Siembra[]> {
        return this.http.get<Siembra[]>(`${this.urlService}/AGD_Plano_de_siembra/` + idFinca);
    }

}