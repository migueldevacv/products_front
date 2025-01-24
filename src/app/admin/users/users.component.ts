import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ChangeDetectorRef, Component, Input, OnInit, signal, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../services/users.service';
import { NotificationService } from '../../global/services/notification.service';
import { ErrorInterface } from '../../global/interfaces/ErrorInterface';
import { IntUser } from '../../interfaces/Auth/UserInterface';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [UsersService, MessageService, ConfirmationService,]
})
export class UsersComponent {
  statuses = [{ label: 'ACTIVE', value: 1 }, { label: 'INACTIVE', value: 0 }];
  loadingTable = signal(false);
  userDialog: boolean = false;
  users!: IntUser[];
  submitted = signal(false);
  loading = signal(false);
  @Input() user!: IntUser;

  ngOnInit(): void {
    this.getUsers()
  }


  constructor(
    private _usersService: UsersService,
    private _confirmationService: ConfirmationService,
    private _noty: NotificationService
  ) {
  }

  exportCSV() {/* this.dt.exportCSV(); */ }

  getUsers() {
    this.loadingTable.set(true)
    this._usersService.get().subscribe(({ data }) => {
      this.loadingTable.update(l => false)
      this.users = data;
    });
  }

  openNew() {
    this.user = {} as IntUser;
    this.userDialog = true;
  }

  editUser(user: IntUser) {
    this.user = { ...user };
    this.userDialog = true;
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted.set(false);
  }

  deleteUser(user: IntUser) {
    this._confirmationService.confirm({
      message: `Are you sure you want to ${user.status ? 'deactivate' : 'activate'} ` + user.email + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (user.id)
          this._usersService.delete(user.id).subscribe({
            next: ({ message }) => {
              this._noty.bottomRight({ severity: 'success', summary: message }).show()
              this.getUsers()
              this.hideDialog()
            },
            error: (error: ErrorInterface) => {
              this._noty.bottomRight({ severity: 'warn', summary: error.message, detail: error.errors[0] || '' }).show()
            }
          });
      }
    });
  }

  getSeverity = (status: number) => status === 1 ? 'success' : 'danger'

  saveUser() {
    this.submitted.set(true);
    this.loading.set(true);
    if (this.user.id) this.updateUser(this.user.id)
    else this.createUser()
  }

  createUser() {
    this._usersService.post(this.user).subscribe({
      next: ({ message }) => {
        this._noty.bottomRight({ severity: 'success', summary: message }).show()
        this.getUsers()
        this.hideDialog()
      },
      error: (error: ErrorInterface) => {
        this._noty.bottomRight({ severity: 'warn', summary: error.message, detail: error.errors[0] || '' }).show()
        this.loading.update(l => false)
      },
      complete: () => {
        this.loading.update(l => false)
      }
    });
  }

  updateUser(id: number) {
    this._usersService.update(id, this.user).subscribe({
      next: ({ message }) => {
        this._noty.bottomRight({ severity: 'success', summary: message }).show()
        this.getUsers()
        this.hideDialog()
      },
      error: (error: ErrorInterface) => {
        this._noty.bottomRight({ severity: 'warn', summary: error.message, detail: error.errors[0] || '' }).show()
        this.loading.update(l => false)
      },
      complete: () => {
        this.loading.update(l => false)
      }
    });
  }
}
