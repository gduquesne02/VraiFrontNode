import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Champion } from '../../models/champion';


@Component({
  selector: 'app-champion-champion',
  templateUrl: './champion-card.component.html',
  styleUrls: ['./champion-card.component.sass']
})
export class ChampionCardComponent implements OnInit {

  @Input() selectedChampion: Champion;
  @Output() recieved: EventEmitter<boolean>=new EventEmitter<boolean>();


  ngOnInit(): void{
      this.recieved.emit(true);
    
  }
}
