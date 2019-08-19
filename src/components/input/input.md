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
    <ListItem
        as="label"
        interactive
        prepend={
            <input
                type="checkbox"
                checked={state[name]}
                onChange={(event) => setState({[name]: event.target.checked})}
            />
        }
    >
        {label}
    </ListItem>
);

renderRadio = (name, label, value) => (
    <ListItem
        as="label"
        interactive
        prepend={
            <input
                type="radio"
                name={name}
                value={value}
                checked={state[name] === value}
                onChange={(event) => setState({[name]: value})}
            />
        }
    >
        {label}
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
                <ControlsItem grow style={{textAlign: 'center'}}>
                    <label
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
                                state.spinner === 'none'
                                    ? undefined
                                    : state.spinner === 'permanent' ||
                                      (state.spinner === 'on-change' && state.loading)
                            }
                            prepend={state.showSearchIcon ? <SearchIcon /> : null}
                            append={state.showHelpIcon ? <HelpIcon /> : null}
                            placeholder={state.showPlaceholder ? 'Placeholder' : null}
                            disabled={state.disabled}
                            fullWidth={state.fullWidth}
                            readOnly={state.readOnly}
                            onClearButtonClick={handleClearButtonClick}
                        />
                    </label>
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
                                <ListItem>
                                    <Typography variant="section">Inner elements:</Typography>
                                </ListItem>
                                {renderCheckbox('showSearchIcon', 'Show Search Icon')}
                                {renderCheckbox('showHelpIcon', 'Show Help Icon')}
                                {renderCheckbox('clearable', 'Show Clear Button')}
                                <Divider />
                                <ListItem>
                                    <Typography variant="section">Spinner:</Typography>
                                </ListItem>
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

### Usage examples

```js
<Paper>
    <PageContent>
        <Controls>
            <ControlsItem as="label">
                <Typography box="paragraph">Label</Typography>
                <Input placeholder="Text" />
            </ControlsItem>
            <ControlsItem as="label">
                <Typography box="paragraph" variant="caption">
                    Label
                </Typography>
                <Input placeholder="Text" />
            </ControlsItem>

            <ControlsItem as="label">
                <Typography box="paragraph">
                    Label{' '}
                    <Typography box="inline" variant="caption" as="span" quiet>
                        optional
                    </Typography>
                </Typography>
                <Input placeholder="Text" />
            </ControlsItem>

            <ControlsItem>
                <Controls justify="space-between" align="baseline">
                    <ControlsItem>
                        <label htmlFor="password-input">
                            <Typography box="paragraph">Password</Typography>
                        </label>
                    </ControlsItem>
                    <ControlsItem>
                        <Typography variant="caption">
                            <Link tabIndex={0}>Restore</Link>
                        </Typography>
                    </ControlsItem>
                </Controls>

                <Input id="password-input" placeholder="Text" />
            </ControlsItem>
        </Controls>
        <Divider gap={2} variant="transparent" />
        <Controls gap={6}>
            <ControlsItem>
                <Controls as="label">
                    <ControlsItem>
                        <Typography>Label</Typography>
                    </ControlsItem>
                    <ControlsItem>
                        <Input placeholder="Text" />
                    </ControlsItem>
                </Controls>
            </ControlsItem>
            <ControlsItem>
                <Controls as="label">
                    <ControlsItem>
                        <Typography variant="caption">Label</Typography>
                    </ControlsItem>
                    <ControlsItem>
                        <Input placeholder="Text" />
                    </ControlsItem>
                </Controls>
            </ControlsItem>
        </Controls>
        <Divider gap={2} variant="transparent" />
        <Controls gap={6} as="form">
            <ControlsItem>
                <Input placeholder="Email" defaultValue="qwerty" type="email" />
                <Typography status="error" variant="caption" box="paragraph">
                    Enter correct email
                </Typography>
            </ControlsItem>
            <ControlsItem>
                <Input
                    placeholder="Password"
                    defaultValue="qwerty"
                    type="password"
                    autoComplete="off"
                />
                <Typography quiet variant="caption" box="paragraph">
                    Password must contain digits
                </Typography>
            </ControlsItem>
        </Controls>
        <Divider gap={2} variant="transparent" />
        <TooltipHandler tooltip={<Tooltip placement="right">Explanation text</Tooltip>}>
            <Input invalid placeholder="Text" />
        </TooltipHandler>
    </PageContent>
</Paper>
```
