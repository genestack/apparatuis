```js
initialState = { value: null };
<div>
    <Select
        placeholder="Select attribute..."
        options={[{value: 2, label: 'Option 1'}, {value:3, label: 'Option 2'}, {value: 4, label: 'Option 3'}, ]}
        value={state.value}
        onChange={(event, value) => setState({value})}
    />
    <br />
    <Select
        placeholder="Select attribute..."
        options={[{value: 2, label: 'Option 1'}, {value:3, label: 'Option 2'}, {value: 4, label: 'Option 3'}, ]}
        value={state.value}
        onChange={(event, value) => setState({value})}
        isDisabled
    />
    <br />
    <Select
        placeholder="Select attribute..."
        options={[{value: 2, label: 'Option 1'}, {value:3, label: 'Option 2'}, {value: 4, label: 'Option 3'}, ]}
        value={state.value}
        onChange={(event, value) => setState({value})}
        hasError
    />
    <br />
    <Select
        placeholder="Select attribute..."
        options={[{value: 2, label: 'Option 1'}, {value:3, label: 'Option 2'}, {value: 4, label: 'Option 3'}, ]}
        value={state.value}
        onChange={(event, value) => setState({value})}
        hasError
        isDisabled
    />
</div>
```
