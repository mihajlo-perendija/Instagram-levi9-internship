import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Http, Response, Headers } from '@angular/http';
import { map, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { UsersService } from './users.service';


@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private usersService: UsersService,
        private http: Http) { }

    getHomePosts() {
        let headers = new Headers();
        headers.append('x-auth', `${this.usersService.token}`);

        return this.http.get(`http://127.0.0.1:3000/posts/home`, { headers })
            .pipe(
                map((response: Response) => {
                    const data = response.json();
                    return data;
                }),
                catchError((error: Response) => {
                    return throwError(error);
                })
            );
    }

    getSinglePost(postId: string) {
        return this.http.get(`http://127.0.0.1:3000/posts/single/${postId}`)
            .pipe(
                map((response: Response) => {
                    const data = response.json();
                    return data;
                }),
                catchError((error: Response) => {
                    return throwError(JSON.parse(error.text()));
                })
            );
    }

    newComment(postId: string, text: string) {
        let headers = new Headers();
        headers.append('x-auth', `${this.usersService.token}`);
        return this.http.patch(`http://127.0.0.1:3000/posts/comment/${postId}`,
            { 'text': text }, { headers })
            .pipe(
                map((response: Response) => {
                    const data = response.json();
                    return data;
                }),
                catchError((error: Response) => {
                    return throwError(JSON.parse(error.text()));
                })
            );
    }

    createNewPost(imageUrl: string, description: string) {
        var data = {
            post: {
                imageUrl,
                description
            }
        }
        let headers = new Headers();
        headers.append('x-auth', `${this.usersService.token}`);
        return this.http.post('http://127.0.0.1:3000/posts/newPost', data, { headers })
            .pipe(
                map((response: Response) => {
                    const data = response.json();
                    return data;
                }),
                catchError((error: Response) => {
                    return throwError(JSON.parse(error.text()));
                })
            );
    }

    uploadImage(base64image: string, name: string) {
        var data = {
            base64image,
            name
        }
        let headers = new Headers();
        headers.append('x-auth', `${this.usersService.token}`);
        return this.http.post('http://127.0.0.1:3000/posts/uploadImage', data, { headers })
            .pipe(
                map((response: Response) => {
                    const data = response.json();
                    return data;
                }),
                catchError((error: Response) => {
                    return throwError(JSON.parse(error.text()));
                })
            );
    }

    searchPosts(filter: string) {
        return this.http.get('http://127.0.0.1:3000/posts/search', { params: { filter } })
            .pipe(
                map((response: Response) => {
                    const data = response.json();
                    return data;
                }),
                catchError((error: Response) => {
                    return throwError(JSON.parse(error.text()));
                })
            );
    }
}
