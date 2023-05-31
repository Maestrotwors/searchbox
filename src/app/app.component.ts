import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  
  searchForm = new FormGroup({
    searchText: new FormControl(''),
  });

  constructor() {
    this.searchForm.controls.searchText.setValue('first text');
  }
}
