import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { snakeCase } from 'change-case';

import { ConfigService } from './configService';

/**
 * 伺服器服務
 */
@Injectable()
export class AppService {
    apiUrl: string;

    constructor(
        private http: HttpClient,
        private config: ConfigService
    ) {
        this.apiUrl = this.config.get('apiUrl');
    }

    getThreads(): Observable<IPost[]> {
        return this.http.get<IPost[]>(this.apiUrl + 'threads');
    }

    getThread(id: number): Observable<IPost> {
        return this.http.get<IPost>(this.apiUrl + 'threads/' + id);
    }

    createPost(model: ICreatePostModel, recaptchaToken: string): Observable<IPost> {
        return new Observable((observer: Observer<IPost>) => {
            var formData: FormData = new FormData();
            var xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append('g-recaptcha-response', recaptchaToken);
            // Type guard to ensure model key access is safe or cast to any
            for (let i in model) {
                const key = i as keyof ICreatePostModel;
                const value = model[key];
                if (!value)
                    continue;
                // value can be File or string or number.
                // FormData.append takes Blob (File is Blob) or string.
                // number should be converted to string.
                if (value instanceof File) {
                    formData.append(`post[${snakeCase(i)}]`, value);
                } else {
                    formData.append(`post[${snakeCase(i)}]`, String(value));
                }
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (200 <= xhr.status && xhr.status <= 299) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.open('POST', this.apiUrl + 'posts', true);
            xhr.send(formData);
        });
    }
}

export interface IPost {
    id: number;
    parentPostId?: number;
    title: string;
    author: string;
    tripcode?: string;
    email: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    image?: {
        dimensions: number[];
        fileName: string;
        fileSize: number;
        urlOrig: string;
        urlMedium: string;
        urlSmall: string;
    };
    identityHash: string;
    message: string;
    locked?: boolean;
    admin?: boolean;
    replies?: IPost[];
    replyCount?: number;
}

export interface ICreatePostModel {
    title?: string;
    author?: string;
    email?: string;
    message?: string;
    parentPostId?: number;
    image?: File;
}
