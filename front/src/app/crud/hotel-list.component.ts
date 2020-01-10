import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Observable } from "rxjs/Observable";

//Modelos
import { Hotel } from '../models/hotel';

//Servicios
import { GLOBAL } from '../services/global';
import { HotelService } from '../services/hotel.service';

// Iniciar variables de jQuery para Bootstrap
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styles: []
})
export class HotelListComponent implements OnInit {

  public titulo:string;
  public url:string;
  public hoteles:Hotel[];
  public page;
  public next_page;
  public prev_page;
  public hotelToDelete:string;
  public hotelToDeleteId:string;
  public termino: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _hotelService: HotelService,
  ) {
    this.titulo = "Listado de Hoteles";
    this.url = GLOBAL.url;
    this.next_page = 1;
    this.prev_page = 1;
  }

  ngOnInit() {
    //Llamar a la lista de hoteles
    this.getHotels();
  }

  getHotels(){
    this._route.params
        .pipe( map(params => params) )
        .subscribe( data => {

          if(data.page) {
            this.page = data.page;
            this.next_page = parseInt(this.page) + 1;

            if(this.page != 1){
              this.prev_page = parseInt(this.page) - 1;
            }

          }else{
            this.page = 1
          }

          console.log(this.page);

          this._hotelService.getHotels(this.page)
              .subscribe( (resp:any) => {
                // console.log(resp);
                this.hoteles = resp.hoteles;
              },
              error =>{
                console.log(error);
              })

        })
  }

  onDeleteConfirm(hotelId, hotelName){
    $('#exampleModal').modal('show');
    this.hotelToDelete = hotelName;
    this.hotelToDeleteId = hotelId;
  }

  onDeleteHotel(){
    this._hotelService.deleteHotel(this.hotelToDeleteId)
        .subscribe ( (resp:any)=>{
          if(!resp.hotel_eliminado) {
            alert('Ha ocurrido un error en el servidor');
          }

          $('#exampleModal').modal('hide')
          this.getHotels();
        },
        error =>{
          console.log(error)
        })
  }

  searchHotel(){
    console.log(this.termino.length);

    // if( this.termino.length <= 3 ){
    //   this.entidades=[];
    //   return;
    // }

    this._hotelService.searchHotels( this.termino, this.page )
      .subscribe( (resp:any) => {
        console.log(resp);
        this.hoteles = resp.hoteles;
      });

  }
}
