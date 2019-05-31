```js
const {DarkContext} = require('../../utils/dark-context.ts');
const {SearchIcon} = require('../../icons/search-icon.tsx');

timeout = null;

initialState = {
    inverted: false,
    showPlaceholder: false,
    fullWidth: false,
    showSearchIcon: false,
    disabled: false,
    showClearButton: false,
    invalid: false,
    required: false,
    readOnly: false,
    type: 'text',
    spinner: 'none',
    value: '',
    loading: false
};

renderCheckbox = (name, label) => (
    <ListItem as="label">
        <ListItemCell>
            <input
                type="checkbox"
                checked={state[name]}
                onChange={(event) => setState({[name]: event.target.checked})}
            />
        </ListItemCell>
        <ListItemText>{label}</ListItemText>
    </ListItem>
);

renderRadio = (name, label, value) => (
    <ListItem as="label">
        <ListItemCell>
            <input
                type="radio"
                name={name}
                value={value}
                checked={state[name] === value}
                onChange={(event) => setState({[name]: value})}
            />
        </ListItemCell>
        <ListItemText>{label}</ListItemText>
    </ListItem>
);

handleValueChange = (value) => {
    clearTimeout(timeout);
    setState({value, loading: true}, () => {
        timeout = setTimeout(() => setState({loading: false}), 2000);
    });
};

handleClearButtonClick = () => setState({value: ''});

<DarkContext.Provider value={state.inverted}>
    <Paper style={{background: state.inverted ? '#252E42' : '#FFF'}}>
        <PageContent>
            <Controls>
                <ControlsItem grow style={{textAlign: 'center'}} as="label">
                    <div
                        style={{
                            display: state.fullWidth ? 'block' : 'inline-block',
                            textAlign: 'left'
                        }}
                    >
                        <Typography variant="section" box="paragraph">
                            Input
                        </Typography>
                        <Input
                            type={state.type}
                            value={state.value}
                            invalid={state.invalid || undefined}
                            required={state.required}
                            onValueChange={handleValueChange}
                            onClearButtonClick={
                                state.showClearButton ? handleClearButtonClick : null
                            }
                            loading={
                                state.spinner === 'permanent' ||
                                (state.spinner === 'on-change' && state.loading)
                            }
                            style={!state.fullWidth ? {width: 200} : null}
                            prepend={state.showSearchIcon ? <SearchIcon /> : null}
                            placeholder={state.showPlaceholder ? 'Placeholder' : null}
                            disabled={state.disabled}
                            fullWidth={state.fullWidth}
                            readOnly={state.readOnly}
                        />
                    </div>
                </ControlsItem>
                <ControlsItem>
                    <DarkContext.Provider value={false}>
                        <Paper>
                            <List>
                                {renderCheckbox('inverted', 'Inverted')}
                                {renderCheckbox('showPlaceholder', 'Show Placeholder')}
                                {renderCheckbox('fullWidth', 'Full Width')}
                                {renderCheckbox('showSearchIcon', 'Show Search Icon')}
                                {renderCheckbox('disabled', 'Disabled')}
                                {renderCheckbox('showClearButton', 'Show Clear Button')}
                                {renderCheckbox('invalid', 'Invalid')}
                                {renderCheckbox('required', 'Required')}
                                {renderCheckbox('readOnly', 'Read Only')}
                                <Divider />
                                <ListLabel>
                                    <ListItemText variant="section">Type:</ListItemText>
                                </ListLabel>
                                {renderRadio('type', 'Text', 'text')}
                                {renderRadio('type', 'Number', 'number')}
                                <Divider />
                                <ListLabel>
                                    <ListItemText variant="section">Spinner:</ListItemText>
                                </ListLabel>
                                {renderRadio('spinner', 'None', 'none')}
                                {renderRadio('spinner', 'Show on value change', 'on-change')}
                                {renderRadio('spinner', 'Permanent', 'permanent')}
                            </List>
                        </Paper>
                    </DarkContext.Provider>
                </ControlsItem>
            </Controls>
        </PageContent>
    </Paper>
</DarkContext.Provider>;
```
