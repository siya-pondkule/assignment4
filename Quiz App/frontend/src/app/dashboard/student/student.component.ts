import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
})
export class StudentComponent {
  constructor(private router: Router) {}

  navigateToTest() {
    this.router.navigate(['/give-test']);
  }
}
