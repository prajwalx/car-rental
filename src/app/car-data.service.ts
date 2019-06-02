import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarDataService {  
  
  //Replace with https://api.sheety.co/311576ae-321a-43e3-9a5b-61b3ac373d85 OR any real API
  data_Url='assets/car-data/car-data.json';
  
  /*For Sharing data between pages/components */
  location:string;
  date:Date;
  
  constructor(private http:HttpClient) { }
  
  /*
    Get Data from URL
  */
  getCarData(){
    return this.http.get(this.data_Url);
  }
  /*
  setter for shared data
  */
  setQueryParams(obj){
    this.date=obj.date;
    this.location=obj.location;
  }
  /*
  Getter for shared data
  */
  getQueryParams(){
      return {
        date:this.date,
        location:this.location
      };
  }
}
