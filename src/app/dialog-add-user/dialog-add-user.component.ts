import { Component, OnInit, inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
} from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { UserComponent } from '../user/user.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent implements OnInit {
  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, public userService: UserService){}

  ngOnInit(): void {}

  saveUser() {
    this.userService.saveUser();
    this.dialogRef.close(); 
  }
}
