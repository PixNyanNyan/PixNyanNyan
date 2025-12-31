import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, firstValueFrom } from 'rxjs';

@Injectable()
export class ConfigService {
    private _config: any;

    constructor(private http: HttpClient) {
    }

    load() {
        // Modern Angular APP_INITIALIZER expects a Promise or Observable.
        return firstValueFrom(this.http.get('config.json')).then(res => {
             this._config = res;
             return true;
        });
    }

    get(key: string) {
        return this._config[key];
    }
}
