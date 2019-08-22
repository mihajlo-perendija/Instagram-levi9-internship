import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	username: string;
	password: string;

	constructor(private usersService: UsersService,
		private router: Router) { }

	ngOnInit() {
	}

	onSubmit() {
		this.usersService.login(this.username, this.password)
			.subscribe(
				(data: any) => {
					this.usersService.setUser(data.user);
					this.router.navigate(['/']);
				},
				(error) => alert(error.text)
			);
	}

}
