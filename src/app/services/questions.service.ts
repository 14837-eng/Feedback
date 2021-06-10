import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

export interface IQuestion
{
  name: string;
  email: string;
  phone: string;
  question: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionsService 
{
  private readonly COL_NAME = 'questions';

  constructor(private fireStore: AngularFirestore) { }

  createQuestions(data: IQuestion)
  {
    return this.fireStore.collection(this.COL_NAME)
    .add(data);
  }

  getQuestions()
  {
    return this.fireStore.collection(this.COL_NAME)
    .snapshotChanges();
  }

  getQuestionsByMail(email: string)
  {
    return this.fireStore.collection(this.COL_NAME)
    .doc(email)
    .valueChanges();
  }

  deleteCoffeeOrder(data) 
  {
    return this.fireStore
    .collection(this.COL_NAME)
    .doc(data.payload.doc.id)
    .delete();
  }

  updateCoffeeOrder(data) 
  {
    return this.fireStore
    .collection(this.COL_NAME)
    .doc(data.payload.doc.id)
    .set({ completed: true }, { merge: true });
  }

}
