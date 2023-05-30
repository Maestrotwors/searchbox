import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  // TODO: any
  @Input() items: any = [];
  
  searchForm = new FormGroup({
    searchValue: new FormControl(''),
  });

  constructor() {
    this.searchForm.controls.searchValue.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value: any) => {
        this.onChange(value);
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
