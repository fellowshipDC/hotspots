import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MapService {

  private dataSource = new Subject<object>();

  data$ = this.dataSource.asObservable();

  constructor() { }

  setData(data) {
    this.dataSource.next(data);
  }

}
