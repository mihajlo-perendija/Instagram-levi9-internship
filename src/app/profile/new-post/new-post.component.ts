import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Output, EventEmitter } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';


@Component({
	selector: 'app-new-post',
	templateUrl: './new-post.component.html',
	styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
	description: string;
	fileToUpload: File = null;
	name: string = 'Chose image';
	base64textString: string;
	imgSrc: any;
	imageSizeOk = false;

	@Output() refreshProfile: EventEmitter<any> = new EventEmitter();


	constructor(private postsService: PostsService,
		private modalService: NgbModal) { }

	ngOnInit() {
	}

	createPost() {
		if (this.fileToUpload && this.imageSizeOk){
			this.postsService.uploadImage(this.base64textString, this.name)
			.subscribe(
				(data: any) => {
					const imageUrl = `assets/images/${this.name}`;
					this.postsService.createNewPost(imageUrl, this.description)
						.subscribe(
							(data: any) => {
								this.modalService.dismissAll();
								this.refreshProfile.emit();
							},
							(error) => alert(error.text)
						);
				}
			);
		} else {
			alert('Post must have an image!');
		}
		
	}

	handleFileInput(files: FileList) {
		this.fileToUpload = files.item(0);

		if (this.fileToUpload) {
			// convert to base64
			var reader = new FileReader();
			reader.onload = this._handleReaderLoaded.bind(this);
			reader.readAsBinaryString(this.fileToUpload);

			// image preview
			var reader2 = new FileReader();
			reader2.readAsDataURL(this.fileToUpload);
			if (this.fileToUpload.size/1024 > 70){
				alert("Image to big");
				this.imageSizeOk = false;
			} else {
				this.imageSizeOk = true;
				this.name = this.fileToUpload.name;	
				reader2.onload = (_event) => {
					this.imgSrc = reader2.result;
				}
			}
		}
	}
	// convert to base64
	_handleReaderLoaded(readerEvt) {
		var binaryString = readerEvt.target.result;
		this.base64textString = btoa(binaryString);
	}
}
