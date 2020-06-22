import React from 'react';

export default function Paginator(props) {
    function getPaginatorElements(totalCount) {
        const pageElements = [];
        totalCount = Math.ceil(totalCount / 10);
        if (totalCount > 10) {
            totalCount = 10;
        }

        for (let i = 0; i < totalCount; ++i) {
            const element = (
                <button
                    className={'page-element'}
                    onClick={handlePageElementClick}
                    style={{ background: i === props.currentPage - 1 ? 'darkgray' : 'lightgray' }}
                    value={i + 1}>
                    {i + 1}
                </button>
            );
            pageElements.push(element);
        }

        return pageElements;
    }

    function handlePageElementClick(event) {
        event.preventDefault();
        console.log(event.target.value);
        props.handleElementChanged(Number(event.target.value));
    }

    return <div className={'paginator'}>{getPaginatorElements(props.totalCount)}</div>;
}
