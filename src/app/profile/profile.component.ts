import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewPostComponent } from './new-post/new-post.component';
import { PostsService } from '../services/posts.service';
import { UsersService } from '../services/users.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	user: any;
	following: any;
	posts: any[];

	constructor(private route: ActivatedRoute,
		private usersService: UsersService,
		private modalService: NgbModal) { }

	ngOnInit() {
		this.route.params.subscribe((routeParams) => {

			let userId = routeParams.id;
			if (userId && this.usersService.checkLoggedIn()) {

				this.usersService.getUserInfo(userId)
					.subscribe(
						(data: any) => {
							this.user = data.user;
							if (this.usersService.getUserId() !== userId) {
								this.following = data.following;
							} else {
								this.following = undefined;
							}
							this.loadPosts();
						},
						(error) => {
							alert(error.text);
						}
					);
			}
		});
	}

	loadPosts() {
		this.usersService.getUserPosts(this.user._id)
			.subscribe(
				(data: any) => this.posts = data.posts,
				(error) => alert(error.text)
			);
	}

	follow() {
		this.following = !this.following
		this.usersService.followUser(this.user._id, this.following)
			.subscribe(
				(data: any) => { },
				(error) => alert(error.text)
			);
	}

	newPost() {
		const modal = this.modalService.open(NewPostComponent);
		modal.componentInstance.refreshProfile.subscribe(() => {
			this.ngOnInit();
		});
	}
}
