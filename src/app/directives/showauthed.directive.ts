import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Directive({
  selector: '[appShowAuthed]'
})
export class ShowauthedDirective implements OnInit
{
  condition: boolean;
  @Input() set appShowAuthed(condition: boolean)
  {
      this.condition = condition;
  }

  constructor(private firebaseSerivce: FirebaseService,
              private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) { }

  ngOnInit()
  {
    this.firebaseSerivce.isAuth.subscribe((auth) =>
    {
      this.viewContainerRef.clear();
      if(auth  && this.condition || !auth && !this.condition)
      {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    })
  }

}
