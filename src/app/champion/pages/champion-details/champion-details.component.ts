import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common'
import { Champion } from '../../models/champion';
import { ChampionService } from '../../services/champion.service';


@Component({
  selector: 'app-champion-details',
  templateUrl: './champion-details.component.html',
  styleUrls: ['./champion-details.component.sass']
})
export class ChampionDetailsComponent {

  championId: number;
  champion$: Observable<Champion>;

  constructor(private route: ActivatedRoute, private championService: ChampionService, private location : Location){
    route.params.subscribe(params => {
      this.championId = params['id'];
    });

    /*this.championId = +this.route.snapshot.paramMap.get('id') ;*/
  }
  ngOnInit(): void {
    if(this.championId){
      this.champion$ = this.championService.getById(this.championId);

    }
   
  }

  goBack(){
    this.location.back();
  }

  showRecievedValue(value: boolean){
    console.log(value);
    
  }
}
