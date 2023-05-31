import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchService } from './services/search/search.service';
import { IUser } from './interfaces/user.interface';
import { BehaviorSubject, filter, skip, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  searchService = inject(SearchService);

  searchForm = new FormGroup({
    searchText: new FormControl('', Validators.required),
  });

  items = new BehaviorSubject<IUser[]>([]);

  constructor() {
    this.searchForm.controls.searchText.valueChanges
      .pipe(
        filter(() => {
          return this.searchForm.controls.searchText.valid ? true : false;
        }),
        switchMap((value) => {
          return this.searchService.searchUsers(value as string);
        })
      )
      .subscribe((users) => {
        this.items.next(users);
      });
  }
}
