import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TrackListComponent } from './track-list/track-list.component';
import { TrackItemComponent } from './track-item/track-item.component';
import { TrackDetailComponent } from './track-detail/track-detail.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TrackListComponent,
    TrackItemComponent,
    TrackDetailComponent,
    CategoryCardComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
