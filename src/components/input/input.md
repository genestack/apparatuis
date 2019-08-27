```js
const {
    Presentation,
    usePresentation,
    PresentationControls,
    PresentationState,
    PresentationPane
} = require('../../../styleguide-components/presentation');

const {SearchIcon} = require('../../icons/search-icon.tsx');
const {HelpIcon} = require('../../icons/help-icon.tsx');

function InputExample(props) {
    const presentation = usePresentation();

    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState('');
    const timeoutRef = React.useRef(null);

    const handleValueChange = (value) => {
        if (value) {
            clearTimeout(timeoutRef.current);
        }

        setValue(value);
        setLoading(!!value);
        timeoutRef.current = setTimeout(() => setLoading(false), 2000);
    };

    return (
        <React.Fragment>
            <Typography variant="section" box="paragraph">
                Input
            </Typography>
            <Input
                value={value}
                invalid={presentation.invalid || undefined}
                required={presentation.required}
                onValueChange={handleValueChange}
                clearable={presentation.clearable}
                loading={
                    presentation.spinner === 'permanent' ||
                    (presentation.spinner === 'on-change' && loading)
                }
                prepend={presentation.showSearchIcon ? <SearchIcon /> : null}
                append={presentation.showHelpIcon ? <HelpIcon /> : null}
                placeholder={presentation.showPlaceholder ? 'Placeholder' : null}
                disabled={presentation.disabled}
                fullWidth={presentation.fullWidth}
                readOnly={presentation.readOnly}
                onClearButtonClick={() => handleValueChange('')}
                inputProps={{
                    style: {
                        background: presentation.simulateAutofill ? '#E8F0FE' : 'transparent'
                    }
                }}
            />
        </React.Fragment>
    );
}

<Presentation
    initialState={{
        spinner: 'none'
    }}
>
    <PresentationPane>
        <InputExample />
    </PresentationPane>
    <PresentationControls>
        <PresentationState name="inverted" label="Inverted" />
        <PresentationState name="showPlaceholder" label="Show Placeholder" />
        <PresentationState name="fullWidth" label="Full Width" />
        <PresentationState name="disabled" label="Disabled" />
        <PresentationState name="invalid" label="Invalid" />
        <PresentationState name="required" label="Required" />
        <PresentationState name="readOnly" label="Read Only" />
        <PresentationState name="simulateAutofill" label="Simulate auto-fill" />
        <Divider />
        <ListItem>
            <Typography variant="section">Inner elements:</Typography>
        </ListItem>
        <PresentationState name="showSearchIcon" label="Show Search Icon" />
        <PresentationState name="showHelpIcon" label="Show Help Icon" />
        <PresentationState name="clearable" label="Show Clear Button" />
        <Divider />
        <ListItem>
            <Typography variant="section">Spinner:</Typography>
        </ListItem>
        <PresentationState name="spinner" value="none" label="None" />
        <PresentationState name="spinner" value="on-change" label="Show on value change" />
        <PresentationState name="spinner" value="permanent" label="Permanent" />
    </PresentationControls>
</Presentation>;
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
        <Controls gap={4}>
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
        <Controls gap={4} as="form">
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

### Auto-filled input

```js
const {SearchIcon} = require('../../icons/search-icon.tsx');

<RootElement>
    <PageContent>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <Paper style={{width: 320}}>
                <PageContent>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Typography box="paragraph">
                            Fill fields and click to the key icon in the address bar to save
                            credentials and enabling auto-fill.
                        </Typography>

                        <Typography box="paragraph" style={{marginTop: 12}}>
                            Email
                        </Typography>
                        <Input fullWidth type="email" name="email" autoComplete="username" />

                        <Typography box="paragraph" style={{marginTop: 12}}>
                            Password
                        </Typography>

                        <Input
                            fullWidth
                            type="password"
                            name="password"
                            autoComplete="current-password"
                        />

                        <Typography box="paragraph" style={{marginTop: 20}}>
                            <Button type="submit" intent="accent">
                                Submit
                            </Button>
                        </Typography>
                    </form>
                </PageContent>
            </Paper>
        </div>
    </PageContent>
</RootElement>;
```
