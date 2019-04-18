```js
const {MenuIcon} = require('../../icons/menu-icon');
const {OpenFolderIcon} = require('../../icons/open-folder-icon');
const {ShareIcon} = require('../../icons/share-icon');

initialState = {
    disablePositionFixed: true
};

togglePositionFixed = () => {
    setState(({disablePositionFixed}) => ({disablePositionFixed: !disablePositionFixed}));
};

const applicationMenu = (
    <Menu>
        <MenuItem onClick={togglePositionFixed}>Toggle header fixed position</MenuItem>
        <MenuItem icon={<OpenFolderIcon />}>Open</MenuItem>
        <Divider />
        <MenuItem>Export as .csv</MenuItem>
        <MenuItem>Export as image</MenuItem>
        <MenuItem disabled>Export box plots in image</MenuItem>
        <Divider />
        <MenuItem>Import own data</MenuItem>
        <MenuItem>Licensing</MenuItem>
        <MenuItem>About application</MenuItem>
    </Menu>
);

const userMenu = (
    <Menu placement="bottom-end">
        <MenuItem>Profile</MenuItem>
        <MenuItem>Sign out</MenuItem>
    </Menu>
);

const exportMenu = (
    <Menu>
        <MenuItem>Export as .csv</MenuItem>
        <MenuItem>Export as image</MenuItem>
        <MenuItem disabled>Export box plots in image</MenuItem>
    </Menu>
);

<Paper>
    <Header disablePositionFixed={state.disablePositionFixed}>
        <HeaderItem>
            <HeaderItemIcon>
                <MenuIcon />
            </HeaderItemIcon>
        </HeaderItem>
        <MenuHandler menu={applicationMenu}>
            {({open}) => (
                <HeaderItem active={open}>
                    <HeaderItemText variant="section" style={{color: '#024DA1'}}>
                        Import Template Editor
                    </HeaderItemText>
                </HeaderItem>
            )}
        </MenuHandler>
        <HeaderItem>
            <HeaderItemIcon>
                <OpenFolderIcon />
            </HeaderItemIcon>
            <HeaderItemText>Open</HeaderItemText>
        </HeaderItem>
        <MenuHandler menu={exportMenu}>
            {({open}) => <HeaderItem active={open}>Export</HeaderItem>}
        </MenuHandler>
        <HeaderItem shrink grow>
            <HeaderItemSecondaryActions>
                <Button tiny variant="ghost" icon={<ShareIcon />} />
            </HeaderItemSecondaryActions>
            <HeaderItemText variant="section">
                iPSC derived Pancreatic Beta Cell Def-PANC
            </HeaderItemText>
        </HeaderItem>
        <HeaderBlock>
            <HeaderItemCell>
                <Button tiny>Trial version</Button>
            </HeaderItemCell>
        </HeaderBlock>
        <HeaderItem>
            <HeaderItemText>Tasks</HeaderItemText>
            <HeaderItemText style={{color: '#D45E18'}}>5</HeaderItemText>
        </HeaderItem>
        <MenuHandler menu={userMenu}>
            {({open}) => (
                <HeaderItem active={open} title="user.name@genestack.com" style={{maxWidth: 200}}>
                    user.name.user@genestack.com
                </HeaderItem>
            )}
        </MenuHandler>
    </Header>
    <PageContent>
        <Controls justify="space-between">
            <ControlsItem>
                <Typography box="paragraph">Left Page Side</Typography>
            </ControlsItem>
            <ControlsItem>
                <Typography box="paragraph">Right Page Side</Typography>
            </ControlsItem>
        </Controls>
    </PageContent>
</Paper>;
```
