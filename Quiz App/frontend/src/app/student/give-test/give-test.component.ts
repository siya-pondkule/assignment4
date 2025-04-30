import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-give-test',
  templateUrl: './give-test.component.html',
})
export class GiveTestComponent implements OnInit {
  questions: any[] = [];
  selectedAnswers: { [key: number]: string } = {};
  score: number | null = null;
  studentName = 'Student1'; // Change to dynamically fetch logged-in student name
  currentQuestionIndex: number = 0;

  ngOnInit() {
    axios.get('http://localhost:5000/questions')
      .then(response => {
        this.questions = response.data.map((q: any) => ({
          ...q,
          options: [q.option1, q.option2, q.option3, q.option4]
        }));
      })
      .catch(error => console.error(error));
  }

  selectAnswer(index: number, answer: string) {
    this.selectedAnswers[index] = answer;
  }

  clearAnswer() {
    delete this.selectedAnswers[this.currentQuestionIndex];
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  submitTest() {
    let score = 0;
    this.questions.forEach((q, index) => {
      if (this.selectedAnswers[index] === q.correct_answer) {
        score++;
      }
    });
    this.score = score;

    // Send student name and score to backend
    axios.post('http://localhost:5000/submit-score', { name: this.studentName, score })
      .then(() => alert('Score submitted successfully'))
      .catch(error => console.error(error));
  }
}
