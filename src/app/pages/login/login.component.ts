import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit 
{
  formGroup: FormGroup;
  formError: boolean = false;
  errMessage: string;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              private firebaseService: FirebaseService) { }

  ngOnInit(): void 
  {
    this.formGroup = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(36)]]
    });
  }

  onSubm()
  {
    this.errMessage = '';
    this.formError = false;
    if(this.formGroup.invalid) 
    {
      this.formError = true;
      return;
    }
    let email = this.formGroup.controls['email'].value, 
        password = this.formGroup.controls['password'].value;
    this.loading = true;
    this.firebaseService.signIn(email, password)
    .then((data) =>
    {
      this.loading = false;
    })
    .catch(err => 
    {
      this.loading = false;
      this.errMessage = "Неправильные данные! Проверьте введенное значение.";
    })
  }
}
