import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() db;
  @Input() selectedItemName;
  @Output() selectedItem = new EventEmitter<string>();
  @Output() deletedItem = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  selectOnList(item) {
    this.selectedItem.emit(item);
  }

  deleteOnList(item) {
    this.deletedItem.emit(item);
  }
}
