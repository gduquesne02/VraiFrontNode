import { LaneService } from '../../services/lane.service';
import { Lane } from '../../models/lane';
import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface LaneFormData {
  isCreateForm: boolean;
  lane: Lane;
}

@Component({
  selector: 'app-lane-form',
  templateUrl: './lane-form.component.html',
  styleUrls: ['./lane-form.component.sass']
})
export class LaneFormComponent implements OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  classes: string[] = [
    'LP-DIM-FI',
    'LP-DIM-APP'
  ];

  laneForm = this.fb.group({
    id: [0, [Validators.required]],
    lane: ['', [Validators.required]],
  });

  constructor(public dialogRef: MatDialogRef<LaneFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LaneFormData, private fb: FormBuilder, 
    private laneService : LaneService, private _snackBar: MatSnackBar) {

      if(!data.isCreateForm){
        this.setLaneForm(data.lane);
      }

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  
  setLaneForm(lane: Lane) {
    this.laneForm.setValue({
      id: lane.id,
      lane: lane.lane,
    });
  }

  get title(){
    if(this.data.isCreateForm){
      return 'Formulaire de création';
    }
    return 'Formulaire de modification';
  }

  get submitBtnName(){
    if(this.data.isCreateForm){
      return 'Ajouter';
    }
    return 'Modifier';
  }

  onSubmit(){
    if(this.laneForm.valid){
      if(this.data.isCreateForm){
        this.laneForm.value.id = Date.now() + Math.random();
        this.laneService.create(this.laneForm.value as Lane)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this._snackBar.open(result, '', {
            duration: 2000,
            panelClass: ['bg-success']
          });

          this.dialogRef.close(true);
        });
      }else{
        this.laneService.update(this.laneForm.value as Lane)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this._snackBar.open(result, '', {
            duration: 2000,
            panelClass: ['bg-success']
          });
          this.dialogRef.close(true);
        });
      }
    }
  }
}
