```js
const [state, setState] = React.useState({value: 'Hey!'});
<Textarea fullWidth value={state.value} onValueChange={(value) => setState({value})} />;
```
