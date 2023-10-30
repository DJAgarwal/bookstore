import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.toastr.error('Please enter valid details.');
      return;
    }

    const user = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    };

    this.loginService.loginUser(user).subscribe(
      (response) => {
        const token = response.token;
        localStorage.setItem('access_token', token);
        this.router.navigate(['/book-listing']);
      },
      (error) => {
        if (error.status === 401) {
          this.toastr.error(error.error.message);
        } if (error.status === 422) {
          const errorMessages = error.error.errors;
          const errors = Object.keys(errorMessages).map((key) => {
            return errorMessages[key].join(', ');
          });
          errors.forEach(errorMessage => {
            this.toastr.error(errorMessage);
          });
        } else {
          this.toastr.error('Please enter valid details.');
        }
      }
    );
  }
}