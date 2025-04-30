import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('user');
  }

  signOut() {
    localStorage.removeItem('user'); // Clear user session
    this.isLoggedIn = false;
    this.router.navigate(['/signin']); // Redirect to sign-in page
  }
}
