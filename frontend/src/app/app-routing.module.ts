import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route } from './constants/route.constant';
import { ChallengeComponent } from './content/challenge/challenge.component';
import { SettingsComponent } from './content/settings/settings.component';

const routes: Routes = [
  { path: Route.CHALLENGE, component: ChallengeComponent },
  { path: Route.SETTINGS, component: SettingsComponent },
  { path: '**', redirectTo: Route.CHALLENGE }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
