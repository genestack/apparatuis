```js
const Select = require('./select').default;
initialState = { value: null };

const options = [
    {value: true, label: 'Option 1 (Boolean, true)'},
    {value: "false", label: 'Option 2 (String, "false")'},
    {value: 1, label: 'Option 3 (Integer, 1)'},
    {value: "2", label: 'Option 4 (String, "2")'}
];

<div>
    <p>
        <Select
            placeholder="Select attribute..."
            options={options}
            value={state.value}
            onValueChange={(value) => setState({value})}
        />
    </p>

    <p>
        <Select
            placeholder="Select attribute..."
            options={options}
            value={state.value}
            onValueChange={(value) => setState({value})}
            disabled
        />
    </p>

    <p>
        <Select
            placeholder="Select attribute..."
            options={options}
            value={state.value}
            onValueChange={(value) => setState({value})}
            hasError
        />
    </p>

    <p>
        <Select
            placeholder="Select attribute..."
            options={options}
            value={state.value}
            onValueChange={(value) => setState({value})}
            hasError
            disabled
        />
    </p>

    <p>
        <Select
            placeholder="Select attribute..."
            options={options}
            value={state.value}
            onValueChange={(value) => setState({value})}
            required
        />
    </p>
</div>
```
