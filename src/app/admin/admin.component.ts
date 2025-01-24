import { Component, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  items: MenuItem[] | undefined = [
    {
      label: 'Documents',
      items: [
        {
          label: 'New',
          icon: 'pi pi-plus',
          shortcut: '⌘+N'
        },
        {
          label: 'Search',
          icon: 'pi pi-search',
          shortcut: '⌘+S'
        }
      ]
    },
    {
      label: 'Profile',
      items: [
        {
          label: 'Settings',
          icon: 'pi pi-cog',
          shortcut: '⌘+O'
        },
        {
          label: 'Messages',
          icon: 'pi pi-inbox',
          badge: '2'
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          shortcut: '⌘+Q'
        }
      ]
    },
  ];

  ngOnInit() {
  }
}
