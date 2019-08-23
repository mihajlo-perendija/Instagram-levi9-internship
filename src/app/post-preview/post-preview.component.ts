import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostModalComponent } from '../post-modal/post-modal.component';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';


@Component({
	selector: 'app-post-preview',
	templateUrl: './post-preview.component.html',
	styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent implements OnInit {
	@Input() post: any;
	@Input() flag: any;
	formatedDate: string;
	creator: any;

	@Output() dataLoaded: EventEmitter<any> = new EventEmitter<any>();


	constructor(private usersService: UsersService,
		private modalService: NgbModal,
		private router: Router) {
	}

	ngOnInit() {
		this.getHeaderInfo();
	}

	getHeaderInfo() {
		this.formatedDate = new Date(this.post.createdAt).toLocaleDateString("en-GB");
		this.usersService.getUserInfo(this.post.owner)
			.subscribe(
				(data: any) => {
					this.creator = data.user;
					this.dataLoaded.emit();
				},
				(error) => {
					this.dataLoaded.emit();
					alert(error.text);
				}
			);
	}

	open() {
		if (this.flag === 'preview') {
			const modal = this.modalService.open(PostModalComponent);
			modal.componentInstance.postId = this.post._id;
		}
	}

	showUserProfile() {
		this.router.navigate(['/profile', this.creator._id]);
		this.modalService.dismissAll();
	}

}
