import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  signIn() {
    axios.post('http://localhost:5000/signin', { email: this.email, password: this.password })
      .then(response => {
        const { role } = response.data;
        if (role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (role === 'student') {
          this.router.navigate(['/student-dashboard']);
        } else {
          alert('Invalid user role');
        }
      })
      .catch(error => {
        alert(error.response?.data?.message || 'Sign In failed. Please try again.');
      });
  }

  navigateToSignUp() {
    this.router.navigate(['./sign-up']);
  }
}
