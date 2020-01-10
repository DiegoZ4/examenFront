import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

//Mis Componentes
import { AppComponent } from './app.component';
import { HotelComponent } from './pantallas/hotel.component';
import { HomeComponent } from './pantallas/home.component';
import { HotelListComponent } from './crud/hotel-list.component';
import { HotelAddComponent } from './crud/hotel-add.component';
import { HotelEditComponent } from './crud/hotel-edit.component';

//Extras
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    HotelComponent,
    HomeComponent,
    HotelListComponent,
    HotelAddComponent,
    HotelEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
