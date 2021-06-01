import { FormsModule } from '@angular/forms';
import { SiembraPage } from './pages/siembra/siembra.page';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Components
import { FincaComponent } from './pages/finca/finca.component';
import { VerFincaComponent } from './pages/finca/ver-finca/ver-finca.component';
import { LoginComponent } from './pages/login/login.component';
//Services
import { FincaService } from './services/finca.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule],
  providers: [    
    //Components
    FincaComponent,  
    VerFincaComponent,    
    SiembraPage,    
    //Services
    FincaService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
