import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortingService {
  sortProperty: string = 'id';
  sortOrder = 1;

  constructor() { }

  sortBy(item:any, property: string) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    item = [...item.sort((a: any, b: any) => {
        // sort comparison function
        let result = 0;
        if (a[property] < b[property]) {
            result = -1;
        }
        if (a[property] > b[property]) {
            result = 1;
        }
        return result * this.sortOrder;
    })];
}

sortIcon(property: string) {
    if (property === this.sortProperty) {
        return this.sortOrder === 1 ? '☝️' : '👇';
    }
    return '';
}
}
