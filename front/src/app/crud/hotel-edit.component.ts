import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Observable } from "rxjs/Observable";

//Modelos
import { Hotel } from '../models/hotel';

//Servicios
import { GLOBAL } from '../services/global';
import { HotelService } from '../services/hotel.service';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-add.component.html',
  styles: []
})
export class HotelEditComponent implements OnInit {

  public titulo:string;
  public hotel:Hotel;
  public alertMessage:string;
  public is_edit;
  public id:string;
  public url:string;

  constructor(
    private _hotelService: HotelService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.titulo = "Editar Hotel";
    this.hotel = new Hotel('',null,'','',[]);
    this.is_edit = true;
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('Componente de edicion del hotel cargado');
    //Llamar el metodo del API para obtener un artista
    this.getHotel();
  }

  getHotel(){
    this._route.params
        .pipe( map(params => params) )
        .subscribe( id => {

          this.id = id.id;

          this._hotelService.getHotel(this.id)
              .subscribe( (resp:any)=>{
                  this.hotel = resp.hotel;
              },
              error =>{
                var errorMessage = <any>error;

                if(!errorMessage != null) {
                  var body = JSON.parse(error._body);
                  this.alertMessage = body.message;

                  console.log(error);
                }
              })
        })
  }

  onSubmit() {
    console.log(this.hotel);
    this._hotelService.editHotel(this.id, this.hotel)
        .subscribe ( (resp:any) => {

          console.log( resp );

          if(!resp.hotel_actualizado){
            this.alertMessage = 'Error al editar el Hotel';
          }else{
            // this.hotel = resp.hotel;
            this.alertMessage = 'El Hotel se ha editado con exito';
            // this._router.navigate(['/crud/hoteles-edit'], resp.hotel._id);

            //Subir la Imagen
            this._uploadService.makeFileRequest(this.url+'/upload-image-hotel/'+this.id, [], this.FilesToUpload, 'image')
            .then(
              (result)=>{
                this._router.navigate(['/crud/hoteles-list/1']);
              },
              (error)=>{
                console.log(error);
                this._router.navigate(['/crud/hoteles-list/1']);
              }
            )
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

  public FilesToUpload: Array<File>;

  fileChangeEvent(fileInput){
    this.FilesToUpload = <Array<File>>fileInput.target.files;
  }

}
