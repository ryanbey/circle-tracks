import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TrackListComponent } from './tracks/track-list/track-list.component';
import { TrackItemComponent } from './tracks/track-item/track-item.component';
import { TrackDetailComponent } from './tracks/track-detail/track-detail.component';
import { CategoryCardComponent } from './home/category-card/category-card.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { TracksComponent } from './tracks/tracks.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TrackListComponent,
    TrackItemComponent,
    TrackDetailComponent,
    CategoryCardComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    TracksComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
