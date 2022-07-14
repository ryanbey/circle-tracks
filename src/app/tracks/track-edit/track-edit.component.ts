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
    // Fill in form fields based on id in URL
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']

      if (params['id'] != null) {
        this.editMode = true
      }

      if (this.id) {
        this.trackService.getTrack(this.id)
          .subscribe((result: { message: String, track: Track }) => {
            this.track = result.track
          })
      }
    })
  }

  onSubmit(form: NgForm) {
    let newTrack: Track;

    // Editing a track
    if(this.editMode) {
      newTrack = new Track(
        '', // Populated by MongoDB ObjectId
        '', // Populated by sequenceGenerator
        form.value.name,
        form.value.built,
        form.value.length,
        form.value.surface,
        form.value.turns,
        form.value.banking,
        form.value.capacity,
        form.value.category,
        form.value.mapUrl,
        form.value.imageUrl
      );
      this.trackService.updateTrack(this.track, newTrack);
    }

    // Adding a new track
    if (!this.editMode) {
      newTrack = new Track(
        '', // Populated by MongoDB ObjectId
        '', // Populated by sequenceGenerator
        form.value.name,
        form.value.built,
        form.value.length,
        form.value.surface,
        form.value.turns,
        form.value.banking,
        form.value.capacity,
        form.value.category,
        "assets/images/track-maps/" + form.value.mapUrl + ".png",
        "assets/images/track-images/" + form.value.imageUrl + ".jpg"
      );
      this.trackService.addTrack(newTrack);
    }
    
    this.onCancel();
  }

  onCancel() {
    // if (this.editMode) {
    //   this.router.navigate(['/tracks', this.id]);
    // } else {
    //   this.router.navigate(['/tracks']);
    // }
    // Above works great, but track detail component doesn't update before the component loads
    this.router.navigate(['/tracks']);
  }
}
