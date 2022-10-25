import { environment } from '../../environments/environment';
import { Library } from '../shared/library';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LibrariesService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + environment.apiPath + '/libraries';
  }

  getLibraries() {
    return this.http.get<Library[]>(this.apiUrl);
  }

  getLibrary(lib: number) {
    return this.http.get<Library>(this.apiUrl + '/' + lib);
  }

}
