```js

initialState = { value: true };
<div>
    <Checkbox
        ref={ref => this.checkbox = ref}
        onChange={(event, value) => {
            setState({value});
            shake(this.checkbox);
        }}
        checked={state.value}
    />
</div>
```
