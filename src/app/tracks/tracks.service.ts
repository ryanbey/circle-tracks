import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Track } from './track.model';
// require("dotenv").config();

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private tracks: Track[] = [];
  trackSelectedEvent = new EventEmitter<Track>();
  trackListChangedEvent = new Subject<Track[]>();

  constructor(private http: HttpClient) {}

  // Get all tracks
  getTracks() {
    this.http
      .get<{ message: String; tracks: Track[] }>(
        'http://localhost:3000/tracks/'
      )
      .subscribe(
        (responseData) => {
          this.tracks = responseData.tracks;
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  // Get one track
  getTrack(id: string) {
    return this.http.get<{ message: String; track: Track }>(
      'http://localhost:3000/tracks/' + id
    );
  }

  // Add a new track to the track list
  addTrack(track: Track) {
    if (!track) {
      return;
    }

    // make sure id of the new Track is empty
    track.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Add to database
    this.http
      .post<{ message: string; track: Track }>(
        'http://localhost:3000/tracks/',
        track,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // Add new track to tracks
        this.tracks.push(responseData.track);
        this.sortAndSend();
      });
  }

  // Edit or update a track and add it to the track list
  updateTrack(originalTrack: Track, newTrack: Track) {
    if (!originalTrack || !newTrack) {
      return;
    }

    const pos = this.tracks.findIndex((d) => d.id === originalTrack.id);

    if (pos < 0) {
      return;
    }

    // Set the id of the new Track to the id of the old Track
    newTrack.id = originalTrack.id;
    newTrack._id = originalTrack._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Update database
    this.http
      .put('http://localhost:3000/tracks/' + originalTrack.id, newTrack, {
        headers: headers,
      })
      .subscribe((response) => {
        this.tracks[pos] = newTrack;
        this.sortAndSend();
      });
  }

  // Delete one track
  deleteTrack(track: Track) {
    if (!track) {
      return;
    }

    const pos = this.tracks.findIndex((d) => d.id === track.id);

    if (pos < 0) {
      return;
    }

    // Delete from database
    this.http
      .delete('http://localhost:3000/tracks/' + track.id)
      .subscribe((response) => {
        this.tracks.splice(pos, 1);
        this.sortAndSend();
      });
  }

  sortAndSend() {
    this.tracks.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    this.trackListChangedEvent.next(this.tracks.slice());
  }
}
