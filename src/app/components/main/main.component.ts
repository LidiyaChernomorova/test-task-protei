import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';

import {Point} from '../../interfaces/point.model';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public db: Point[];
  public selectedItemId: number;
  constructor(private serviceService: ServiceService) {
    this.db = this.serviceService.db;
  }

  ngOnInit(): void {
  }

  addPoint() {
    this.db.push({
      "name": "nana1",
      "id": 2,
      "lat": 51.508,
      "lng": -0.11
    })
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
}
