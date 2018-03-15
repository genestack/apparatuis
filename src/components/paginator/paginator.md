```js
initialState = { offset: 0 };
<Paginator
    offset={state.offset}
    itemsPerPage={10}
    itemsLength={113}
    handlePageChange={(newPage) => setState({offset: newPage})}
/>
```
