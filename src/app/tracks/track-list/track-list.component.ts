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

  constructor(private trackService: TrackService) {}

  ngOnInit(): void {
    this.subscription = this.trackService.trackListChangedEvent.subscribe(
      (tracks: Track[]) => {
        this.tracks = tracks;
      }
    );

    this.trackService.getTracks();
  }

  categorySelected(category: string) {
    switch(category) {
      case 'all': this.trackService.getTracksByCategory('all');
      break;
      case 'short': this.trackService.getTracksByCategory('short');
      break;
      case 'intermediates': this.trackService.getTracksByCategory('intermediates');
      break;
      case 'dirt': this.trackService.getTracksByCategory('dirt');
      break;
      case 'superspeedways': this.trackService.getTracksByCategory('superspeedways');
      break;
      case 'road': this.trackService.getTracksByCategory('road');
      break;
      case 'legacy': this.trackService.getTracksByCategory('legacy');
      break;
    }
  }
  
}
