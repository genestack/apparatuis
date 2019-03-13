```js
const {Button} = require('../button');
const {Typography} = require('../typography');
const {FlexExpander} = require('../flex-expander');
const {DownloadIcon} = require('../../icons/download-icon');
const {Menu, MenuItem, MenuItemCell, MenuItemText, SubMenu} = require('.');

const Quiet = (props) => <Typography {...props} variant="caption" quiet box="inline" />;

const getInfiniteSubMenu = () => (
    <SubMenu>
        <MenuItem>
            <MenuItemText>Sub Menu Item 1</MenuItemText>
        </MenuItem>
        <MenuItem subMenu={getInfiniteSubMenu}>
            <MenuItemText>Sub Menu Item 2</MenuItemText>
        </MenuItem>
        <MenuItem subMenu={getInfiniteSubMenu}>
            <MenuItemText>Sub Menu Item 3</MenuItemText>
        </MenuItem>
    </SubMenu>
);

initialState = {
    referenceElement: null,
    selectedItemIndex: -1
};

handleButtonClick = (event) => {
    setState({referenceElement: event.currentTarget});
};

handleMenuClose = () => {
    setState({referenceElement: null});
};

createMenuSelectHandler = (index) => () => {
    setState({
        selectedItemIndex: index,
        referenceElement: null
    });
};

items = new Array(100).fill(null).map((_, index) => (
    <MenuItem key={index} onClick={handleMenuClose} subMenu={getInfiniteSubMenu}>
        <MenuItemText>Menu Item</MenuItemText>
        <FlexExpander />
        <MenuItemCell>
            <Typography quiet>{index}</Typography>
        </MenuItemCell>
    </MenuItem>
));

<React.Fragment>
    <Button onClick={handleButtonClick}>Open Menu</Button>
    <Typography box="inline"> Last selected menu item index: {state.selectedItemIndex}</Typography>
    <Menu
        open={!!state.referenceElement}
        onClose={handleMenuClose}
        referenceElement={state.referenceElement}
    >
        <MenuItem
            icon={<DownloadIcon />}
            onClick={createMenuSelectHandler(0)}
            subMenu={<SubMenu>{items}</SubMenu>}
        >
            <MenuItemText>Download</MenuItemText>
            <MenuItemCell>
                <Quiet>125 MB</Quiet>
            </MenuItemCell>
        </MenuItem>

        <MenuItem onClick={createMenuSelectHandler(1)} subMenu={getInfiniteSubMenu}>
            <MenuItemText>Open File...</MenuItemText>
            <FlexExpander />
            <MenuItemCell>
                <Quiet>⌘ + O</Quiet>
            </MenuItemCell>
        </MenuItem>

        <MenuItem onClick={createMenuSelectHandler(2)} subMenu={getInfiniteSubMenu}>
            <MenuItemText>Menu Item With Long Long Name</MenuItemText>
        </MenuItem>
    </Menu>
</React.Fragment>;
```

## Extreme Menu

```js
const {Button} = require('../button');
const {Typography} = require('../typography');
const {FlexExpander} = require('../flex-expander');
const {Menu, MenuItem, MenuItemText, MenuItemCell} = require('.');

initialState = {
    referenceElement: null
};

handleButtonClick = (event) => {
    setState({referenceElement: event.currentTarget});
};

handleMenuClose = () => {
    setState({referenceElement: null});
};

items = new Array(100).fill(null).map((_, index) => (
    <MenuItem key={index} onClick={handleMenuClose}>
        <MenuItemText>Menu Item</MenuItemText>
        <FlexExpander />
        <MenuItemCell>
            <Typography quiet>{index}</Typography>
        </MenuItemCell>
    </MenuItem>
));

<React.Fragment>
    <Button onClick={handleButtonClick}>Open Extreme Menu</Button>
    <Menu
        open={!!state.referenceElement}
        onClose={handleMenuClose}
        referenceElement={state.referenceElement}
    >
        {items}
    </Menu>
</React.Fragment>;
```
