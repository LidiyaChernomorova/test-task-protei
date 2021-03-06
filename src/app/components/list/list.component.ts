import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import {Point} from '../../interfaces/point.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() db: Point[];
  @Input() selectedItemId: number;
  @Input() filterValues: string;
  @Output() selectedItem = new EventEmitter<Point>();
  @Output() deletedItem = new EventEmitter<Point>();

  constructor() { }

  ngOnInit(): void {
  }

  selectOnList(item: Point) {
    this.selectedItem.emit(item);
  }

  deleteOnList(item: Point) {
    this.deletedItem.emit(item);
  }

}
