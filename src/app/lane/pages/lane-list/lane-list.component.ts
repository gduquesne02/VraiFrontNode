import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { Lane } from '../../models/lane';
import { LaneService } from '../../services/lane.service';
import { Router } from '@angular/router';
import { LaneFormComponent } from '../../components/lane-form/lane-form.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './lane-list.component.html',
  styleUrls: ['./lane-list.component.sass'],
})
export class LaneListComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  students$: Observable<Lane[]>;

  constructor(
    private studentService: LaneService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.students$ = this.studentService.get();
  }

  displayedColumns: string[] = [

    'lane',

    'update',
    'delete',
  ];


  delete(id: number) {
    const ref = this.dialog.open(GenericPopupComponent, {
      data: {
        title: 'Confirmation de suppression',
        message: 'êtes-vous sûr de vouloir supprimer cet étudiant ?',
        typeMessage: 'none',
        yesButtonVisible: true,
        noButtonVisible: true,
        cancelButtonVisible: false,
        defaultButton: 'No',
        yesButtonLabel: 'Oui',
        noButtonLabel: 'Non',
      },
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.studentService
            .delete(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((result) => {
              this._snackBar.open(result, '', {
                duration: 2000,
                panelClass: ['bg-success'],
              });
              this.fetchData();
            });
        }
      });
  }

  openStudentForm(student?: Lane) {
    const dialogRef = this.dialog.open(LaneFormComponent, {
      height: '85%',
      width: '60%',
      data: {
        isCreateForm: student ? false : true,
        student: student ? student : undefined
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.fetchData();
        }
      });
  }

  showStudentDetails(studentId:number){
    this.router.navigate(['/champion/lane/'+studentId]);
  }

}
