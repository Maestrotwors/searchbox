import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchText$ = new Subject();
  items = new BehaviorSubject([]);
  httpClient = inject(HttpClient);

  constructor() {
    this.searchText$
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((value) => {
          return this.getUsers(value as string);
        })
      )
      .subscribe(data => {
        this.saveValue(data);
      });
  }

  getUsers(searchText: string) {
    return this.httpClient.get(
      'https://demo.dataverse.org/api/search?q=' + searchText
    );
  }

  private saveValue(value: any) {
    if (value['status'] === "OK") {
      this.items.next(value['data']['items']);
    } else {
      this.items.next([]);
    }
  }
}
