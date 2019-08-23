import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Http, Response, Headers } from '@angular/http';
import { map, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    user: any;
    token: any;

    constructor(private cookieService: CookieService,
        private http: Http) { }

    checkLoggedIn() {
        if (this.cookieService.get('user')) {
            this.user = JSON.parse(this.cookieService.get('user'));
            this.token = JSON.parse(this.cookieService.get('token'));
        }
        return this.user;
    }

    setUser(user: any) {
        this.user = user;
        this.cookieService.set('user', JSON.stringify(user));
        this.cookieService.set('token', JSON.stringify(this.token));
    }

    removeUser() {
        this.user = null;
        this.token = null;
        this.cookieService.delete('user');
        this.cookieService.delete('token');
    }

    getUserId() {
        if (this.user)
            return this.user._id;
        else
            return undefined;
    }

    login(username: string, password: string) {
        var user = {
            username: username,
            password: password
        }
        return this.http.post('https://instagram-internship.herokuapp.com/users/login', user)
            .pipe(
                map((response: Response) => {
                    this.token = response.headers.get('x-auth');
                    this.cookieService.set('token', JSON.stringify(this.token));
                    const data = response.json();
                    return data;
                }),
                catchError((error: Response) => {
                    return throwError(JSON.parse(error.text()));
                })
            );
    }

    registration(username: string, password: string, name: string, imageUrl: string) {
        var user = {
            username,
            password,
            name,
            imageUrl
        }
        return this.http.post('https://instagram-internship.herokuapp.com/users/registration', user)
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

    getUserInfo(userId: string) {
        let headers = new Headers();
        headers.append('x-auth', `${this.token}`);

        return this.http.get('https://instagram-internship.herokuapp.com/users/informations', {
            params: { 'userId': userId },
            headers
        })
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

    getUserPosts(userId: string) {
        let headers = new Headers();
        headers.append('x-auth', `${this.token}`);

        return this.http.get(`https://instagram-internship.herokuapp.com/users/posts/${userId}`, { headers })
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

    searchUsers(filter: string) {
        return this.http.get('https://instagram-internship.herokuapp.com/users/search/', { params: { filter } })
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

    followUser(userId: string, flag: string) {
        let headers = new Headers();
        headers.append('x-auth', `${this.token}`);
        return this.http.patch(`https://instagram-internship.herokuapp.com/users/follow/${flag}/${userId}`,
            {}, { headers })
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

    logout() {
        let headers = new Headers();
        headers.append('x-auth', `${this.token}`);

        return this.http.delete('https://instagram-internship.herokuapp.com/users/logout', { headers })
            .pipe(
                catchError((error: Response) => {
                    return throwError(error);
                })
            );
    }


}
