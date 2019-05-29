```js
const {DarkContext} = require('../../utils/dark-context');

initialState = {
    inverted: false
};

handleInvertedChange = (event) => setState({inverted: event.currentTarget.checked});

<RootElement>
    <PageContent>
        <Controls as="label">
            <ControlsItem>
                <input type="checkbox" checked={state.inverted} onChange={handleInvertedChange} />
            </ControlsItem>
            <ControlsItem>
                <Typography>Inverted</Typography>
            </ControlsItem>
        </Controls>
    </PageContent>
    <Paper style={{background: state.inverted ? '#252E42' : '#FFF'}}>
        <PageContent>
            <DarkContext.Provider value={state.inverted}>
                <WithSeparator separator={<Divider gap={2} variant="transparent" />}>
                    <Controls>
                        <ControlsItem>
                            <Link disabled tabIndex={0}>
                                Common Link (p)
                            </Link>
                        </ControlsItem>
                        <ControlsItem>
                            <Link tabIndex={0}>Common Link (p)</Link>
                        </ControlsItem>
                        <ControlsItem focus>
                            <Link focus>Common Link (p)</Link>
                        </ControlsItem>
                    </Controls>
                    <Controls>
                        <ControlsItem>
                            <Link variant="pseudo" disabled tabIndex={0}>
                                Pseudo Link (p)
                            </Link>
                        </ControlsItem>
                        <ControlsItem>
                            <Link variant="pseudo" tabIndex={0}>
                                Pseudo Link (p)
                            </Link>
                        </ControlsItem>
                        <ControlsItem focus>
                            <Link variant="pseudo" focus>
                                Pseudo Link (p)
                            </Link>
                        </ControlsItem>
                    </Controls>
                    <Controls>
                        <ControlsItem>
                            <Link variant="external" disabled tabIndex={0}>
                                External Link (p)
                            </Link>
                        </ControlsItem>
                        <ControlsItem>
                            <Link variant="external" tabIndex={0}>
                                External Link (p)
                            </Link>
                        </ControlsItem>
                        <ControlsItem focus>
                            <Link variant="external" focus>
                                External Link (p)
                            </Link>
                        </ControlsItem>
                    </Controls>
                    <React.Fragment>
                        <Typography variant="title" box="paragraph">
                            Super{' '}
                            <Link variant="pseudo" tabIndex={0}>
                                Pseudo Link (p)
                            </Link>{' '}
                            in title
                        </Typography>
                        <Typography variant="caption" box="paragraph" style={{width: 200}}>
                            Caption{' '}
                            <Link variant="external" tabIndex={0}>
                                External Link (p)
                            </Link>{' '}
                            in caption. Break lines at this caption.
                        </Typography>
                        <Typography variant="section" box="paragraph" style={{width: 200}}>
                            Try to break{' '}
                            <Link variant="pseudo" tabIndex={0}>
                                Pseudo Link (p) with long content
                            </Link>{' '}
                            to see how it works on many lines
                        </Typography>
                    </React.Fragment>
                </WithSeparator>
            </DarkContext.Provider>
        </PageContent>
    </Paper>
</RootElement>;
```

### Ellipsis links

To support text overflowing link requires to be some kind of block element
instead of inline. So when link is a block element its auto height equals its `line-height` value
and bottom border (aka. underline) shifts to wrong position.
To fix this you must add real height to link in place:

```js
<RootElement>
    <Paper>
        <PageContent>
            <div style={{width: 200}}>
                <Link
                    variant="pseudo"
                    ellipsis
                    style={{
                        width: 100,
                        display: 'inline-block',
                        height: 20,
                        verticalAlign: 'bottom'
                    }}
                >
                    Ellipsis link (p) with long content
                </Link>{' '}
                that is near inline elements
            </div>
        </PageContent>
    </Paper>
</RootElement>
```
