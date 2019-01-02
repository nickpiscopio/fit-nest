import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete-chips',
  templateUrl: './autocomplete-chips.component.html',
  styleUrls: ['./autocomplete-chips.component.sass']
})
export class AutocompleteChipsComponent {
  @Input() finalValues: any[];
  @Input() autocompleteValues: string[] = [];
  @Input() inputPlaceholderKey: string;

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  valueControl = new FormControl();
  filteredValues: Observable<string[]>;

  constructor() {
    this.filteredValues = this.valueControl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.autocompleteValues.slice()));
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add the value.
      if ((value || '').trim()) {
        this.finalValues.push(value.trim());
      }

      // Reset the input value.
      if (input) {
        input.value = '';
      }

      this.valueControl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.finalValues.indexOf(fruit);

    if (index >= 0) {
      this.finalValues.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.finalValues.push(event.option.viewValue);
    this.autocompleteInput.nativeElement.value = '';
    this.valueControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.autocompleteValues.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}
