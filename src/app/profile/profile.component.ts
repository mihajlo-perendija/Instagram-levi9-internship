import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewPostComponent } from './new-post/new-post.component';
import { UsersService } from '../services/users.service';
import { NgxSpinnerService } from "ngx-spinner";


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
		private router: Router,
		private usersService: UsersService,
		private modalService: NgbModal,
		private spinner: NgxSpinnerService) { }

	ngOnInit() {
		if (!this.usersService.checkLoggedIn())
			return this.router.navigate(['/login']);

		this.route.params.subscribe((routeParams) => {
			this.spinner.show();

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
							this.spinner.hide();
						}
					);
			}
		});
	}

	loadPosts() {
		this.usersService.getUserPosts(this.user._id)
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
