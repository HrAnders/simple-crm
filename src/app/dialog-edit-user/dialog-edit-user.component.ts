import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { UserService } from '../user.service';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss'],
})
export class DialogEditUserComponent {
  user!: any;
  birthDate: any;
  id!: string;
  firestore: Firestore = inject(Firestore);

  constructor(
    public userService: UserService,
    public dialogRef: MatDialogRef<DialogAddUserComponent>
  ) {}

  ngOnInit() {
    this.birthDate = new Date(this.user.birthDate);
  }

  async saveUser() {
    if (this.id) {
      try {
        this.userService.loading = true;
        await updateDoc(this.getSingleDocRef(),this.user.toJSON());
        this.userService.loading = false;        this.dialogRef.close()
      } catch (error) {
        console.log(error);
      }
    } else if (!this.id) {
      console.log('ID not found');
    }
  }

  getSingleDocRef() {
    return doc(collection(this.firestore, 'users'), this.id);
  }
}
