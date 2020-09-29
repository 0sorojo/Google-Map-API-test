import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { LaunchComponent } from './launch/launch.component';

const routes: Routes = [
  { path: 'launch', component: LaunchComponent },
  { path: 'map', component: MapComponent },
  { path: '', redirectTo: '/launch', pathMatch: 'full' },
  { path: '**', component: LaunchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
