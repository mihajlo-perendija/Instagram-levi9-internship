import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { PostsService } from '../services/posts.service';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
	username: string;
	password: string;
	confirmPassword: string;
	fullName: string;

	fileToUpload: File = null;
	name: string = 'Chose image';
	base64textString: string;
	imgSrc: any;
	imageSizeOk = false;

	constructor(private usersService: UsersService,
		private postsService: PostsService,
		private router: Router) { }

	ngOnInit() {
	}

	onSubmit(){
		if (!this.username){
			alert("Username is required");
			return;
		}
		if (!this.password){
			alert("Password is required");
			return;
		}
		if (this.password !== this.confirmPassword){
			alert("Paswords don't match");
			return;
		}
		if (!this.fullName){
			alert("Full name is required");
			return;
		}
		if (!this.fileToUpload || !this.imageSizeOk){
			alert("Avatar is required");
			return;
		}

		this.postsService.uploadImage(this.base64textString, this.name)
			.subscribe(
				(data: any) => {
					const imageUrl = `assets/images/${this.name}`;

					this.usersService.registration(this.username, this.password, this.fullName, imageUrl)
						.subscribe(
							(data: any) => {
								this.router.navigate(['/login']);
							},
							(error) => alert(error.text)
						);
				}
			);
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
