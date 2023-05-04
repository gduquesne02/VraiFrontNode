import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lane } from '../../models/lane';


@Component({
  selector: 'app-lane-card',
  templateUrl: './lane-card.component.html',
  styleUrls: ['./lane-card.component.sass']
})
export class LaneCardComponent implements OnInit {

  @Input() selectedLane: Lane;
  @Output() recieved: EventEmitter<boolean>=new EventEmitter<boolean>();


  ngOnInit(): void{
      this.recieved.emit(true);
    
  }
}
