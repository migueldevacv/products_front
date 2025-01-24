import { Component, signal } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NotificationService } from '../../global/services/notification.service';
import { Router } from '@angular/router';
import { ErrorInterface } from '../../global/interfaces/ErrorInterface';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  loading = signal(false);
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('admin@system.com', [Validators.required, Validators.email]),
    password: new FormControl('administrator', Validators.required),
  });

  constructor(private _authService: AuthService, private _noty: NotificationService, private _router: Router) { }

  ngOnInit() { }

  onSubmit() {
    this.loading.set(true)
    this._authService.register(this.registerForm.value)
      .subscribe({
        next: ({data, message}) => {
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
