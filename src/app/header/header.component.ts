import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	constructor(private usersService: UsersService,
		private router: Router) { }

	ngOnInit() {
	}

	showProfilePage() {
		this.router.navigate(['/profile', this.usersService.getUserId()]);
	}

	logout() {
		this.usersService.logout()
			.subscribe(
				(data: any) => this.usersService.removeUser(),
				(error) => alert(error)
			);
		this.router.navigate(['/login']);
	}

	showSearchUsers() {
		this.router.navigate(['/search-users']);
	}

	showSearchPosts() {
		this.router.navigate(['/search-posts']);
	}

}
