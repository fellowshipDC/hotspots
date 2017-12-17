import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import * as d3 from 'd3';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.styl']
})
export class QuestionsComponent implements OnInit {

  gid: any;
  @Input() data;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    /*d3.csv('./assets/hotspotscut.csv', (error,data) => {
      this.data = data.filter((the) => {
        this.route.params.subscribe(params => { this.gid = params['gid']});
        return the.id == this.gid})[0];

      });
    }*/
  }

}
