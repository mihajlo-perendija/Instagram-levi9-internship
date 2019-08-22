import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
		private router: Router) { }

	ngOnInit() {
		if (!this.usersService.checkLoggedIn())
			this.router.navigate(['/login']);
		this.getHomePosts();
	}

	getHomePosts() {
		this.postsService.getHomePosts()
			.subscribe(
				(data: any) => this.posts = data.posts,
				(error) => alert(error)
			);
	}

}
