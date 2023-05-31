import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';


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
  searchForm = new FormGroup({
    searchValue: new FormControl(''),
  });
  
  @Input() items: { name: string }[] | null = [];

  constructor() {
    this.searchForm.controls.searchValue.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((query) => {
        this.onChange(query);
        this.onTouch();
      });
  }

  onChange: any = (input: string) => {};

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
