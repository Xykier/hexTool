import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './root.component';
import { HexComponent } from './components/hex/hex.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HexNotesComponent } from './components/hex-notes/hex-notes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  entryComponents: [
    HexNotesComponent
  ],
  declarations: [
    RootComponent,
    HexComponent,
    HexNotesComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    AppRoutingModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
