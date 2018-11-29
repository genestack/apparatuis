```js
const Input = require('./input).default;
initialState = { value: '' };
<div>
    <Input
        onChange={(event, value) => setState({value})}
        value={state.value}
    />
        <Input
            onChange={(event, value) => setState({value})}
            value={state.value}
        />
    <br />
    value: {state.value}
    <br />
    <br />
    With an error:
    <Input
        onChange={(event, value) => setState({value})}
        value={state.value}
        hasError
    />
</div>
```
