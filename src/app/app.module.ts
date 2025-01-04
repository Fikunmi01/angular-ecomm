import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, // Add AppRoutingModule to imports
  ],

  providers: [],
  bootstrap: [AppModule],
})
export class AppModule {}
