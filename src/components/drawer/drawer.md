```js
initialState = {
    drawerOpen: false,
    drawerSide: 'left'
};

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
                <ListItem as="button" onClick={handleDrawerClose}>
                    <ListItemText>Dashboard</ListItemText>
                </ListItem>
                <ListItem as="button" onClick={handleDrawerClose}>
                    <ListItemText>Data Browser</ListItemText>
                </ListItem>
                <ListItem as="button" onClick={handleDrawerClose}>
                    <ListItemText>File Manager</ListItemText>
                </ListItem>
                <ListItem as="button" onClick={handleDrawerClose}>
                    <ListItemText>Import Data</ListItemText>
                </ListItem>
            </List>

            <List>
                <ListItem as="button" onClick={handleDrawerClose}>
                    <ListItemText>Manage Applications</ListItemText>
                </ListItem>
                <ListItem as="button" onClick={handleDrawerClose}>
                    <ListItemText>Manage Groups</ListItemText>
                </ListItem>
            </List>
            <Divider />

            <List>
                <ListItem as="button" onClick={handleDrawerClose}>
                    <ListItemText>Expression Data Miner</ListItemText>
                </ListItem>
            </List>
        </DrawerFullWidth>
        <FlexExpander />

        <Typography variant="caption" quiet box="paragraph">
            Genestack Limited
        </Typography>
        <Typography variant="caption" quiet box="paragraph">
            Copyright (c) 2011-{new Date().getFullYear()}
        </Typography>
    </Drawer>
</PageContent>;
```
