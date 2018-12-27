import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route } from './constants/route.constant';
import { ChallengeComponent } from './fragment/content/challenge/challenge.component';
import { LoginComponent } from './fragment/content/login/login.component';
import { SettingsComponent } from './fragment/content/settings/settings.component';
import { AuthGuard } from './services/google/auth.util';

const routes: Routes = [
  { path: Route.LOGIN, component: LoginComponent },
  { path: Route.CHALLENGE, component: ChallengeComponent, canActivate: [AuthGuard] },
  { path: Route.SETTINGS, component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: Route.LOGIN }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
