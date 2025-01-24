import { Component, OnInit, signal } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ErrorInterface } from '../../global/interfaces/ErrorInterface';
import { NotificationService } from '../../global/services/notification.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loading = signal(false);
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('admin@system.com', [Validators.required, Validators.email]),
    password: new FormControl('administrator', Validators.required),
  });

  constructor(private _authService: AuthService, private _noty: NotificationService, private _router: Router) { }

  ngOnInit() { }

  onSubmit() {
    this.loading.set(true)
    this._authService.login(this.loginForm.value)
      .subscribe({
        next: ({ data, message }) => {
          this._authService.setToken(data.token)
          this._noty.bottomRight({ severity: 'success', summary: message }).show()
          this._router.navigate(['/dashboard'])
        },
        error: (error: ErrorInterface) => {
          this._noty.bottomRight({ severity: 'warn', summary: error.message, detail: error.errors[0] || '' }).show()
        },
        complete: () => {
          this.loading.update(l => false)
        }
      })
  }

}
