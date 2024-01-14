import { Component, inject } from '@angular/core';
import { UserService } from '../user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  user!: any;
  id!: string;
  firestore: Firestore = inject(Firestore);


  constructor(public userService: UserService, public dialogRef: MatDialogRef<DialogAddUserComponent>){}

  async saveUser(){
    if (this.id) {
      try {
        this.userService.loading = true;
        await updateDoc(this.getSingleDocRef(),this.user.toJSON());
        this.userService.loading = false;
        this.dialogRef.close()
      } catch (error) {
        console.log(error);
        
      }
    }
    else if(!this.id){
      console.log('ID not found');
      
    }
    
  }

  getSingleDocRef(){
    return doc(collection(this.firestore, 'users'), this.id);
  }
}
