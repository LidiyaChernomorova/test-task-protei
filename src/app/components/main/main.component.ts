import { Component, OnInit, Input } from '@angular/core';
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
  public map;

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

  ngOnInit(): void {
    this.idGenerator = 3;
    this.map = this.mapCreatorService.initMap();
  }

  addElem(LatLng) {
    const id = this.idGenerator++;
    const newPoint = {
      name: 'nana' + id,
      id,
      lat: LatLng.lat,
      lng: LatLng.lng
    };
    this.db.push(newPoint);

    makeMarker(this.map, this.icon, newPoint)
  }

  selectElem(item: Point) {
    this.selectedItemId = item.id;
  }

  deleteElem(item: Point) {
    function findWithAttr(array: Point[], attr: string, value: number) {
      for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    }
    const index = findWithAttr(this.db, 'id', item.id);
    this.db.splice(index, 1);
  }

  makeMarker(map: L.map, icon, point) {
    L.marker([point.lat, point.lng], { icon, title: point.name })
      .addTo(map)
      .on('mouseup', centerView);

    function centerView(e: any) {
      map.setView(e.target.getLatLng());
    }
  }
}
