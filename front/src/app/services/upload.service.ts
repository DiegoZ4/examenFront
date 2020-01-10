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

export class UploadService {

  url:string;

  constructor(
    public _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  makeFileRequest(url:string, params: Array<string>, files: Array<File>, name) {

    return new Promise( function(resolve, reject) {
      var formData:any = new FormData();
      var xhr = new XMLHttpRequest();

      for(var i = 0; i < files.length; i++){
        formData.append(name, files[i], files[i].name);
      }

      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
              resolve(JSON.parse(xhr.response));
            }else{
              reject(xhr.response);
            }
        }
      }

      xhr.open('POST', url, true);
      xhr.send(formData);

    })
  }
}
