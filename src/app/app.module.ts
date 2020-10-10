import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from '@angular/material/list'
import { MatSliderModule } from '@angular/material/slider'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component'
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { CanvasComponent } from './canvas/canvas.component'
import { SettingsComponent } from './settings/settings.component';

const matmodules = [
  MatButtonModule,
  MatListModule,
  MatSliderModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatSlideToggleModule
]
@NgModule({
  declarations: [	
    AppComponent,
    FileUploadComponent,
    AudioPlayerComponent,
    CanvasComponent,
    SettingsComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    matmodules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
