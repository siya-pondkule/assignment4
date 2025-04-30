import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],

})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  role = 'student';

  constructor(private router: Router) {}

  signUp() {
    axios.post('http://localhost:5000/signup', { name: this.name, email: this.email, password: this.password, role: this.role })
      .then(() => {
        alert('Sign up successful! Redirecting to Sign In...');
        this.router.navigate(['/signin']);
      })
      .catch(error => alert(error.response.data.message));
  }
}
