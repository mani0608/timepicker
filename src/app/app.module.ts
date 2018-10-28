import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MTimepicker, MTimepickerContent } from './clock/m-clock/m-clock.component';
import { MClockArrayPipe } from './shared/pipe/m-clock-array.pipe';

import { routing } from './app.routes';
import { HourStyleTickerDirective } from './shared/directive/hour-style-ticker.directive';
import { MinutesStyleTickerDirective } from './shared/directive/minutes-style-ticker.directive';
import { ClockViewTransitionDirective } from './shared/directive/clock-view-transition.directive';
import { TickerDragCaptureDirective } from './shared/directive/ticker-drag-capture.directive';
import { MTimePickerInput } from './shared/directive/m-time-picker.directive';
import { MTimePickerToggleComponent } from './clock/m-time-picker-toggle/m-time-picker-toggle.component';

import { M_TIMEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER } from './clock/m-clock/m-clock.component';

@NgModule({
  declarations: [
    AppComponent,
    MTimepicker,
    MTimepickerContent,
    MClockArrayPipe,
    HourStyleTickerDirective,
    MinutesStyleTickerDirective,
    ClockViewTransitionDirective,
    TickerDragCaptureDirective,
    MTimePickerInput,
    MTimePickerToggleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    A11yModule,
    OverlayModule,
    PortalModule,
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    routing
  ],
  providers: [
    M_TIMEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER
  ],
  bootstrap: [AppComponent],
  entryComponents: [MTimepickerContent]
})
export class AppModule { }
