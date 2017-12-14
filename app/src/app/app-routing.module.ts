import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DonutsComponent } from './donuts/donuts.component';
import { ScatterComponent } from './scatter/scatter.component';
import { TreemapComponent } from './treemap/treemap.component';
import { QuestionsComponent } from './questions/questions.component';
import { GmapComponent } from './gmap/gmap.component';




const routes: Routes = [

  {
    path: 'donuts',
    component: DonutsComponent
  },
  {
    path: 'scatter',
    component: ScatterComponent
  },
  {
    path: 'treemap',
    component: TreemapComponent
  },
  {
    path: 'questions',
    component: QuestionsComponent
  },
  {
    path: 'gmap',
    component: GmapComponent
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
