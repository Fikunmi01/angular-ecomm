import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule
// ...existing code...

@NgModule({
  declarations: [
    // ...existing code...
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, // Add AppRoutingModule to imports
    // ...existing code...
  ],
  providers: [],
  bootstrap: [/* ...existing code... */]
})
export class AppModule { }