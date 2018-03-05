export class PaginationService {
    getPager(totalAlbums: number, currentPage: number = 1, pageSize: number = 10) {
        // calculate total pages
        let totalPages = Math.ceil(totalAlbums / pageSize);
 
        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
 
        // create an array of pages to ng-repeat in the pager control
        let pages = this.range(startPage, endPage + 1);
 
        // return object with all pager properties required by the view
        return {
            totalItems: totalAlbums,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            pages: pages
        };
    }

    range(start,end){
        var list = [];
        for (var i = start; i < end; i++) {
            list.push(i);
        }
        return list;
    }
}
