```js
const {MenuIcon} = require('../../icons/menu-icon');
const {OpenFolderIcon} = require('../../icons/open-folder-icon');

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
            <MenuIcon />
        </HeaderButton>
        <MenuHandler menu={applicationMenu}>
            {({open}) => (
                <HeaderButton focused={open} variant="section" style={{color: '#024DA1'}}>
                    Import Template Editor
                </HeaderButton>
            )}
        </MenuHandler>
        <HeaderButton>
            <HeaderItemCell>
                <OpenFolderIcon />
            </HeaderItemCell>
            <HeaderItemText>Open</HeaderItemText>
        </HeaderButton>
        <MenuHandler menu={exportMenu}>
            {({open}) => <HeaderButton focused={open}>Export</HeaderButton>}
        </MenuHandler>
        <HeaderButton shrink grow variant="section">
            iPSC derived Pancreatic Beta Cell Def-PANC
        </HeaderButton>
        <HeaderItem>
            <Button tiny>Trial version</Button>
        </HeaderItem>
        <HeaderButton>
            <HeaderItemText>Tasks</HeaderItemText>
            <HeaderItemCell style={{color: '#D45E18'}}>5</HeaderItemCell>
        </HeaderButton>
        <MenuHandler menu={userMenu}>
            {({open}) => (
                <HeaderButton
                    focused={open}
                    title="user.name@genestack.com"
                    style={{maxWidth: 200}}
                    shrink
                >
                    user.name@genestack.com
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
