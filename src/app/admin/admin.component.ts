import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../global/services/notification.service';
import { IntUser } from '../interfaces/Auth/UserInterface';


@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  user!: IntUser | null
  router = inject(Router)
  items: MenuItem[] | undefined = [
    {
      label: 'Catalogs',
      items: [
        {
          label: 'Users',
          icon: 'pi pi-user',
          route: 'users'
        },
        {
          label: 'Categories',
          icon: 'pi pi-table',
          route: 'categories'
        },
        {
          label: 'Products',
          icon: 'pi pi-box',
          route: 'products'
        }
      ]
    },
  ];

  constructor(private _authService: AuthService, private _noty: NotificationService) {
  }

  ngOnInit() {
    this.user = this._authService.getUser()
    this._authService.sessionClosed.subscribe((lang) => {
      if (lang)
        this._noty.topRight({ severity: 'warn', summary: 'THE SESSION WAS CLOSED', detail: 'Please login again' })
          .show()
    })
  }
}
