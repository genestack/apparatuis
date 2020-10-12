### All button combinations

There is presented `Button` in all possible combinations below:

```js
const {DarkContext} = require('../../utils/dark-context');
const {ShareIcon} = require('../../icons/share-icon');
const {ArrowRightIcon} = require('../../icons/arrow-right-icon');

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

initialState = {
    component: 'button',
    shakeOnClick: false,
    fullScreen: false,
    inverted: false
};

const renderRadio = (stateKey, value, label) => (
    <label>
        <input
            type="radio"
            name={stateKey}
            value={value}
            checked={state[stateKey] === value}
            onChange={(event) => setState({[stateKey]: value})}
        />{' '}
        <Typography box="inline">{label}</Typography>
    </label>
);

const renderCheckbox = (stateKey, label) => (
    <label>
        <input
            type="checkbox"
            name={stateKey}
            checked={state[stateKey]}
            onChange={(event) => setState({[stateKey]: !state[stateKey]})}
        />{' '}
        <Typography box="inline">{label}</Typography>
    </label>
);

function ButtonWithShake(props) {
    const [shaking, setShaking] = React.useState(false);
    return (
        <Shake in={state.shakeOnClick && shaking} onEntered={() => setShaking(false)}>
            <Button {...props} onClick={() => setShaking(true)} />
        </Shake>
    );
}

function ButtonSamples(props) {
    return (
        <div>
            <Controls>
                <ControlsItem>
                    <ButtonWithShake {...props} component={state.component}>
                        {capitalize(props.intent || 'No intent') +
                            (props.ghost ? ' ghost ' : ' solid ')}
                    </ButtonWithShake>
                </ControlsItem>
                <ControlsItem>
                    <ButtonWithShake {...props} component={state.component} icon={<ShareIcon />} />
                </ControlsItem>
            </Controls>
            <Divider variant="transparent" />
            <ButtonWithShake {...props} component={state.component} icon={<ArrowRightIcon />}>
                {capitalize(props.intent || 'No intent') + (props.ghost ? ' ghost ' : ' solid ')}{' '}
                with icon
            </ButtonWithShake>
        </div>
    );
}

const IntentSection = (props) => <div style={{height: 67, paddingTop: 6}} {...props} />;

const ColumnSamples = (props) => (
    <div style={{position: 'relative', padding: '0 8px'}} {...props}>
        <div
            style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 40,
                background: state.inverted ? '#1C1717' : '#F3F5F7'
            }}
        />
        <div
            style={{
                position: 'absolute',
                left: 40,
                top: 0,
                bottom: 0,
                width: 40,
                background: state.inverted ? '#1C1717' : '#EBEDEF'
            }}
        />
        <div style={{position: 'relative'}}>{props.children}</div>
    </div>
);

const FullScreenPaper = (props) => (
    <RootElement
        style={{
            position: state.fullScreen ? 'fixed' : 'static',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            background: 'rgb(227,227,227)'
        }}
    >
        <Paper style={{minWidth: 0}} {...props}>
            {props.children}
        </Paper>
    </RootElement>
);

<DarkContext.Provider value={state.inverted}>
    <FullScreenPaper>
        <PageContent>
            <Controls>
                <ControlsItem>
                    <Typography>Render as</Typography>
                </ControlsItem>
                <ControlsItem>{renderRadio('component', 'button', 'Button')}</ControlsItem>
                <ControlsItem>{renderRadio('component', 'a', 'Link')}</ControlsItem>
                <ControlsItem>{renderRadio('component', 'div', 'Div')}</ControlsItem>
                <FlexExpander />
                <ControlsItem>{renderCheckbox('inverted', 'Inverted')}</ControlsItem>
                <ControlsItem>{renderCheckbox('shakeOnClick', 'Shake on click')}</ControlsItem>
                <ControlsItem>{renderCheckbox('fullScreen', 'Full Screen')}</ControlsItem>
            </Controls>
            <Controls align="baseline">
                <ControlsItem style={{padding: '16px 0', width: 100}}>
                    <WithSeparator separator={<Divider variant="transparent" gap={2} />}>
                        <Typography variant="section">Variant</Typography>
                        <IntentSection>
                            <Typography>Solid</Typography>
                        </IntentSection>
                        <IntentSection />
                        <IntentSection />
                        <IntentSection>
                            <Typography>Ghost</Typography>
                            <Typography variant="caption" intent="quiet">
                                Subtle variant for highly-loaded interfaces and toolbars.
                            </Typography>
                        </IntentSection>
                    </WithSeparator>
                </ControlsItem>
                <ControlsItem style={{padding: '16px 0', width: 110}}>
                    <WithSeparator separator={<Divider variant="transparent" gap={2} />}>
                        <Typography variant="section">Intent</Typography>
                        <IntentSection>
                            <Typography>No intent</Typography>
                        </IntentSection>
                        <IntentSection>
                            <Typography>Accent</Typography>
                            <Typography variant="caption" intent="quiet">
                                Indicate main action on the page, e.g. “Sign in”.
                            </Typography>
                        </IntentSection>
                        <IntentSection>
                            <Typography>Alarm</Typography>
                            <Typography variant="caption" intent="quiet">
                                Indicate potentially dangerous action, e.g. “delete”.
                            </Typography>
                        </IntentSection>
                        <IntentSection>
                            <Typography>No intent</Typography>
                        </IntentSection>
                        <IntentSection>
                            <Typography>Accent</Typography>
                        </IntentSection>
                        <IntentSection>
                            <Typography>Alarm</Typography>
                        </IntentSection>
                    </WithSeparator>
                </ControlsItem>
                <ControlsItem shrink>
                    <Controls style={{overflow: 'auto', padding: '16px 0'}}>
                        <ControlsItem>
                            <ColumnSamples>
                                <WithSeparator
                                    separator={<Divider variant="transparent" gap={2} />}
                                >
                                    <Typography>
                                        <i>Disabled</i>
                                    </Typography>
                                    <ButtonSamples disabled />
                                    <ButtonSamples intent="accent" disabled />
                                    <ButtonSamples intent="alarm" disabled />
                                    <ButtonSamples ghost disabled />
                                    <ButtonSamples ghost intent="accent" disabled />
                                    <ButtonSamples ghost intent="alarm" disabled />
                                </WithSeparator>
                            </ColumnSamples>
                        </ControlsItem>
                        <ControlsItem>
                            <ColumnSamples>
                                <WithSeparator
                                    separator={<Divider variant="transparent" gap={2} />}
                                >
                                    <Typography>
                                        <i>Normal</i>
                                    </Typography>
                                    <ButtonSamples />
                                    <ButtonSamples intent="accent" />
                                    <ButtonSamples intent="alarm" />
                                    <ButtonSamples ghost />
                                    <ButtonSamples ghost intent="accent" />
                                    <ButtonSamples ghost intent="alarm" />
                                </WithSeparator>
                            </ColumnSamples>
                        </ControlsItem>
                        <ControlsItem>
                            <ColumnSamples>
                                <WithSeparator
                                    separator={<Divider variant="transparent" gap={2} />}
                                >
                                    <Typography>
                                        <i>Hover</i>
                                    </Typography>
                                    <ButtonSamples hovered />
                                    <ButtonSamples intent="accent" hovered />
                                    <ButtonSamples intent="alarm" hovered />
                                    <ButtonSamples ghost hovered />
                                    <ButtonSamples ghost intent="accent" hovered />
                                    <ButtonSamples ghost intent="alarm" hovered />
                                </WithSeparator>
                            </ColumnSamples>
                        </ControlsItem>
                        <ControlsItem>
                            <ColumnSamples>
                                <WithSeparator
                                    separator={<Divider variant="transparent" gap={2} />}
                                >
                                    <Typography>
                                        <i>Focused</i>
                                    </Typography>
                                    <ButtonSamples focused />
                                    <ButtonSamples intent="accent" focused />
                                    <ButtonSamples intent="alarm" focused />
                                    <ButtonSamples ghost focused />
                                    <ButtonSamples ghost intent="accent" focused />
                                    <ButtonSamples ghost intent="alarm" focused />
                                </WithSeparator>
                            </ColumnSamples>
                        </ControlsItem>
                        <ControlsItem>
                            <ColumnSamples>
                                <WithSeparator
                                    separator={<Divider variant="transparent" gap={2} />}
                                >
                                    <Typography>
                                        <i>Active</i>
                                    </Typography>
                                    <ButtonSamples active />
                                    <ButtonSamples intent="accent" active />
                                    <ButtonSamples intent="alarm" active />
                                    <ButtonSamples ghost active />
                                    <ButtonSamples ghost intent="accent" active />
                                    <ButtonSamples ghost intent="alarm" active />
                                </WithSeparator>
                            </ColumnSamples>
                        </ControlsItem>
                    </Controls>
                </ControlsItem>
            </Controls>
        </PageContent>
    </FullScreenPaper>
</DarkContext.Provider>;
```
