import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
	selector: 'app-search-users',
	templateUrl: './search-users.component.html',
	styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {
	filter: string = "";
	users: any[];

	constructor(private usersService: UsersService) { }

	ngOnInit() {
		this.usersService.checkLoggedIn();
		this.usersService.searchUsers(this.filter)
				.subscribe(
					(data: any) => this.users = data.users,
					(error) => alert(error.text)
				);
	}

	searchUsers() {
		this.usersService.searchUsers(this.filter)
			.subscribe(
				(data: any) => this.users = data.users,
				(error) => alert(error.text)
			);
	}
}
