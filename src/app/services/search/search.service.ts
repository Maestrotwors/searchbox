import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  httpClient = inject(HttpClient);

  getUsers(searchText: string) {
    return this.httpClient.get(
      'https://demo.dataverse.org/api/search?q=' + searchText
    );
  }
}
