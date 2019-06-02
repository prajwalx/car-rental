import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'DayFilter',
    pure: false
})
export class DayFilterPipe implements PipeTransform {
    transform(items: any[], filter: Date,filteredCount:object): any {
        if (!items || !filter) {
            if(items)
              filteredCount['count']=items.length;
            return items;
        }
        const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        
        //Order items by day => Items not available should come at last of array
        
        //Store Not Available items in array ar
        let ar=new Array();
        for(let item of items){
          if(item.availability.split(', ').indexOf(days[filter.getDay()])==-1)
            ar.push(item);
        }
        //Now move not available items to rear of items array
        for(let item of ar){
          items.splice(items.indexOf(item),1);
          items.push(item);
        }
        
        /* For return length of array after pipe(s) transforms*/
        filteredCount['count']=items.length;
        return items;
        
    }
}