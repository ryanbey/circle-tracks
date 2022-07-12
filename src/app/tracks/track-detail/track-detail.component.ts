import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Track } from '../track.model';
import { TrackService } from '../tracks.service';

@Component({
  selector: 'cms-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.scss'],
})
export class TrackDetailComponent implements OnInit {
  track: Track;
  id: string;

  constructor(
    private trackService: TrackService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.trackService.getTrack(this.id).subscribe((trackData) => {
        this.track = trackData.track;
      });
    });
  }

  onDelete() {
    this.trackService.deleteTrack(this.track);
    this.router.navigateByUrl('/tracks');
  }
}
