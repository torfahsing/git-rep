import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from 'src/ngrx/app.reducers';
import { GitRepositoryEffects } from 'src/ngrx/git-repositories/effects';

import { AppComponent } from './app.component';
import { TableComponent } from '../components/table/table.component';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([GitRepositoryEffects]),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
