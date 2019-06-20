```js
const {DarkContext} = require('../../utils/dark-context');
const {DownloadIcon} = require('../../icons/download-icon');

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
                                Common Disabled
                            </Link>
                        </ControlsItem>
                        <ControlsItem>
                            <Link tabIndex={0}>Common Link (qp)</Link>
                        </ControlsItem>
                        <ControlsItem>
                            <Link focus>Common Focused</Link>
                        </ControlsItem>
                    </Controls>
                    <Controls>
                        <ControlsItem>
                            <Link variant="pseudo" disabled tabIndex={0}>
                                Pseudo Disabled
                            </Link>
                        </ControlsItem>
                        <ControlsItem>
                            <Link variant="pseudo" tabIndex={0}>
                                Pseudo Link (qp)
                            </Link>
                        </ControlsItem>
                        <ControlsItem>
                            <Link variant="pseudo" focus>
                                Pseudo focused
                            </Link>
                        </ControlsItem>
                    </Controls>
                    <Controls>
                        <ControlsItem>
                            <Link variant="external" disabled tabIndex={0}>
                                External Disabled
                            </Link>
                        </ControlsItem>
                        <ControlsItem>
                            <Link variant="external" tabIndex={0}>
                                External Link (qp)
                            </Link>
                        </ControlsItem>
                        <ControlsItem>
                            <Link variant="external" focus>
                                External Focused
                            </Link>
                        </ControlsItem>
                    </Controls>
                    <React.Fragment>
                        <Typography variant="title" box="paragraph">
                            41 letters:{' '}
                            <Link variant="pseudo" tabIndex={0}>
                                By Jove, my quick study of lexicography won a prize
                            </Link>{' '}
                            (Includes proper noun)
                        </Typography>
                        <Typography variant="caption" box="paragraph" style={{width: 200}}>
                            Public junk dwarves quiz mighty fox.{' '}
                            <Link variant="external" tabIndex={0}>
                                Amazingly few discotheques provide jukeboxes.
                            </Link>{' '}
                            Break lines at this caption.
                        </Typography>
                        <Typography variant="section" box="paragraph" style={{width: 200}}>
                            Six big devils from Japan quickly forgot how to waltz.{' '}
                            <Link variant="pseudo" tabIndex={0}>
                                Then a cop quizzed Mick Jagger’s ex-wives briefly.
                            </Link>{' '}
                            “Who am taking the ebonics quiz?”, the prof jovially axed.
                        </Typography>
                    </React.Fragment>
                    <Link tabIndex={0} variant="pseudo" prepend={<DownloadIcon />}>
                        Download
                    </Link>
                    <Link tabIndex={0} variant="pseudo" prepend={<DownloadIcon />} disabled>
                        Download
                    </Link>
                    <Link tabIndex={0} variant="pseudo" append={<DownloadIcon />}>
                        Download
                    </Link>
                </WithSeparator>
            </DarkContext.Provider>
        </PageContent>
    </Paper>
</RootElement>;
```
