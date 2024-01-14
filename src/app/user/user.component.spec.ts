import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Firestore, FirestoreModule } from '@angular/fire/firestore';



describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports: [MatDialogModule, FirestoreModule],
      declarations: [UserComponent],
      providers:[MatDialog, Firestore]
    });
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
