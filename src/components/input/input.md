```js
const {DarkContext} = require('../../utils/dark-context.ts');
const {SearchIcon} = require('../../icons/search-icon.tsx');
const {HelpIcon} = require('../../icons/help-icon.tsx');

timeout = null;

initialState = {
    inverted: false,
    showPlaceholder: false,
    fullWidth: false,
    showSearchIcon: false,
    showHelpIcon: false,
    disabled: false,
    clearable: false,
    invalid: false,
    required: false,
    readOnly: false,
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
    if (value) {
        clearTimeout(timeout);
    }

    setState({value, loading: !!value}, () => {
        if (value) {
            timeout = setTimeout(() => setState({loading: false}), 2000);
        }
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
                            value={state.value}
                            invalid={state.invalid || undefined}
                            required={state.required}
                            onValueChange={handleValueChange}
                            clearable={state.clearable}
                            loading={
                                state.spinner === 'permanent' ||
                                (state.spinner === 'on-change' && state.loading)
                            }
                            prepend={state.showSearchIcon ? <SearchIcon /> : null}
                            append={state.showHelpIcon ? <HelpIcon /> : null}
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
                                {renderCheckbox('disabled', 'Disabled')}
                                {renderCheckbox('invalid', 'Invalid')}
                                {renderCheckbox('required', 'Required')}
                                {renderCheckbox('readOnly', 'Read Only')}
                                <Divider />
                                <ListLabel>
                                    <ListItemText variant="section">Inner elements:</ListItemText>
                                </ListLabel>
                                {renderCheckbox('showSearchIcon', 'Show Search Icon')}
                                {renderCheckbox('showHelpIcon', 'Show Help Icon')}
                                {renderCheckbox('clearable', 'Show Clear Button')}
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
