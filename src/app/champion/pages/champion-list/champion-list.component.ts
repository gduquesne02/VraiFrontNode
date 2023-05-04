import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { ChampionService } from '../../services/champion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChampionFormComponent } from '../../components/champion-form/champion-form.component';
import { Champion } from '../../models/champion';

@Component({
  selector: 'app-champion-list',
  templateUrl: './champion-list.component.html',
  styleUrls: ['./champion-list.component.sass'],
})
export class ChampionListComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  champions$: Observable<Champion[]>;
  displayedColumns: string[] = [
    'name',
    'shortPhrase',
    'carateristiques',
    'dateApparition',
    'lane',
    'update',
    'delete',
  ];
  laneId: number;

  constructor(
    private _snackBar: MatSnackBar,
    private championService: ChampionService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const championid = this.route.snapshot.paramMap.get('championid');
    if(championid != null){
      this.champions$ = this.championService.getChampionsById(Number(championid));
    } else {
      this.champions$ = this.championService.get();

    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

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
          this.championService
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

  openChampionForm(champion?: Champion) {
    const dialogRef = this.dialog.open(ChampionFormComponent, {
      height: '85%',
      width: '60%',
      data: {
        isCreateForm: champion ? false : true,
        champion: champion ? champion : undefined,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.fetchData();
        }
      });
  }

  showChampionDetails(championId: number) {
    this.router.navigate(['/champion/' + championId]);
  }
}
