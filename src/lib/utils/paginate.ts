export const paginate = (currentPage, totalPages) => {
    let endPage = totalPages;
    
    let pages = [];
    if (currentPage >= totalPages - 3 && totalPages > 3) {
        totalPages != 4 && pages.push(1);
        totalPages != 4 && pages.push('...');
        for (let i =totalPages - 3; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        let limit = 3;
        endPage < limit && (limit = endPage);
        if(totalPages <= 3){
            for (let i = 1; i <= limit; i++) {
                pages.push(i);
            }
        }else{
            for (let i = currentPage; i < currentPage + limit; i++) {
                pages.push(i);
            }
        }

        if (endPage > 3) {
            pages.push('...');
            pages.push(endPage);
        }
    }
    return pages;
}