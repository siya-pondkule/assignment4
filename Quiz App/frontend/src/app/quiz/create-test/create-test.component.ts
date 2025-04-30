import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
})
export class CreateTestComponent {
  question = '';
  option1 = '';
  option2 = '';
  option3 = '';
  option4 = '';
  correctAnswer = '';
  image: File | null = null;
  questions: any[] = [];

  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }

  addQuestion() {
    const newQuestion = {
      question: this.question,
      options: [this.option1, this.option2, this.option3, this.option4],
      correctAnswer: this.correctAnswer,
      image: this.image ? this.image.name : null,
    };

    this.questions.push(newQuestion);
    this.clearForm();
  }

  clearForm() {
    this.question = '';
    this.option1 = '';
    this.option2 = '';
    this.option3 = '';
    this.option4 = '';
    this.correctAnswer = '';
    this.image = null;
  }

  saveQuiz() {
    axios.post('http://localhost:5000/save-quiz', { questions: this.questions })
      .then(() => alert('Quiz saved successfully'))
      .catch(error => console.error(error));
  }
}
