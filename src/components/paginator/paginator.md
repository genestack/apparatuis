```js
const [state, setState] = React.useState({offset: 0});
<Paginator
    offset={state.offset}
    itemsPerPage={10}
    itemsLength={113}
    onChange={(newOffset) => setState({offset: newOffset})}
/>;
```
