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
        /*
        Loop through candidates if any property is present in items return true, 
        else filter out
        */
           
        for(let i=0;i<candidates.length;i++){
          candidates[i]=candidates[i].toString().toLowerCase();
        }
        
        return items.filter((item) =>{
            if(!item.hasOwnProperty(prop.toString()))
              return false;      
            if(candidates.indexOf(item[prop.toString()].toString().toLowerCase())!==-1)
              return true;
          return false;
        });
    }
}