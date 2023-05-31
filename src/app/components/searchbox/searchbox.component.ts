import { ChangeDetectionStrategy, Component, forwardRef, inject, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { SearchService } from 'src/app/services/search/search.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchboxComponent),
      multi: true,
    },
  ],
})
export class SearchboxComponent implements ControlValueAccessor {
  searchService = inject(SearchService);
  searchForm = new FormGroup({
    searchValue: new FormControl(''),
  });
  items = new BehaviorSubject([]);

  constructor() {
    this.searchForm.controls.searchValue.valueChanges
      .pipe(
        takeUntilDestroyed(),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((value) => {
          return this.searchService.getUsers(value as string);
        })
      )
      .subscribe((data: any) => {
        if (data['status'] === 'OK') {
          this.items.next(data['data']['items']);
        } else {
          this.items.next([]);
        }
        this.onChange(data);
        this.onTouch();
      });
  }

  onChange: any = (value: number) => {};

  onTouch: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(input: string) {
    this.searchForm.controls.searchValue.patchValue(input);
  }
}
