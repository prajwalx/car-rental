import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchFilter',
    pure: false
})
export class SearchBoxPipe implements PipeTransform {
    transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter((item) =>{
          for(let val of Object.values(item)){
            if(val.toString().toLowerCase().indexOf(filter.toLowerCase())!==-1)
            return true;
          }
          return false;
        });
    }
}