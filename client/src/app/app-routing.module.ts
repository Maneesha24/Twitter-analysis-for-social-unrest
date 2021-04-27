import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'statistics',
    pathMatch: 'full',
    loadChildren: () => import('./modules/statistics/statistics.module').then((m) => m.StatisticsModule)
  },
  {
    path: 'notifications',
    pathMatch: 'full',
    loadChildren: () => import('./modules/notifications/notifications.module').then((m) => m.NotificationsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
