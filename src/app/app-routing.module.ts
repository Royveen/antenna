import { PointingDirectionComponent } from './pointing-direction/pointing-direction.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { FindingComponent } from './finding/finding.component';
import { PointingUpComponent } from './pointing-up/pointing-up.component';
import { CongratulationsComponent } from './congratulations/congratulations.component';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'finding', component: FindingComponent },
  { path: 'pointing', component: PointingDirectionComponent },
  { path: 'pointingup', component: PointingUpComponent },
  { path: 'congrats', component: CongratulationsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
