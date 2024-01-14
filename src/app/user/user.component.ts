import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { doc, onSnapshot } from 'firebase/firestore';
import { list } from '@angular/fire/database';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  user: User = new User();
  unsubList: any;

  constructor(public dialog: MatDialog, private userService: UserService) {}

  ngOnInit() {
    
  }

  ngOnDestroy() {    
    
  }


  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  getList(){    
    return this.userService.users;
  }
  
}
