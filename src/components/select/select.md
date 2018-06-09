```js
initialState = { value: null };
<Select
    placeholder="Select attribute..."
    options={[{value: 2, label: 'Option 1'}, {value:3, label: 'Option 2'}, {value: 4, label: 'Option 3'}, ]}
    value={this.state.value}
    onChange={(event, value) => this.setState({value})}
/>
```
