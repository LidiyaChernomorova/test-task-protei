import { Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';

import { Click } from '../../interfaces/click.model';
import {Point} from '../../interfaces/point.model';
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

  constructor() {
    this.onClickHandler = (evt) => this.onMapClick(evt);
  }

  public ngAfterViewInit(): void {
    this.initMap();
    this.initMapHandlers();
  }

  public ngOnDestroy(): void {
    this.map.off('click', this.onClickHandler);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }


  selectOnMap(item: Point) {
    this.selectedPoint.emit(item);
  }

  deleteOnMap(item: Point) {
    this.deletedPoint.emit(item);
  }

  // addOnMap() {
  //   this.addPoint.emit('?');
  // }

  protected initMapHandlers(): void {
    this.map.on('click', this.onClickHandler);
  }

  protected onMapClick(evt: any): void {
    const node: any = evt.originalEvent.target;
    console.log('Map click on: ', evt.originalEvent.target.title);
    this.addPoint.emit(evt.latlng);
    // this.markerService.getValue().subscribe((value) => {
    // });

    // if (target.className === 'leaflet-marker-icon leaflet-zoom-animated leaflet-interactive') {
    //   this.markerService.setValue(evt.originalEvent.target.title, target);
    // } else {
    //   this.markerService.makeMarkers(this.map, evt.latlng);
    // }
  }
}
