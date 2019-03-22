```js
const {MenuIcon} = require('../../icons/menu-icon');
const {OpenFolderIcon} = require('../../icons/open-folder-icon');

initialState = {
    disablePositionFixed: true
};

togglePositionFixed = () => {
    setState(({disablePositionFixed}) => ({disablePositionFixed: !disablePositionFixed}));
};

const PageContent = (props) => <div {...props} style={{padding: '0 16px', display: 'flex'}} />;

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
    <Menu>
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

<div style={{background: '#fff'}}>
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
            <Typography
                style={{
                    lineHeight: '26px',
                    padding: '0 8px',
                    background: '#EBEDF3',
                    borderRadius: 2
                }}
            >
                Trial version
            </Typography>
        </HeaderItem>
        <HeaderButton>
            <HeaderItemText>Tasks</HeaderItemText>
            <HeaderItemCell style={{color: '#D45E18'}}>5</HeaderItemCell>
        </HeaderButton>
        <MenuHandler menu={userMenu}>
            {({open}) => (
                <HeaderButton shrink focused={open} title="konstantin.vasiliev@genestack.com">
                    konstantin.vasiliev@genestack.com
                </HeaderButton>
            )}
        </MenuHandler>
    </Header>
    <PageContent>
        <Typography box="paragraph">Left Page Side</Typography>
        <FlexExpander />
        <Typography box="paragraph">Right Page Side</Typography>
    </PageContent>
</div>;
```
