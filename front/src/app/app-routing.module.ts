import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HotelComponent } from './pantallas/hotel.component';
import { HomeComponent } from './pantallas/home.component';

//Componentes del CRUD
import { HotelListComponent } from './crud/hotel-list.component';
import { HotelAddComponent } from './crud/hotel-add.component';
import { HotelEditComponent } from './crud/hotel-edit.component';

const routes: Routes = [
  { path : '', component : HomeComponent },
  { path : 'hoteles', component : HotelComponent },

  //Rutas del CRUD
  { path : 'crud/hoteles-list/:page', component : HotelListComponent },
  { path : 'crud/hoteles-add', component : HotelAddComponent },
  { path : 'crud/hoteles-edit/:id', component : HotelEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
