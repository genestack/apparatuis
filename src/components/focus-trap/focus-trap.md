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

<PageContent as={Paper}>
    <Row>
        <Input placeholder="First Free Input" />
    </Row>
    <Row>
        <Controls justify="space-between">
            <ControlsItem>
                <Typography>Focus for the next inputs is trapped:</Typography>
            </ControlsItem>
            <ControlsItem>
                <Controls align="center">
                    <ControlsItem>
                        <Typography as="span" box="inline">
                            Enable container focus:{' '}
                        </Typography>
                    </ControlsItem>
                    <ControlsItem>
                        <input
                            type="checkbox"
                            checked={state.enableSelfFocus}
                            onChange={(event) => handleCheckboxChange(event.target.checked)}
                            style={{margin: 0, display: 'flex'}}
                        />
                    </ControlsItem>
                </Controls>
            </ControlsItem>
        </Controls>
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
</PageContent>;
```
