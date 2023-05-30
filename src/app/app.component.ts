import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchService } from './services/search/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  searchService = inject(SearchService);
  searchForm = new FormGroup({
    searchText: new FormControl(''),
  });

  searchBoxValueChanged(value: string | null) {
    this.searchService.searchText$.next(value);
  }

  ngOnInit() {
    this.searchForm.controls.searchText.valueChanges.subscribe((data) => {
      this.searchBoxValueChanged(data);
    });

    this.searchForm.controls.searchText.setValue('first text');
  }
}
