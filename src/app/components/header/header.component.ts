import { Component, OnInit } from '@angular/core';
import { FirebaseService, IUser } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit 
{
  email: string = "";
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void 
  {
    this.firebaseService.currentUser.subscribe((user: IUser) =>
    {
      this.email = user.email;
    })
  }

  logout()
  {
    this.firebaseService.logout();
  }

}
