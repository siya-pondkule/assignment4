import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
})
export class GenerateReportComponent implements OnInit {
  questions: any[] = [];

  ngOnInit() {
    axios.get('http://localhost:5000/questions')
      .then(response => {
        this.questions = response.data;
      })
      .catch(error => console.error(error));
  }
}
