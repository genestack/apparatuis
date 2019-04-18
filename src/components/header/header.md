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
        <HeaderButton>
            <HeaderItemIcon>
                <MenuIcon />
            </HeaderItemIcon>
        </HeaderButton>
        <MenuHandler menu={applicationMenu}>
            {({open}) => (
                <HeaderButton active={open}>
                    <HeaderItemText variant="section" style={{color: '#024DA1'}}>
                        Import Template Editor
                    </HeaderItemText>
                </HeaderButton>
            )}
        </MenuHandler>
        <HeaderButton>
            <HeaderItemIcon>
                <OpenFolderIcon />
            </HeaderItemIcon>
            <HeaderItemText>Open</HeaderItemText>
        </HeaderButton>
        <MenuHandler menu={exportMenu}>
            {({open}) => <HeaderButton active={open}>Export</HeaderButton>}
        </MenuHandler>
        <HeaderButton shrink grow>
            <HeaderButtonSecondaryActions>
                <Button tiny variant="ghost" icon={<ShareIcon />} />
            </HeaderButtonSecondaryActions>
            <HeaderItemText variant="section">
                iPSC derived Pancreatic Beta Cell Def-PANC
            </HeaderItemText>
        </HeaderButton>
        <HeaderBlock>
            <HeaderItemCell>
                <Button tiny>Trial version</Button>
            </HeaderItemCell>
        </HeaderBlock>
        <HeaderButton>
            <HeaderItemText>Tasks</HeaderItemText>
            <HeaderItemText style={{color: '#D45E18'}}>5</HeaderItemText>
        </HeaderButton>
        <MenuHandler menu={userMenu}>
            {({open}) => (
                <HeaderButton active={open} title="user.name@genestack.com" style={{maxWidth: 200}}>
                    user.name.user@genestack.com
                </HeaderButton>
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
