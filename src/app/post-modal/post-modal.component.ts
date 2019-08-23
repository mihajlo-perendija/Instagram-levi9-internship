import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
	selector: 'app-post-modal',
	templateUrl: './post-modal.component.html',
	styleUrls: ['./post-modal.component.css']
})
export class PostModalComponent implements OnInit {
	postId: string;
	post: any;
	newComment: string;
	done: boolean = false;
	descWords: string[];

	postInfoLoaded = false;
	commentsInfoLoaded = 0;

	constructor(private postsService: PostsService,
		private router: Router,
		private modalService: NgbModal,
		private spinner: NgxSpinnerService) { }

	ngOnInit() {
		this.getPostInfo();
		setTimeout(() => this.spinner.show(), 0);
	}

	getPostInfo() {
		this.postsService.getSinglePost(this.postId)
			.subscribe(
				(data: any) => {
					this.post = data.post;
					this.post.comments.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
					this.descWords = this.post.description.split(" ");
				},
				(error) => {
					this.spinner.hide();
					alert(error.text);
				}
			);
	}

	postComment() {
		if (this.newComment) {
			this.postsService.newComment(this.postId, this.newComment)
				.subscribe(
					(data: any) => {
						this.post = data.post;
						this.newComment = null;
					},
					(error) => {
						alert(error.text);
					}
				);
		} else {
			alert("Comment can't be empty");
		}
	}

	showHashtagSearch(hashtag) {
		this.router.navigate(['/search-posts'], { queryParams: { filter: hashtag } });
		this.modalService.dismissAll();
	}

	isHashtag(word) {
		return word.charAt(0) === '#';
	}

	postLoaded(){
		this.postInfoLoaded = true;
		this.checkLoadedAll();
	}

	commentLoaded(){
		this.commentsInfoLoaded++;
		this.checkLoadedAll();
	}

	checkLoadedAll(){
		if (this.postInfoLoaded && this.commentsInfoLoaded === this.post.comments.length){
			this.spinner.hide();
		}
	}

}
