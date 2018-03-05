import { TestBed, async, inject } from '@angular/core/testing';
import { Http, HttpModule, Response, ResponseOptions, XHRBackend} from '@angular/http';
import { AppComponent } from './app.component';
import { MockBackend } from '@angular/http/testing';
import { SpotifyService } from './app.services';
import { albumsMockData } from './mockData/mockData'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ HttpModule ],
      declarations: [
        AppComponent
      ],
      providers: [
        SpotifyService, { provide: XHRBackend, useClass: MockBackend }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'David Bowie Album App'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('David Bowie Album App');
  }));
  it('should render title in a h6 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h6').textContent.trim()).toEqual('Welcome to David Bowie Album App!');
  }));
  it('WithoutPagination: should return an <Array<Albums>>' ,
        inject([SpotifyService, XHRBackend], (spotifyService, mockBackend) => {
       const fixture = TestBed.createComponent(AppComponent);
       let albumDetails = {
          "name": "Greatest Hits II (2011 Remaster)",
          "external_urls": {
          "spotify": "https://open.spotify.com/album/3enuKERSauyNFVTa2n0t7S"
          },
          "image":{
            "height": 300,
            "url": "https://i.scdn.co/image/0ad000bf3eb03c857b0eac07d977b80ce1967a0c",
            "width": 300
          },
          "total":10
        };
        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(albumsMockData[0])
          })));
        });
        spotifyService.getUserAlbums().subscribe((albums) => {
          let response = albums.items;

          expect(response.length).toBe(1);
          expect(response[0].name).toBe(albumDetails.name);
          expect(response[0].external_urls.spotify).toBe(albumDetails.external_urls.spotify);
          expect(response[0].images[1].url).toBe(albumDetails.image.url);
          expect(albums.total).toBe(albumDetails.total);
        });
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.albumName').textContent.trim()).toEqual("Greatest Hits II (2011 Remaster)");
        expect(compiled.querySelector('ul')).toEqual(null)
  }));
  it('Pagination : should return Albums array ' ,
        inject([SpotifyService, XHRBackend], (spotifyService, mockBackend) => {
       const fixture = TestBed.createComponent(AppComponent);
       let albumDetails = {
          "name": "Greatest Hits II (2011 Remaster)",
          "external_urls": {
          "spotify": "https://open.spotify.com/album/3enuKERSauyNFVTa2n0t7S"
          },
          "image":{
            "height": 300,
            "url": "https://i.scdn.co/image/0ad000bf3eb03c857b0eac07d977b80ce1967a0c",
            "width": 300
          },
          "total":20
        };
        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(albumsMockData[1])
          })));
        });
        spotifyService.getUserAlbums().subscribe((albums) => {
          let response = albums.items;
          expect(response.length).toBe(1);
          expect(response[0].name).toBe(albumDetails.name);
          expect(response[0].external_urls.spotify).toBe(albumDetails.external_urls.spotify);
          expect(response[0].images[1].url).toBe(albumDetails.image.url);
          expect(albums.total).toBe(albumDetails.total);
        });
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.albumName').textContent.trim()).toEqual("Greatest Hits II (2011 Remaster)");
        expect(compiled.querySelector('ul').textContent.trim()).toContain('First');
        var liElements = compiled.querySelector('ul')
        expect(liElements.querySelectorAll('li').length).toEqual(6);
  }));
  /*it('should return error' ,
    inject([SpotifyService, XHRBackend], (spotifyService, mockBackend) => {
      const fixture = TestBed.createComponent(AppComponent);
      mockBackend.connections.subscribe((connection) => {
        connection.mockError(new Error('error'));
    });
    spotifyService.getUserAlbums().subscribe((albums) => {
      expect(albums.error).toEqual('400');
    });
  }));*/
});
