import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit 
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
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(18)]],
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
    this.firebaseService.emailSignup(email, password)
    .then((data) =>
    {
      this.loading = false;
    })
    .catch(err => 
    {
      this.loading = false;
      this.errMessage = err;
    })
  }
}
