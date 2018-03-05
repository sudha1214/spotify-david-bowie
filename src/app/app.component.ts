import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './app.services';
import { PaginationService } from './paginationService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ SpotifyService,PaginationService ]
})
export class AppComponent implements OnInit{

  constructor(private spotifyService: SpotifyService, private paginationService: PaginationService) { }

  title = 'David Bowie Album App';
  users;
  offset = 0;
  limit = 10;
  numOfAlbums;
  pageSize = 10;
  currentPage;
  pageObject: any = {}; // pager object
  error

  ngOnInit() {
    this.getAlbums();
  }
  //onPageClick, get the next 10 albums of the user.
  onPageClick(pageNum: number) {
    this.setPage(pageNum);
    this.offset = (pageNum - 1) * 10 ;
    this.getAlbums();

  }
  //set the pagination.
  setPage(page: number) {
    if (page < 1 || page > this.pageObject.totalPages) {
        return;
    }
    // get pager object from service
    this.pageObject = this.paginationService.getPager(this.numOfAlbums, page, this.pageSize);
    this.currentPage = page;

  }
  getAlbums() {
    let params = {'offset': this.offset, 'limit':this.limit};

    this.spotifyService.getUserAlbums(params).subscribe(res => {
      this.users = res.items;
      this.numOfAlbums = res.total;
      // set to current page.
      if(!this.currentPage) {
        this.setPage(1);
      }
    }, error => {
      this.error = error.message;
      console.log(error);
    });
  }

}
