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
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  public menuState:boolean = false;
  public url:string;
  // public hoteles:Hotel[];
  hoteles = [];
  public termino: string;
  public contador = 1;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _hotelService: HotelService,
  ) {
    this.url = GLOBAL.url;
  }


  ngOnInit() {
    //Llamar a la lista de hoteles
    this.getHotels();
  }

  getHotels(){

    this._hotelService.getHotels(this.contador)
        .subscribe ( (resp:any) =>{
          for(let newHotel of resp.hoteles){
            this.hoteles.push(newHotel)
          }

          console.log( this.hoteles);
          console.log( typeof this.hoteles);

          this.contador++;
        })
  }

  getHotelsByStars(stars,elem){

    this.termino = '';

    var group = $('.checks');
    for (var i=0; i<group.length; i++) {
        console.log(group[i]);
        if (group[i] != elem.target) {
            group[i].checked = false;
        }
    }

    this._hotelService.getHotelsByStars(stars,'')
      .subscribe( (resp:any) => {
        console.log(resp);
        this.hoteles = resp.hoteles;
      },
      error =>{
        console.log(error);
      })

  }

  cleanStars(){
    $('.checks').prop('checked',false);
  }

  searchHotel(){

    this._hotelService.searchHotels( this.termino, '' )
      .subscribe( (resp:any) => {
        console.log(resp);
        this.hoteles = resp.hoteles;
      });

  }

  onScroll() {
    console.log("scroll");
    this.getHotels();
  }

  openMenu(){
    console.log("menu");
    if(!this.menuState){
      $('#arrow').attr("src", "/assets/images/rowUp.jpg");
      $('.sideBar').css("height", "399px");
      this.menuState = true;
    }else{
      $('#arrow').attr("src", "/assets/images/rowDown.jpg");
      $('.sideBar').css("height", "50px");
      this.menuState = false;
    }
  }

  counter(i: number) {
    return new Array(i);
  }
}
