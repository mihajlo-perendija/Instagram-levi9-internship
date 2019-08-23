import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { UsersService } from '../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


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
		private router: Router,
		private spinner: NgxSpinnerService) { }

	ngOnInit() {
		if (!this.usersService.checkLoggedIn())
			return this.router.navigate(['/login']);

		this.route.queryParams.subscribe((queryParams) => {
			this.spinner.show();

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
				(data: any) => {
					this.posts = data.posts;
					this.spinner.hide();
				},
				(error) => {
					alert(error.text);
					this.spinner.hide();
				}
			);
	}

}
