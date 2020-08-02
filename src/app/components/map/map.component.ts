import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {Point} from '../../interfaces/point.model';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() db: Point[];
  @Input() selectedItemId: number;
  @Output() selectedPoint = new EventEmitter<Point>();
  @Output() deletedPoint = new EventEmitter<Point>();

  constructor() { }

  ngOnInit(): void {
  }

  selectOnMap(item: Point) {
    this.selectedPoint.emit(item);
  }

  deleteOnMap(item: Point) {
    this.deletedPoint.emit(item);
  }
}
