import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Track } from '../track.model';
import { TrackService } from '../tracks.service';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss'],
})
export class TrackListComponent implements OnInit {
  tracks: Track[] = [];
  subscription: Subscription;

  constructor(private trackService: TrackService) {
    this.trackService.getTracks();
  }

  ngOnInit(): void {
    this.subscription = this.trackService.trackListChangedEvent.subscribe(
      (tracks: Track[]) => {
        this.tracks = tracks;
      }
    );
  }
  
}
