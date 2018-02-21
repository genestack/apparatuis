```js
initialState = { value: '' };
<div>
    <Input
        onChange={(event, value) => setState({value})}
        value={state.value}
    />
    <br />
    value: {state.value}
</div>
```
