import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
	selector: 'app-search-users',
	templateUrl: './search-users.component.html',
	styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {
	filter: string = "";
	users: any[];

	constructor(private usersService: UsersService,
		private router: Router,
		private spinner: NgxSpinnerService) { }

	ngOnInit() {
		if (!this.usersService.checkLoggedIn())
			return this.router.navigate(['/login']);

		this.searchUsers();
	}

	searchUsers() {
		this.spinner.show();
		this.usersService.searchUsers(this.filter)
			.subscribe(
				(data: any) => {
					this.users = data.users;
					this.spinner.hide();
				},
				(error) => {
					alert(error.text);
					this.spinner.hide();
				}
			);
	}
}
