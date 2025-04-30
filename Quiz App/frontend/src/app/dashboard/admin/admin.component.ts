import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  totalStudents: number = 0;
  highestScore: number = 0;
  lowestScore: number = 0;
  questions: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.fetchStudentScores();
    this.fetchQuestions();
  }

  navigateToCreateTest() {
    this.router.navigate(['/create-test']);
  }

  fetchStudentScores() {
    axios.get('http://localhost:5000/student-scores')
      .then(response => {
        this.totalStudents = response.data.total_students || 0;
        this.highestScore = response.data.highest_score || 0;
        this.lowestScore = response.data.lowest_score || 0;
      })
      .catch(error => console.error(error));
  }

  fetchQuestions() {
    axios.get('http://localhost:5000/questions')
      .then(response => {
        this.questions = response.data;
      })
      .catch(error => console.error(error));
  }

  deleteQuestion(id: number) {
    if (confirm("Are you sure you want to delete this question?")) {
      axios.delete(`http://localhost:5000/delete-question/${id}`)
        .then(() => {
          this.fetchQuestions(); // Refresh question list
        })
        .catch(error => console.error(error));
    }
  }

  updateQuestion(id: number) {
    const newQuestion = prompt("Enter the updated question:");
    if (newQuestion) {
      axios.put(`http://localhost:5000/update-question/${id}`, { question: newQuestion })
        .then(() => {
          this.fetchQuestions(); // Refresh question list
        })
        .catch(error => console.error(error));
    }
  }
}
