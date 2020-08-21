import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RankComponent } from './components/rank/rank.component';
import { RankService } from './services/rank.service';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, RankComponent, LeaderboardComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [RankService],
  bootstrap: [AppComponent],
})
export class AppModule {}
