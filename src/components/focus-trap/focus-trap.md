Once user focuses to any trapped input he could not focus out from the trap by `Tab` key.

```js
const Row = (props) => <div style={{...props.style, marginBottom: 8}} {...props} />;

const focusTrapStyle = {
    boxSizing: 'border-box',
    margin: '0 -10px 8px',
    border: '2px solid',
    padding: '8px 8px 0'
};

initialState = {
    enableSelfFocus: false
};

handleCheckboxChange = (enableSelfFocus) => setState({enableSelfFocus});

<React.Fragment>
    <Row>
        <Input placeholder="First Free Input" />
    </Row>
    <Row style={{display: 'flex', justifyContent: 'space-between', margin: '16px 0'}}>
        <Typography>Focus for the next inputs is trapped:</Typography>
        <label>
            <Typography box="inline">Enable container focus: </Typography>
            <Checkbox checked={state.enableSelfFocus} onValueChange={handleCheckboxChange} />
        </label>
    </Row>
    <FocusTrap>
        <div style={focusTrapStyle} tabIndex={state.enableSelfFocus ? 0 : -1}>
            <Row>
                <Input placeholder="First Trapped Input" />
            </Row>
            <Row>
                <Input placeholder="Second Trapped Input" />
            </Row>
            <Row>
                <Input placeholder="Last Trapped Input" />
            </Row>
        </div>
    </FocusTrap>
    <Row>
        <Input placeholder="Last Free Input" />
    </Row>
</React.Fragment>;
```
