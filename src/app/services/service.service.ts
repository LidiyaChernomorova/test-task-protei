import { Injectable } from '@angular/core';
import data from '../initialPoints.json';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public db = data.db;
  constructor() { }
}
