import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { TooltipDirective } from './directives/tooltip';
import { BoxComponent } from './box/box.component';
import { LoadoutComponent } from './loadout/loadout.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [AppComponent, TooltipDirective, CheckboxComponent, BoxComponent, LoadoutComponent, SettingsComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
