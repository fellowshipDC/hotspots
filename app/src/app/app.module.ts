import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { QuestionsComponent } from './questions/questions.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { DatosComponent } from './datos/datos.component';
import { GmapComponent } from './gmap/gmap.component';
import { ScatterComponent } from './scatter/scatter.component';
import { TreemapComponent } from './treemap/treemap.component';
import { TipoComponent } from './tipo/tipo.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { EstatusComponent } from './estatus/estatus.component';
import { DonutsComponent } from './donuts/donuts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    QuestionsComponent,
    NavbarComponent,
    AboutComponent,
    DatosComponent,
    GmapComponent,
    ScatterComponent,
    TreemapComponent,
    TipoComponent,
    ProveedorComponent,
    EstatusComponent,
    DonutsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
    apiKey:'AIzaSyCLTQRbxOojM8LIHje0zD-qtydA2TpbOAU'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
