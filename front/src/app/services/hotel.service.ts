import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

//Modelos
import { Hotel } from '../models/hotel';

//Otros servicios
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  url:string;

  constructor(
    public _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  getHotels(page) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.get(this.url+'/hoteles/'+page, { headers })
  }

  getHotel(id) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.get(this.url+'/hotel/'+id, { headers })
  }

  addHotel(hotel:Hotel){

    let params = JSON.stringify(hotel);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.post(this.url+'/hotel', params, { headers })
                     // .map( res => res.json() );

  }

  editHotel(id, hotel:Hotel){

    let params = JSON.stringify(hotel);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.put(this.url+'/hotel/'+id, params, { headers })

  }

  deleteHotel(id) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.delete(this.url+'/hotel/'+id, { headers })
  }

  searchHotels(key,page) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.get(this.url+'/hoteles-search/'+key+'/'+page, { headers })
  }

  getHotelsByStars(stars,page) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.get(this.url+'/hoteles-stars/'+stars+'/'+page, { headers })
  }
}
