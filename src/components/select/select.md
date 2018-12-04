```js
const Select = require('./select').default;
initialState = {value: null};

const options = [
    {value: true, label: 'Option 1 (Boolean, true)'},
    {value: 'true', label: 'Option 2 (String, "true")'},
    {value: 1, label: 'Option 3 (Integer, 1)'},
    {value: '1', label: 'Option 4 (String, "1")'}
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
</div>;
```
