import { Component, OnInit, HostListener, } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { MapIconOptions } from '../../icon';
import * as L from 'leaflet';
import { MapCreatorService } from '../../services/map-creator.service';


import { Point } from '../../interfaces/point.model';
import { Icon } from '../../interfaces/icon.model';
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
  private lastNode = {};
  private selectedId: number;


  constructor(private serviceService: ServiceService, private mapCreatorService: MapCreatorService) {
    this.db = this.serviceService.db;
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
    const node = event.target;
    if (this.lastNode.className === 'leaflet-marker-icon leaflet-zoom-animated leaflet-interactive') {
      this.lastNode.src = '../../../assets/maps/marker-icon.png';
    }
    this.lastNode = node;
  }

  ngOnInit(): void {
    this.idGenerator = 3;
    this.map = this.mapCreatorService.initMap();
    this.db.forEach((item, index) =>
      this.createPoint(item, true, index)
    )

  }

  clickOnMap(evt) {
    const node: any = evt.originalEvent.target;
    if (node.className === 'leaflet-marker-icon leaflet-zoom-animated leaflet-interactive') {
      node.src = '../../../assets/maps/marker-icon-selected.png';
      const index = this.findIndexInDB(this.db, this.selectedId);
      this.selectElem(this.db[index]);
    } else {
      const lat = evt.latlng.lat;
      const lng = evt.latlng.lng;
      const id = this.idGenerator++;
      const name = 'nana' + id;
      const newPoint: Point = { name, id, lat, lng, marker: null };
      this.createPoint(newPoint, false, null);
    }
  }

  createPoint(item, onInitStage, index) {
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
      this.selectedItemId = item.id;
    }

    deleteElem(item: Point) {
      const index = this.findIndexInDB(this.db, item.id);
      this.map.removeLayer(this.db[index].marker);
      this.db.splice(index, 1);
    }

    findIndexInDB(db: Point[], id: number) {
      for (let i = 0; i < db.length; i += 1) {
        if (db[i].id === id) {
          return i;
        }
      }
    }
  }
