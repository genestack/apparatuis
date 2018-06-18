```js
initialState = { value: true };
<div>
    <Checkbox
        onChange={(event, value) => setState({value})}
        isChecked={state.value}
    />

    <br />
    <Checkbox
        onChange={(event, value) => setState({value})}
        isChecked={state.value}
    >
        Label text
    </Checkbox>

    <br />
    <Checkbox
        isChecked
        isDisabled
    >
        Active and disabled
    </Checkbox>

    <br />
    <Checkbox
        isDisabled
        isChecked={false}
    >
        Inactive and disabled
    </Checkbox>
</div>
```
