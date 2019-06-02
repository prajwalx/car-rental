import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ObjectFilter',
    pure: false
})
export class ObjectFilterPipe implements PipeTransform {
    transform(items: any[], prop:string,candidates: any[]): any {
        if (!items || !prop || !candidates||candidates.length<=0) {
            return items;
        }
        // console.log(prop);
        // console.log(candidates);
        //Filter items which hasOwnProperty prop's value is present in candidate array
        
        // filter items array, items which match and return true will be
        // kept, false will be filtered out        
        for(let i=0;i<candidates.length;i++){
          candidates[i]=candidates[i].toString().toLowerCase();
        }
        
        return items.filter((item) =>{
          // for(let prop of Object.keys(filter)){
            if(!item.hasOwnProperty(prop.toString()))
            return false;      
            if(candidates.indexOf(item[prop.toString()].toString().toLowerCase())!==-1)
            return true;
          return false;
        });
    }
}