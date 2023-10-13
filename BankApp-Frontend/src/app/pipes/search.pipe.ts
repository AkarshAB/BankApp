import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allTransactions:any[],searchTerm:string,propsName:string): any[] {
    const result :any[] = [];

    if (!allTransactions || searchTerm == ''|| propsName == ''){
      return allTransactions;
    }

    allTransactions.forEach((transactions:any) => {
      if(transactions[propsName].trim().toLowerCase().includes(searchTerm.trim().toLocaleLowerCase()))
      result.push(transactions)
    })
    return result;
  }

}
