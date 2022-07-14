import { Pipe, PipeTransform } from '@angular/core';
import { Track } from './track.model';

@Pipe({
  name: 'tracksFilter',
})
export class TracksFilterPipe implements PipeTransform {
  transform(tracks: Track[], term: string): any {
    let filteredTracks: Track[] = [];

    if (term && term.length > 0) {
      filteredTracks = tracks.filter((track: Track) =>
        track.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (filteredTracks.length < 1) {
      return tracks;
    }

    return filteredTracks;
  }
}
