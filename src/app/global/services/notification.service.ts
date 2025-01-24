import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastInterface } from '../interfaces/ToastInterface';


@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public propsNoty: ToastInterface = {}

  constructor(private messageService: MessageService) { }

  topRight(props: ToastInterface) {
    this.propsNoty = { ...props, key: 'tr', life: 3000 }
    return this
  }

  topLeft(props: ToastInterface) {
    this.propsNoty = { ...props, key: 'tl', life: 3000 }
    return this
  }

  bottomLeft(props: ToastInterface) {
    this.propsNoty = { ...props, key: 'bl', life: 3000 }
    return this
  }

  bottomRight(props: ToastInterface) {
    this.propsNoty = { ...props, key: 'br', life: 3000 }
    return this
  }

  show() {
    this.messageService.add({ ...this.propsNoty });
  }
}