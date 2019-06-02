import { Component, OnInit } from '@angular/core';
import {CarDataService} from '../car-data.service';
import {FormControl,NgForm} from '@angular/forms';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {
   car_data:any[];          //Car Data from Api
   filtered_car_data:any[]; //Filtered Car Data 
   filteredCount={count:0}; //To Store length of filtered_car_data after pipe transforms
   
   /*Data received from previous page through Service*/
   date:Date;
   location:string;
   
   /*Flag to sort by price*/
   sort_flag:number;  //1->Ascending, -1=>Descending
   
   /*Const*/
   days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
   transmission = ["Manual","Automatic"];   
   car_Type = ["SUV","Hatchback","Sedan","Mini SUV"];
   fuel_Type  = ["Petrol","Diesel"];
   
   /*Input data to modify results*/
   locationFilter:string;             //User typed new location
   location_options: string[];        //All Loations for autocomplete input
   filtered_location_options:string[];//filtered Locations for autocomplete input 
   dateFilter:Date;                   //user typed new date
   
   transmission_checked_array:string[]; //To Store Checkbox checked- Values for Transmission
   car_Type_checked_array:string[];     //To Store Checkbox checked- Values for car_Type
   fuel_Type_checked_array:string[];    //To Store Checkbox checked- Values for fuel_Type
   
   filter_transmission:string[];   //results of checkbox filter, sent to pipe transfrom
   filter_car_Type:string[];       //results of checkbox filter, sent to pipe transfrom
   filter_fuel_Type:string[];      //results of checkbox filter, sent to pipe transfrom
       
   
   /*Data for paginator*/
   pageNo=0;   
   pageIndex:number = 0;
   pageSize:number = 6;
   lowValue:number = 0;
   highValue:number = 6; 
          
   constructor(private car_data_service:CarDataService) {}
   
   ngOnInit() {     
     /*Get Search params from previous page via Service*/
     this.getParamsFromService();
     
     /*Initialise filters checkbox*/
     this.InitFiltersCheckBoxes();
     
     /*Get All Cars Data from API via Service*/
     this.getCarData();    
   }
   
   /*Function to Get Search params from previous page via Service*/
   getParamsFromService(){
     this.date=this.car_data_service.getQueryParams().date;
     this.location=this.car_data_service.getQueryParams().location;     
   }
   
   /*Function to Initialise filters checkbox*/
   InitFiltersCheckBoxes(){
     this.filter_car_Type=[...this.car_Type];         //All car_Types
     this.filter_fuel_Type=[...this.fuel_Type];       //All fuel_Types
     this.filter_transmission=[...this.transmission]; //All transmission types
   }
   
   /*Function to Get All Cars Data from API via Service*/
   getCarData(){
     /*Get Car Data from Service which internally calls API*/
     this.car_data_service.getCarData().subscribe(data => {
           this.car_data = Array.from(Object.values(data));
           this.filtered_car_data=[...this.car_data];
           
           /*Set all available locations for autocomplete input box */
           this.InitLocationAutoComplete();          
         });
   }
   
   /*Function to Initialise autocomplete drop down for locations input */
   InitLocationAutoComplete(){
     /*Filter unique locations from car-data */
     this.location_options = Array.from(new Set(this.car_data.map(item => item.location)));
     
     /*set default filteredOptions as all available locations*/
     this.filtered_location_options=(this.location_options);
     
     /*Initialise location input to current location */
     this.locationFilter=this.location;
     
     /*Initialise dateFilter to current date*/
     this.dateFilter=this.date;
     
   }      
   
   /*Called on input of autocomplete location input box to filter locations dropdown*/
   do_Filter(){
     this.filtered_location_options = this.location_options.filter(option=>{
       return (option.toLowerCase()).search(this.locationFilter.toLowerCase())>-1;
     });
   } 
   
   /*Sort filtered_car_data by price , Called on click sort (high to low / low to high)*/
   SortByPrice(flag){
     /* If same sort option is pressed again , reset data to default(unsorted) */
     if(this.sort_flag&&this.sort_flag.toString()==flag.toString()){
       this.filtered_car_data=[...this.car_data];
       this.sort_flag=0;
       return;
     }
     else{
       /*
       Sort data by price
       flag=1 ->ascending
       flag=-1->descending
       */
         this.sort_flag=flag;         
         this.filtered_car_data.sort((a,b)=>{
           return flag*(a.price-b.price);
         });   
     }     
   }
   
   /* Called on click Apply Filters button*/
   ApplyFilters(form:NgForm){
     /* If location is invalid, set to current location*/
     if(this.location_options.indexOf(this.locationFilter)==-1)
        this.locationFilter=this.location;
     if(form.valid){
              
       /*Share Updated data to Service*/
       this.car_data_service.setQueryParams({date:this.dateFilter,location:this.locationFilter});
      
       /*Get Updated Data From Service*/
       this.getParamsFromService();  
                
        /*Store checkbox checked values array as filtered values*/
       if(this.car_Type_checked_array)
          this.filter_car_Type=[...this.car_Type_checked_array];
       if(this.fuel_Type_checked_array)
          this.filter_fuel_Type=[...this.fuel_Type_checked_array];
       if(this.transmission_checked_array)
          this.filter_transmission=[...this.transmission_checked_array];       
     }
     
   }
   
   /* Called on change of checkbox*/
   addCheckBox(chkbx,flag){
     //flag=[0,1,2]=>[transmission,car_Type,fuel_Type]
     switch(flag){
       case 0:
          if(chkbx.checked){
            if(this.transmission_checked_array==null)
                this.transmission_checked_array=new Array();
            // Push new value to array    
            this.transmission_checked_array.push(chkbx.source.value.toString().toLowerCase());
          }
          else{
            // Filter value from array    
            this.transmission_checked_array=this.transmission_checked_array.filter((item)=>{
              return item.toString().toLowerCase()!==chkbx.source.value.toString().toLowerCase();
            });
          }
       break;
       case 1:
         if(chkbx.checked){
           if(this.car_Type_checked_array==null)
              this.car_Type_checked_array=new Array();
            // Push new value to array    
           this.car_Type_checked_array.push(chkbx.source.value.toString().toLowerCase());
         }
         else{
           // Filter value from array    
           this.car_Type_checked_array=this.car_Type_checked_array.filter((item)=>{
             return item.toString().toLowerCase()!==chkbx.source.value.toString().toLowerCase();
           });
         }
       break;
       case 2:
       if(chkbx.checked){
         if(this.fuel_Type_checked_array==null)
            this.fuel_Type_checked_array=new Array();
            // Push new value to array        
         this.fuel_Type_checked_array.push(chkbx.source.value.toString().toLowerCase());
       }
       else{
         // Filter value from array    
         this.fuel_Type_checked_array=this.fuel_Type_checked_array.filter((item)=>{
           return item.toString().toLowerCase()!==chkbx.source.value.toString().toLowerCase();
         });
       }
       break;
       default:
     }
   }
   /*Called on page event of paginator*/
   getPaginatorData(event){
     if(event.pageIndex === this.pageNo + 1){
        this.lowValue = this.lowValue + this.pageSize;
        this.highValue =  this.highValue + this.pageSize;
       }
    else if(event.pageIndex === this.pageNo - 1){
       this.lowValue = this.lowValue - this.pageSize;
       this.highValue =  this.highValue - this.pageSize;
      }   
       this.pageNo = event.pageIndex;
     }
   
}