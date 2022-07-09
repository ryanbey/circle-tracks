import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Track } from '../track.model';
import { TrackService } from '../tracks.service';

@Component({
  selector: 'app-track-edit',
  templateUrl: './track-edit.component.html',
  styleUrls: ['./track-edit.component.scss'],
})
export class TrackEditComponent implements OnInit {
  originalTrack;
  track: Track;
  editMode = false;
  id: string;

  constructor(
    private trackService: TrackService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }

      this.originalTrack = this.trackService.getTrack(id);

      if (this.originalTrack === undefined || this.originalTrack === null) {
        return;
      }
      this.editMode = true;
      this.track = JSON.parse(JSON.stringify(this.originalTrack));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newTrack = new Track(
      '', // Object Id populated by MongoDB
      '',
      value.name,
      value.built,
      value.length,
      value.surface,
      value.turns,
      value.banking,
      value.capacity,
      "assets/images/track-maps/" + value.trackMapUrl,
      "assets/images/track-images/" + value.trackImageUrl
    );
    if (this.editMode) {
      this.trackService.updateTrack(this.originalTrack, newTrack);
    } else {
      this.trackService.addTrack(newTrack);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/tracks']);
  }

  isInvalidTrack(newTrack: Track) {
    if (!newTrack) {
      return true;
    }
    if (this.track && newTrack.id === this.track.id) {
      return true;
    }
    return false;
  }
}
