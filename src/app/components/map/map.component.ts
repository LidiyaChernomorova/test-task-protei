import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() db;
  @Input() selectedItemName;
  @Output() selectedPoint = new EventEmitter<string>();
  @Output() deletedPoint = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  selectOnMap(item) {
    this.selectedPoint.emit(item);
  }

  deleteOnMap(item) {
    this.deletedPoint.emit(item);
  }
}
