import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUserComponent } from './dialog-edit-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';

describe('DialogEditUserComponent', () => {
  let component: DialogEditUserComponent;
  let fixture: ComponentFixture<DialogEditUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditUserComponent],
      providers: [ MatDialogModule, UserService, Firestore]
    });
    fixture = TestBed.createComponent(DialogEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
