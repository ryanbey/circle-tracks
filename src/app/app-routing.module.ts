import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { TrackDetailComponent } from './tracks/track-detail/track-detail.component';
import { TrackEditComponent } from './tracks/track-edit/track-edit.component';
import { TrackEmptyComponent } from './tracks/track-empty/track-empty.component';
import { TrackListComponent } from './tracks/track-list/track-list.component';
import { TracksComponent } from './tracks/tracks.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  // Home page
  { path: 'home', component: HomeComponent },
  // Tracks page
  { path: 'tracks', component: TracksComponent, children: [
    { path: 'category', component: TrackListComponent },
    { path: '', component: TrackEmptyComponent },
    { path: 'new', component: TrackEditComponent },
    { path: ':id', component: TrackDetailComponent },
    { path: ':id/edit', component: TrackEditComponent },
  ] },
  // Contacts page
  { path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
