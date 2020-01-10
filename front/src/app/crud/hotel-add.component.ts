import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Modelos
import { Hotel } from '../models/hotel';

//Servicios
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-hotel-add',
  templateUrl: './hotel-add.component.html',
  styles: []
})
export class HotelAddComponent implements OnInit {

  public titulo:string;
  public hotel:Hotel;
  public alertMessage:string;

  constructor(
    private _hotelService: HotelService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.titulo = "Crear un nuevo Hotel";
    this.hotel = new Hotel('',null,'','',[]);

  }

  ngOnInit() {}

  onSubmit() {
    console.log(this.hotel);
    this._hotelService.addHotel(this.hotel)
        .subscribe ( (resp:any) => {

          if(!resp.hotel){
            this.alertMessage = 'Error al crear el Hotel';
          }else{
            this.hotel = resp.hotel;
            this.alertMessage = 'El Hotel se ha creado con exito';
            // this._router.navigate(['/crud/hoteles-edit'], resp.hotel._id);
          }
        },
        error =>{
          var errorMessage = <any>error;

          if(!errorMessage != null) {
            var body = JSON.parse(error._body);
            this.alertMessage = body.message;

            console.log(error);
          }
        });
  }

}
