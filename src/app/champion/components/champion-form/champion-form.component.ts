import { ChampionService } from '../../services/champion.service';
import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Champion } from '../../models/champion';

export interface ChampionFormData {
  isCreateForm: boolean;
  champion: Champion;
}

@Component({
  selector: 'app-champion-form',
  templateUrl: './champion-form.component.html',
  styleUrls: ['./champion-form.component.sass']
})
export class ChampionFormComponent implements OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  classes: string[] = [
    'Attack Damage',
    'Ability Power'
  ];

  lanes: string[] = [
    'Top',
    'Jungle',
    'Mid',
    'Adc',
    'Support'
  ];

  championForm = this.fb.group({
    id: [0, [Validators.required]],
    name: ['', [Validators.required]],
    shortPhrase: ['', [Validators.required]],
    carateristiques: ['', [Validators.required]],
    lane: ['', [Validators.required]],
    dateApparition: ['', [Validators.required]]
  });

  constructor(public dialogRef: MatDialogRef<ChampionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChampionFormData, private fb: FormBuilder, 
    private championService : ChampionService, private _snackBar: MatSnackBar) {

      if(!data.isCreateForm){
        this.setChampionForm(data.champion);
      }

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  
  setChampionForm(champion: Champion) {
    this.championForm.setValue({
      id: champion.id,
      name: champion.name,
      shortPhrase: champion.shortPhrase,
      carateristiques: champion.carateristiques, 
      lane: champion.lane, 
      dateApparition: champion.dateApparition
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
    if(this.championForm.valid){
      if(this.data.isCreateForm){
        if (this.championForm.value.lane == "Top") {
          this.championForm.value.lane = "1"
          
        } else if (this.championForm.value.lane == "Jungle") {
          this.championForm.value.lane = "2"
          
        } else if (this.championForm.value.lane == "Mid") {
          this.championForm.value.lane = "3"
          
        }else if (this.championForm.value.lane == "Adc") {
          this.championForm.value.lane = "4"
          
        }else if (this.championForm.value.lane == "Support") {
          this.championForm.value.lane = "5"
          
        }
        this.championForm.value.id = Date.now() + Math.random();
        this.championService.create(this.championForm.value as Champion)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this._snackBar.open(result, '', {
            duration: 2000,
            panelClass: ['bg-success']
          });

          this.dialogRef.close(true);
        });
      }else{
        this.championService.update(this.championForm.value as Champion)
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
