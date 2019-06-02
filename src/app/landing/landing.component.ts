import { Component, OnInit } from '@angular/core';
import {FormControl,AbstractControl,ValidatorFn,NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {CarDataService} from '../car-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
    location_options: string[];//All Loations for autocomplete input
    filteredOptions:string[];//filtered Locations for autocomplete input  
    
    today=new Date();//todays date , default ngmodel for date Input
    date:Date;//User Selected Date
    
    location:string;//User typed location
    
    car_data:any[];//Car Data from Api
    
  constructor(private car_data_service:CarDataService,private router:Router) { }

  ngOnInit() {
    /*Set date to todays date default*/
    this.date=this.today;    
    /*Get Car data from API*/
    this.getCarData();    
  }
  getCarData(){
    /*Get Car Data from Service which internally calls API*/
    this.car_data_service.getCarData().subscribe(data => {
          this.car_data = Array.from(Object.values(data));
          /*Set all available locations for autocomplete input box */
          this.InitLocationAutoComplete();          
          console.log(this.car_data);
        });
  }
  
  InitLocationAutoComplete(){
    /*Filter unique locations from car-data */
    this.location_options = Array.from(new Set(this.car_data.map(item => item.location)));
    
    /*set default filteredOptions as all available locations*/
    this.filteredOptions=this.location_options;
    
    /*set default location as first value of Array*/
    this.location=this.filteredOptions[0];
    
  }
  
  /*Called on input of autocomplete location input box to filter locations dropdown*/
  do_Filter(){
    this.filteredOptions = this.location_options.filter(option=>{
      return (option.toLowerCase()).search(this.location.toLowerCase())>-1;
    });
  } 
   
  /*Called on Submit of form*/
  OnSubmit(form:NgForm){
    if(form.valid&&this.location_options.indexOf(this.location)>-1){
      console.log('valid');  
      /*Share data to Service*/
      this.car_data_service.setQueryParams({date:this.date,location:this.location});
      
      /*Navigate to DetailsPageComponent*/
      this.router.navigateByUrl('/details');
    }
    
  }
}
