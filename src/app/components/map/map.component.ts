import { Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';

import { Click } from '../../interfaces/click.model';
import { Point } from '../../interfaces/point.model';
import * as L from 'leaflet';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnDestroy {

  @Input() db: Point[];
  @Input() map: L.map;
  @Output() selectedPoint = new EventEmitter<Point>();
  @Output() deletedPoint = new EventEmitter<Point>();
  @Output() clickOnMap = new EventEmitter<Point>();

  protected onClickHandler: Click;


  constructor() {
    this.onClickHandler = (evt) => this.addOnMap(evt);
  }

  public ngAfterViewInit(): void {
    this.initMapHandlers();
  }

  public ngOnDestroy(): void {
    this.map.off('click', this.onClickHandler);
  }

  selectOnMap(item: Point) {
    this.selectedPoint.emit(item);
  }

  deleteOnMap(item: Point) {
    this.deletedPoint.emit(item);
  }

  addOnMap(evt: any): void {
    this.clickOnMap.emit(evt);
  }

  initMapHandlers(): void {
    this.map.on('click', this.onClickHandler);
  }

}
