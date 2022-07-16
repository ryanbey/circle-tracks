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
  term: string;

  constructor(private trackService: TrackService) {}

  ngOnInit(): void {
    this.subscription = this.trackService.trackListChangedEvent.subscribe(
      (tracks: Track[]) => {
        this.tracks = tracks;
      }
    );

    this.trackService.getTracks();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(value: string) {
    this.term = value;
  }

  scrollToTop(): void {
    window.scroll({
      top: 150,
      left: 0,
      behavior: 'smooth',
    });
  }
}
