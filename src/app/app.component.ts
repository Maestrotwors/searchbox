import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SearchService } from './services/search/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  searchService = inject(SearchService);

  searchBoxValueChanged(value: string | null) {
    this.searchService.searchText$.next(value);
  }
}
