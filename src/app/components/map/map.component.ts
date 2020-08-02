import { Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { MapCreatorService } from '../../services/map-creator.service';

import { Click } from '../../interfaces/click.model';
import { Point } from '../../interfaces/point.model';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnDestroy {

  @Input() db: Point[];
  @Input() selectedItemId: number;
  @Output() selectedPoint = new EventEmitter<Point>();
  @Output() deletedPoint = new EventEmitter<Point>();
  @Output() addPoint = new EventEmitter<Point>();

  protected onClickHandler: Click;
  private map: any;

  constructor(private mapCreatorService: MapCreatorService) {
    this.onClickHandler = (evt) => this.addOnMap(evt);
    this.map = mapCreatorService.map;
  }

  public ngAfterViewInit(): void {
    this.map = this.mapCreatorService.initMap();
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
      const node: any = evt.originalEvent.target;
      console.log('Map click on: ', evt.originalEvent.target.title);
      this.addPoint.emit(evt.latlng);
    }

  initMapHandlers(): void {
    this.map.on('click', this.onClickHandler);
  }

}
