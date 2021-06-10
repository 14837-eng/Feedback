import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { IQuestion, QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit 
{
  email: string;
  list: IQuestion[] = [];
  constructor(private firebaseService: FirebaseService,
              private questionsService: QuestionsService) 
  { 
    this.firebaseService.currentUser.subscribe(user => this.email = user.email);
  }

  ngOnInit(): void 
  {
    this.questionsService.getQuestions()
    .subscribe(data => 
    {
      this.list = data.map((question: any) =>
      {
        const data: IQuestion = question.payload.doc.data();
        return { 
          email: data.email,
          phone: data.phone,
          question: data.question,
          name: data.name
        };
      })
      .filter((question: IQuestion) => question.email === this.email)
    })
  }

}
