import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ShoppingList } from './components/shoppinglist.component';
import { ShoppingForm} from './components/shoppingform.component';
import {ShoppingService} from './services/shoppingservice.service';
import {LoginForm} from './components/loginform.component';
import {LoginService} from './services/loginservice.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
	ShoppingList,
	ShoppingForm,
	LoginForm
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule,
	HttpClientModule
  ],
  providers: [ShoppingService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
