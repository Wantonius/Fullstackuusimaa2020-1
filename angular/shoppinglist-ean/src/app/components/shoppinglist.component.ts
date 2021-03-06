import {Component,OnInit} from '@angular/core';
import {ShoppingItem} from '../models/shoppingitem.model';
import {ShoppingService} from '../services/shoppingservice.service';
import {LoginService} from '../services/loginservice.service';
import {Router} from '@angular/router'

@Component({
	selector:'shoppinglist',
	templateUrl:'./shoppinglist.component.html',
	styleUrls:['./shoppinglist.component.css']
})
export class ShoppingList implements OnInit {

	public shoppinglist:ShoppingItem[] = [];
	private currentIndex:number = -1;

	constructor(private _shoppingService:ShoppingService, private _login:LoginService, private _router:Router) {}
	
	ngOnInit() {
		if(!this._login.isUserLogged()) {
			this._router.navigate(['/login']);
		} else {
			this.getList();
		}
	}
	
	getList() {
		this._shoppingService.getList().subscribe(
			data => this.shoppinglist = data,
			error => console.log(error),
			() => console.log("Get shoppinglist done")
		);
	}
	
	
	removeFromList(id) {
		this._shoppingService.removeFromList(id).subscribe(
			data => this.getList(),
			error => console.log(error),
			() => console.log("Remove shoppingitem done")
		)
	}
	
	editItem(idx) {
	}

	onRemoveButtonClick(idx) {
		this.currentIndex = idx;
	}
	
	onEditButtonClick(idx) {
		
	}		

	onCancelButtonClick(idx) {
		this.currentIndex = -1;
	}
	
	onOkButtonClick(idx) {
		this.removeFromList(this.shoppinglist[idx].id);
	}	
}