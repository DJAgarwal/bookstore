import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
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
      this.toastr.error('Please enter valid email and password.');
      return;
    }

    const user = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    };

    this.loginService.loginUser(user).subscribe(
      (response) => {
        
      },
      (error) => {
        if (error.status === 401) {
          this.toastr.error('Invalid email or password.');
        } else {
          this.toastr.error('Login failed! Please check your credentials.');
        }
      }
    );
  }
}