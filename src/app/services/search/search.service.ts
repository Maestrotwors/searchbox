import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { catchError, map, Observable} from 'rxjs';
import { ISearchUserResponse } from 'src/app/interfaces/iSearch.interface';
import { IUser } from 'src/app/interfaces/user.interface';


@Injectable({
  providedIn: 'root',
})
export class SearchService {
  httpClient = inject(HttpClient);

  searchUsers(searchText: string): Observable<IUser[]> {
    return this.httpClient
      .get<ISearchUserResponse>(
        'https://demo.dataverse.org/api/search?q=' + searchText
      )
      .pipe(
        map((response) => {
          if (response.status === 'OK') {
            return response.data.items;
          }
          return [];
        }),
        catchError((err) => {
          return [];
        })
      );
  }
}
