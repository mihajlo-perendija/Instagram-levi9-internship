import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../services/users.service';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
	@Input() comment: any;
	author: any;
	formatedDate: any;

	constructor(private usersService: UsersService,
		private router: Router,
		private modalService: NgbModal) { }

	ngOnInit() {
		this.getAuthorInfo();
		if (this.comment)
			this.formatedDate = new Date(this.comment.createdAt).toLocaleDateString("en-GB");
	}

	getAuthorInfo() {
		if (this.usersService.checkLoggedIn()) {
			this.usersService.getUserInfo(this.comment.author)
				.subscribe(
					(data: any) => this.author = data.user,
					(error) => alert(error.text)
				);
		}
	}

	showUserProfile() {
		this.router.navigate(['/profile', this.author._id]);
		this.modalService.dismissAll();
	}

}
