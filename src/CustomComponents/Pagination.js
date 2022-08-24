const PaginationSection = props => {
    const { totalDataLength, currentPage, onPageChange, pageLimit } = props;
    let pageSize = Math.ceil(totalDataLength/pageLimit)
    const pagenumbers = Array(pageSize).fill(0).map((_, i) => i);
    const pageClick = (count) => {
        onPageChange(count)
    }
    return (
        <ul className="pagination">
            {

                pagenumbers.map((page, i) => {
                    if (currentPage == i + 1) {
                        return (
                            <li key={i} onClick={() => pageClick(i + 1)}>
                                <a className="active customCursor">{page + 1}</a>
                            </li>
                        )
                    }
                    return (
                        <li className="customCursor" key={i} onClick={() => pageClick(i + 1)} >
                            <a>{page + 1}</a>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default PaginationSection;