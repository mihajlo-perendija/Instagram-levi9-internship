import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { UsersService } from '../services/users.service';
import { PostsService } from '../services/posts.service';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	posts: any[];

	constructor(private usersService: UsersService,
		private postsService: PostsService,
		private router: Router,
		private spinner: NgxSpinnerService) { }

	ngOnInit() {
		this.spinner.show();
		if (!this.usersService.checkLoggedIn())
			this.router.navigate(['/login']);
		else 
			this.getHomePosts();
	}

	getHomePosts() {
		this.postsService.getHomePosts()
			.subscribe(
				(data: any) => {
					this.posts = data.posts;
					this.spinner.hide();
				},
				(error) => {
					alert(error);
					this.spinner.hide();
				}
			);
	}

}
