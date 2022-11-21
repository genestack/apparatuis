```js
const [state, setState] = React.useState({
    drawerOpen: false,
    drawerSide: 'left'
)};

handleLeftDrawerOpen = () =>
    setState({
        drawerOpen: true,
        drawerSide: 'left'
    });

handleRightDrawerOpen = () =>
    setState({
        drawerOpen: true,
        drawerSide: 'right'
    });

handleDrawerClose = () =>
    setState({
        ...state,
        drawerOpen: false
    });

<PageContent as={Paper}>
    <Controls justify="space-between">
        <ControlsItem>
            <Button onClick={handleLeftDrawerOpen}>Open Left Drawer</Button>
        </ControlsItem>
        <ControlsItem>
            <Button onClick={handleRightDrawerOpen}>Open Right Drawer</Button>
        </ControlsItem>
    </Controls>
    <Drawer open={state.drawerOpen} onClose={handleDrawerClose} side={state.drawerSide}>
        <Typography variant="title">Shortcuts</Typography>

        <DrawerFullWidth>
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
        </DrawerFullWidth>
        <FlexExpander />

        <Typography variant="caption" intent="quiet" box="paragraph">
            Genestack Limited
        </Typography>
        <Typography variant="caption" intent="quiet" box="paragraph">
            Copyright (c) 2011-{new Date().getFullYear()}
        </Typography>
    </Drawer>
</PageContent>;
```
