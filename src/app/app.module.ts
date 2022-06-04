import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { SvgModule } from './svg/svg.module';
import { CustomSnacksModule } from './custom-snacks/custom-snacks.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { BuilderComponent } from './builder/builder.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DialogSimpleTextInputComponent } from './dialogs/simple-text-input/dialog-simple-text-input.component';
import { DialogSelectCombatStyleAndDiscipline } from './dialogs/select-combat-style-and-discipline/dialog-select-combat-style-and-discipline.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    BuilderComponent,
    DialogSimpleTextInputComponent,
    DialogSelectCombatStyleAndDiscipline
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    SvgModule,
    CustomSnacksModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
