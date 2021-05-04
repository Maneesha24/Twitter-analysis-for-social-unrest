import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    FormsModule
  ]
})
export class NotificationsModule { }
