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
        
        // items.sort((a,b)=>{
        //   return(b.availability.split(', ').indexOf(days[filter.getDay()])-a.availability.split(', ').indexOf(days[filter.getDay()]))
        // })
        let ar=new Array();
        for(let item of items){
          if(item.availability.split(', ').indexOf(days[filter.getDay()])==-1)
            ar.push(item);
        }
        for(let item of ar){
          items.splice(items.indexOf(item),1);
          items.push(item);
        }
        
        filteredCount['count']=items.length;
        return items;
        // return items.filter((item) =>{
        //   let ar=item.availability.split(', ');
        //   if(reverse)
        //   return ar.indexOf(days[filter.getDay()])==-1;
        //   else
        //   return ar.indexOf(days[filter.getDay()])!==-1;
        // });
    }
}
2-3