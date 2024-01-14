import { Component, OnInit, inject } from '@angular/core';
import { DocumentData, Firestore, Unsubscribe, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {

  firestore: Firestore = inject(Firestore);
  currentID: string = '';
  unsubSingleUser;
  currentUser: User = new User();


  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.unsubSingleUser = onSnapshot(
      this.getSingleDocRef('users', '1234'),
      (doc) => {}
    );
  }

  ngOnInit() {
    this.getCurrentUser()
  }

  ngOnDestroy(){
    this.unsubSingleUser();
  }

  getCurrentUser() {
    this.route.params.subscribe((params) => {
      this.unsubSingleUser = onSnapshot(
        this.getSingleDocRef('users', params['id']),
        (usersDoc) => {
          this.currentUser = new User(usersDoc.data());
          this.currentID = usersDoc.id;
        })
    });
  }



  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  editUserDetails(){
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.currentUser.toJSON());     //copying the current user obj to ensure that ngModel does not update from the dialog box without saving
    dialog.componentInstance.id = this.currentID;
  }

  editAddress(){
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.currentUser.toJSON());
    dialog.componentInstance.id = this.currentID;
  }
}
