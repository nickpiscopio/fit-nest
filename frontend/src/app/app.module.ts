import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpLoaderFactory } from './http-loader.factory';

// Libraries.
// Documentation: https://www.npmjs.com/package/angular-6-datatable
import { DataTableModule } from 'angular-6-datatable';
// Documentation: https://stackoverflow.com/questions/51111329/angular-6-cli-localisation-internationalization-for-multilingual-support
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

// Angular UI
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

// App components.
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './fragment/nav/nav.component';
import { SettingsComponent } from './fragment/content/settings/settings.component';
import { AuthorizationTableComponent } from './fragment/content/settings/authorization-table/authorization-table.component';
import { DialogEditUserComponent } from './fragment/content/settings/dialog-edit-user/dialog-edit-user.component';
import { ChallengeComponent } from './fragment/content/challenge/challenge.component';
import { DialogEditChallengeComponent } from './fragment/content/challenge/dialog-edit-challenge/dialog-edit-challenge.component';
import { LoginComponent } from './fragment/content/login/login.component';
import { DialogComponent } from './module/dialog/dialog.component';
import { ProgressComponent } from './module/progress/progress.component';
import { AuthService } from './services/google/auth.service';
import { AuthGuard } from './services/google/auth.util';
import { ChallengeListItemComponent } from './fragment/content/challenge/challenge-list-item/challenge-list-item.component';
import { AutocompleteChipsComponent } from './module/autocomplete-chips/autocomplete-chips.component';
import { ChallengeUserEditComponent } from './fragment/content/challenge-user-edit/challenge-user-edit.component';

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
    AuthorizationTableComponent,
    DialogEditUserComponent,
    ChallengeComponent,
    LoginComponent,
    DialogEditChallengeComponent,
    DialogComponent,
    ProgressComponent,
    ChallengeListItemComponent,
    AutocompleteChipsComponent,
    ChallengeUserEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    TranslateModule.forRoot(translateConfig),
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule
  ],
  entryComponents: [
    DialogEditChallengeComponent,
    DialogEditUserComponent,
    DialogComponent
  ],
  providers: [ AuthService, AuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
