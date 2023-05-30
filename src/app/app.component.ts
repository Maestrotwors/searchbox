import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchService } from './services/search/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  searchService = inject(SearchService);
  searchForm = new FormGroup({
    searchText: new FormControl(''),
  });

  searchBoxValueChanged(value: string | null) {
    this.searchService.searchText$.next(value);
  }

  contructor() {
    this.searchForm.controls.searchText.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        this.searchBoxValueChanged(data);
      });

    this.searchForm.controls.searchText.setValue('first text');
  }
}
