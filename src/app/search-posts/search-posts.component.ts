import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { UsersService } from '../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-search-posts',
	templateUrl: './search-posts.component.html',
	styleUrls: ['./search-posts.component.css']
})
export class SearchPostsComponent implements OnInit {
	posts: any[];
	filter: string = "";

	constructor(private usersService: UsersService,
		private postsService: PostsService,
		private route: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		this.usersService.checkLoggedIn();
		this.route.queryParams.subscribe((queryParams) => {
			if (queryParams.filter || queryParams.filter === "") {
				this.filter = queryParams.filter;
			}
			this.searchPosts();

		});
	}

	changeRouteParameter() {
		this.router.navigate(['/search-posts'], { queryParams: { filter: this.filter } });
	}

	searchPosts() {
		this.postsService.searchPosts(this.filter)
			.subscribe(
				(data: any) => this.posts = data.posts,
				(error) => alert(error.text)
			);
	}

}
