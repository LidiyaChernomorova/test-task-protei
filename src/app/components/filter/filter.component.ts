import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Point } from '../../interfaces/point.model';
import { FilterValue } from '../../interfaces/filter-value.model';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  @Input() db: Point[];
  @Input() map: L.map;
  @Output() initPointsInFilter = new EventEmitter<any>();

  public filterForm: FormGroup;
  public filterPoint: AbstractControl;

  constructor(formBuilder: FormBuilder) {
    this.filterForm = formBuilder.group({
      'filterPoint': ['', Validators.compose([
        Validators.required, this.filterPointValidator])]
    });

    this.filterPoint = this.filterForm.controls['filterPoint'];
  }

  filter(filterValue: FilterValue) {
    this.db.forEach((item: Point) => {
      this.map.removeLayer(item.marker);
      if (item.name.match(filterValue.filterPoint)) {
        this.map.addLayer(item.marker);
        item.isFiltered = true;
      } else {
        item.isFiltered = false;
      }
    });
  }

  resetFilter() {
    this.db.forEach((item: Point, index: number) => {
      this.map.removeLayer(this.db[index].marker);
      item.isFiltered = true;
    });
    this.initPointsInFilter.emit();
  }


  filterPointValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value.match(/^name/)) {
      return { invalidFilterPoint: true };
    }
  }

}
