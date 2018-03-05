import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  constructor(private http: Http) { }

   getUserAlbums(queryParams): Observable<any> {
    return this.http.get('api/artists',{params:queryParams}).map(res => {
        var respBody = JSON.parse(res["_body"]);
        return respBody;
      }, error => {
        console.log(error); 
      });
   }
}
