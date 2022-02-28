import { FormsModule } from '@angular/forms';
import { SiembraPage } from './pages/siembra/siembra.page';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

//Components
import { FincaComponent } from './pages/finca/finca.component';
import { VerFincaComponent } from './pages/finca/ver-finca/ver-finca.component';
import { LoginComponent } from './pages/login/login.component';
//Services
import { FincaService } from './services/finca.service';

 // importar locales
 import localePy from '@angular/common/locales/es-PY';
 import { registerLocaleData } from '@angular/common';

 registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule],
  providers: [    
    //Components
    FincaComponent,  
    VerFincaComponent,    
    SiembraPage,    
    StatusBar,
    SplashScreen,
    //Services
    FincaService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'es' }
  ],
    
  bootstrap: [AppComponent],
})
export class AppModule {}
