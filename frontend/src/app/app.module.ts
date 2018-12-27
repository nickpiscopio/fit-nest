import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpLoaderFactory } from './http-loader.factory';

// Libraries.
// Documentation: https://stackoverflow.com/questions/51111329/angular-6-cli-localisation-internationalization-for-multilingual-support
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

// Angular UI
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// App components.
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './fragment/nav/nav.component';
import { SettingsComponent } from './fragment/content/settings/settings.component';
import { ChallengeComponent } from './fragment/content/challenge/challenge.component';
import { LoginComponent } from './fragment/content/login/login.component';
import { DialogComponent } from './module/dialog/dialog.component';

const translateConfig = {
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
};

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SettingsComponent,
    ChallengeComponent,
    LoginComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(translateConfig),
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
