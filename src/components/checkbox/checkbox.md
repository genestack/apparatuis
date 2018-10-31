```js
initialState = { value: true };
<div>
    <Checkbox
        onValueChange={(value) => setState({value})}
        checked={state.value}
    />

    <br />
    <Checkbox
        onValueChange={(value) => setState({value})}
        checked={state.value}
    >
        Label text
    </Checkbox>

    <br />
    <Checkbox checked disabled>
        Checked and disabled
    </Checkbox>

    <br />
    <Checkbox disabled>
        Unchecked and disabled
    </Checkbox>
</div>
```
