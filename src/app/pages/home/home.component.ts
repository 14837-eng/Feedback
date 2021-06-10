import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit 
{
  formGroup: FormGroup;
  message: string;
  errMessage: string;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              private questionService: QuestionsService) { }

  ngOnInit(): void 
  {
    this.formGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(36)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required ]],
      question: ['', [Validators.required]],
    })
  }

  getControlValue(controlName: string)
  {
    return this.formGroup.controls[controlName].value;
  }

  onSubm()
  {
    if(this.formGroup.invalid) return;
    this.errMessage = this.message = '';
    let name = this.getControlValue('name'),
        email = this.getControlValue('email'),
        phone =  this.getControlValue('phone'),
        question = this.getControlValue('question');
    this.loading = true;
    this.questionService.createQuestions(
    {
      name, email, phone, question
    })
    .then(v => 
    {
      this.loading = false;
      this.message = 'Готово!';
    })
    .catch(err => 
    {
      this.loading = false;
      this.errMessage = err;
    })
  }
}
