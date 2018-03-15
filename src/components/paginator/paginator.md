```js
initialState = { currentPage: 0 };
<Paginator
    pagesLength={10}
    currentPage={state.currentPage}
    handlePageChange={(newPage) => setState({currentPage: newPage})}
/>
```
