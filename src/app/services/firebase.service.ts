import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface IUser 
{
  name: string;
  email: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService 
{
  private IsAuthSubj = new BehaviorSubject<boolean>(false);
  isAuth = this.IsAuthSubj.asObservable();

  private currentUserSubj = new BehaviorSubject<IUser>({} as IUser)
  currentUser = this.currentUserSubj.asObservable();

  constructor(private firebaseAuth: AngularFireAuth,
              private router: Router) 
  { }

  signIn(email: string, password: string)
  {
    this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then((data: any)  => this.successAuth(data.user))
    .catch(err => {
      console.log('Something went wrong: ', err.message);
    });
  }

  emailSignup(email: string, password: string) 
  {
    this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then((data: any) => this.successAuth(data.user))
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
  }

  private successAuth(user)
  {
    this.currentUserSubj.next(
    {
      name: user.name,
      email: user.email
    })
    this.IsAuthSubj.next(true);
    this.router.navigate(['/home']);
  }

  logout() 
  {
    this.firebaseAuth.signOut().then(() => 
    {
      this.IsAuthSubj.next(false);
      this.currentUserSubj.next(null);
      this.router.navigate(['/home']);
    });
  }
}
