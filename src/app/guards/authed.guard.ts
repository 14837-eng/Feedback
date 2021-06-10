import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthedGuard implements CanActivate 
{
  private auth: boolean = false;
  constructor(private firebaseService: FirebaseService,
              private router: Router) 
  {
    this.firebaseService.isAuth.subscribe(auth => this.auth = auth);
  }

  canActivate()
  {
    if(!this.auth) this.router.navigate(['/home']);
    return !!this.auth;
  }
  
}
