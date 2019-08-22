import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	@Input() user: any;

	constructor(private router: Router) { }

	ngOnInit() {
	}

	viewProfile(){
		this.router.navigate(['/profile' , this.user._id]);
	}

}
