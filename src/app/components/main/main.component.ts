import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public db;
  public selectedItemName;
  constructor(private serviceService: ServiceService) {
    this.db = serviceService.db;
  }

  ngOnInit(): void {
  }

  addPoint() {
    this.serviceService.db.push({ name: 'lol' })
  }

  selectElem(item) {
    this.selectedItemName = item.name;
  }

  deleteElem(item) {
    function findWithAttr(array, attr, value) {
      for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    }
    const index = findWithAttr(this.serviceService.db, 'id', item.id);
    this.serviceService.db.splice(index, 1);
  }
}
