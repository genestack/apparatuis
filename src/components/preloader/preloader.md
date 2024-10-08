```js
const {DarkContext} = require('../../utils/dark-context');

const [state, setState] = React.useState({
    contextInverted: false,
    inverted: false,
    drawerOpen: false,
    isLoading: false
});

handleLeftDrawerOpen = () => {
    setState({
        ...state,
        isLoading: true,
        drawerOpen: true
    });
    setTimeout(() => {
        setState((state) => ({
            ...state,
            isLoading: false
        }));
    }, 5000);
};

handleDrawerClose = () =>
    setState({
        ...state,
        isLoading: false,
        drawerOpen: false
    });

<React.Fragment>
    <DarkContext.Provider value={state.contextInverted}>
        <PageContent as={Paper}>
            <Typography variant="section">In context</Typography>
            <Controls>
                <ControlsItem>
                    <input
                        type="checkbox"
                        onChange={(event) =>
                            setState({...state, contextInverted: event.target.checked})
                        }
                        checked={state.contextInverted}
                        style={{margin: 0, display: 'flex'}}
                    />
                </ControlsItem>
                <ControlsItem>
                    <Typography as="span">Inverted</Typography>
                </ControlsItem>
            </Controls>
            <Preloader show count={5} box="paragraph" />
        </PageContent>
    </DarkContext.Provider>

    <DarkContext.Provider value={state.inverted}>
        <PageContent as={Paper}>
            <Typography inverted={state.inverted} variant="section">
                Out of context
            </Typography>
            <Controls align="center">
                <ControlsItem>
                    <input
                        type="checkbox"
                        onChange={(event) => setState({...state, inverted: event.target.checked})}
                        checked={state.inverted}
                        style={{margin: 0, display: 'flex'}}
                    />
                </ControlsItem>
                <ControlsItem>
                    <Typography as="span" inverted={state.inverted}>
                        Inverted
                    </Typography>
                </ControlsItem>
            </Controls>
            <Preloader show count={5} box="paragraph" inverted={state.inverted} />
        </PageContent>
    </DarkContext.Provider>

    <PageContent as={Paper}>
        <Controls justify="space-between">
            <ControlsItem>
                <Button onClick={handleLeftDrawerOpen}>Open Left Drawer</Button>
            </ControlsItem>
        </Controls>
    </PageContent>
    <Drawer open={state.drawerOpen} onClose={handleDrawerClose} side="left">
        <Typography variant="title">Shortcuts</Typography>

        <DrawerFullWidth>
            <Preloader show={state.isLoading} count={7} wrapAll={List} wrapEach={ListItem}>
                <List>
                    <ListItem interactive onClick={handleDrawerClose}>
                        Dashboard
                    </ListItem>
                    <ListItem interactive onClick={handleDrawerClose}>
                        Data Browser
                    </ListItem>
                    <ListItem interactive onClick={handleDrawerClose}>
                        File Manager
                    </ListItem>
                    <ListItem interactive onClick={handleDrawerClose}>
                        Import Data
                    </ListItem>
                </List>

                <List>
                    <ListItem interactive onClick={handleDrawerClose}>
                        Manage Applications
                    </ListItem>
                    <ListItem interactive onClick={handleDrawerClose}>
                        Manage Groups
                    </ListItem>
                </List>
                <Divider />

                <List>
                    <ListItem interactive onClick={handleDrawerClose}>
                        Expression Data Miner
                    </ListItem>
                </List>
            </Preloader>
        </DrawerFullWidth>
        <FlexExpander />

        <Typography variant="caption" intent="quiet" box="paragraph">
            Genestack Limited
        </Typography>
        <Typography variant="caption" intent="quiet" box="paragraph">
            Copyright (c) 2011-{new Date().getFullYear()}
        </Typography>
    </Drawer>
</React.Fragment>;
```
