import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { MapService } from '../services/map.service';
import { Subscription } from 'rxjs/Subscription';

import * as d3 from 'd3';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.styl']
})
export class QuestionsComponent implements OnInit {

  gid: any;

  subscription: Subscription;

  text = 'fsdfsd';

  data: object;

  constructor(private mapService: MapService) { }

  ngOnInit() {

    this.subscription = this.mapService.data$.subscribe(
      data => {
        console.log(data);
        this.data = data;
      });

    /*d3.csv('./assets/hotspotscut.csv', (error,data) => {
      this.data = data.filter((the) => {
        this.route.params.subscribe(params => { this.gid = params['gid']});
        return the.id == this.gid})[0];

      });
    }*/
  }

}
