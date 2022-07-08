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
  tracks: Track[] = [
    new Track('', '1', 'Track 1', '2004', '1.5', 'asphalt', '4', '22', '44000', 'assets/images/track-maps/daytona-thicc.png', ''),
    new Track('', '2', 'Track 2', '2005', '2', 'asphalt', '4', '26', '55000', 'assets/images/track-maps/daytona-thicc.png', ''),
    new Track('', '3', 'Track 3', '2006', '0.5', 'concrete', '4', '16', '74000', 'assets/images/track-maps/daytona-thicc.png', ''),
  ];
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
