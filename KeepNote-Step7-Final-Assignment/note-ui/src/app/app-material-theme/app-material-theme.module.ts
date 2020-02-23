import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatCardModule,MatToolbarModule,MatSelectModule,MatDialogModule} from '@angular/material';
import {MatExpansionModule,MatIconModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common'
import {MatListModule} from '@angular/material/list';

@NgModule({
imports :[BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    CommonModule,MatListModule,MatDialogModule],
exports:[BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    CommonModule,MatListModule,MatDialogModule],
declarations:[]

})

export class AppMaterialThemeModule{}