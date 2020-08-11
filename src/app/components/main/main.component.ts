import { Component, OnInit, HostListener, } from '@angular/core';
import { MapIconOptions } from '../../icon';
import * as L from 'leaflet';
import { MapCreatorService } from '../../services/map-creator.service';
import data from '../../initialPoints.json';

import { Point } from '../../interfaces/point.model';
import { Icon } from '../../interfaces/icon.model';

import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public db: Point[];
  public selectedItemId: number;
  public idGenerator: number;
  public icon: Icon;
  public map: L.map;
  private lastSelectedMarker: any = {};
  private selectedId: number;


  constructor(private mapCreatorService: MapCreatorService) {
    this.db = data.db;
    this.icon = L.icon({
      iconAnchor: MapIconOptions.iconAnchor,
      iconSize: MapIconOptions.iconSize,
      iconUrl: MapIconOptions.mapIcon,
      shadowUrl: MapIconOptions.mapShadowIcon,
      shadowSize: MapIconOptions.shadowSize,
      shadowAnchor: MapIconOptions.shadowAnchor,
    });

  }
  @HostListener('window:mousedown', ['$event']) click(event) {
    if (this.lastSelectedMarker.marker) {
      this.lastSelectedMarker.marker._icon.src = '../../../assets/maps/marker-icon.png';
      if (event.srcElement.nodeName !== 'BUTTON') {
        this.selectedItemId = -1;
      }
    }
  }

  ngOnInit(): void {
    this.idGenerator = 3;
    this.map = this.mapCreatorService.initMap();
    this.initPoints();
  }

  initPoints() {
    this.db.forEach((item: Point, index: number) =>
      this.createPoint(item, true, index));
  }

  clickOnMap(event) {
    const node: any = event.originalEvent.target;
    if (node.className === 'leaflet-marker-icon leaflet-zoom-animated leaflet-interactive') {
      const index = this.findIndexInDB(this.db, this.selectedId);
      this.selectElem(this.db[index]);
    } else {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;
      const id = this.idGenerator++;
      const name = 'name' + id;
      const newPoint: Point = { name, id, lat, lng, marker: null, isFiltered: true };
      this.createPoint(newPoint, false, null);
    }
  }

  createPoint(item: Point, onInitStage: boolean, index: number) {
    const newMarker = new L.marker([item.lat, item.lng], { icon: this.icon, title: name })
      .addTo(this.map)
      .on('mouseup', e => { this.map.setView(e.target.getLatLng()); this.selectedId = item.id; });
    this.map.addLayer(newMarker);
    item.marker = newMarker;
    if (onInitStage) {
      this.db[index].marker = newMarker;
    } else {
      this.db.push(item);
    }
  }

  selectElem(item: Point) {
    item.marker._icon.src = '../../../assets/maps/marker-icon-selected.png';
    this.selectedItemId = item.id;
    this.lastSelectedMarker = item;
    this.map.setView(item.marker.getLatLng());
  }

  deleteElem(item: Point) {
    const index = this.findIndexInDB(this.db, item.id);
    this.map.removeLayer(this.db[index].marker);
    this.db.splice(index, 1);
    this.lastSelectedMarker = {};
  }

  findIndexInDB(db: Point[], id: number) {
    for (let i = 0; i < db.length; i += 1) {
      if (db[i].id === id) {
        return i;
      }
    }
  }

}
