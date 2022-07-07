import { Component, OnInit } from '@angular/core';
import { Track } from './track.model';
import { TrackService } from './tracks.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {
  selectedTrack: Track;

  constructor(private trackService: TrackService) {}

  ngOnInit(): void {
    this.trackService.trackSelectedEvent.subscribe((track: Track) => {
      this.selectedTrack = track;
    });
  }
}
