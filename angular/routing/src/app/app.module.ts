import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ShoppingList } from './components/shoppinglist.component';
import { ShoppingForm} from './components/shoppingform.component';
import {ShoppingService} from './services/shoppingservice.service';

@NgModule({
  declarations: [
    AppComponent,
	ShoppingList,
	ShoppingForm
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule
  ],
  providers: [ShoppingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
