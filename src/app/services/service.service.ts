import { Injectable } from '@angular/core';
import data from '../initialPoints.json';

import { Point } from '../interfaces/point.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public db: Point[] = data.db;
  constructor() { }
}
