import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  onSnapshot,
} from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore: Firestore = inject(Firestore);
  user = new User();
  birthDate!: Date;
  loading: boolean = false;
  users: any = [];
  unsubUsersList;

  constructor() {
    this.unsubUsersList = this.subUsersList();
    
  }

  subUsersList() {
    return onSnapshot(this.getUsersRef(), (list) => {
      list.forEach((element) => {
        this.users.push(this.setUserData(element.data(), element.id));
      });
    });
  }

  

  ngOnDestroy() {
    this.unsubUsersList();
  }

  saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();

    //console.log('Current user: ' + JSON.stringify(this.user));
    addDoc(this.getUsersRef(), this.user.toJSON())
      .catch((err) => {
        console.log(err);
      })
      .then((docRef) => {
        //console.log('Added user: ' + docRef?.id);
        this.loading = false;
      });
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  setUserData(obj: any, id: string) {
    return {
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      birthDate: obj.birthDate || '',
      street: obj.street || '',
      zipCode: obj.zipCode || '',
      city: obj.city || '',
      email: obj.email || '',
      id: id,
    };
  }
}
