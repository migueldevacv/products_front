import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { NotificationService } from './global/services/notification.service';

@NgModule({
  declarations: [],
  imports: [BrowserModule, CommonModule, AppRoutingModule, RouterOutlet, ReactiveFormsModule, Toast],
  providers: [MessageService, NotificationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
