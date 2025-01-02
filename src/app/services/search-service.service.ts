import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchServiceService {
  constructor() {}
  matchSearch(array: any, value: string, columns: string[]): boolean {
    const lowerCaseQuery = value.toLowerCase();
    for (const column of columns) {
      if (array?.[column]?.toLowerCase().includes(lowerCaseQuery)) {
        return true;
      }
    }
    return false;
  }
}
