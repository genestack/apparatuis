```js
const {Button} = require('../button');
const {Typography} = require('../typography');
const {FlexExpander} = require('../flex-expander');
const {DownloadIcon} = require('../../icons/download-icon');
const {ListItemCell, ListItemText} = require('../list');
const {Menu, MenuItem, SubMenu} = require('.');

const Quiet = (props) => <Typography {...props} variant="caption" quiet box="inline" />;

const getInfiniteSubMenu = () => (
    <SubMenu>
        <MenuItem>
            <ListItemText>Sub Menu Item 1</ListItemText>
        </MenuItem>
        <MenuItem subMenu={getInfiniteSubMenu}>
            <ListItemText>Sub Menu Item 2</ListItemText>
        </MenuItem>
        <MenuItem subMenu={getInfiniteSubMenu}>
            <ListItemText>Sub Menu Item 3</ListItemText>
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
    <MenuItem key={index} onClick={handleMenuClose}>
        <ListItemText>Menu Item</ListItemText>
        <FlexExpander />
        <ListItemCell>
            <Typography quiet>{index}</Typography>
        </ListItemCell>
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
            <ListItemText>Download</ListItemText>
            <ListItemCell>
                <Quiet>125 MB</Quiet>
            </ListItemCell>
        </MenuItem>

        <MenuItem onClick={createMenuSelectHandler(1)} subMenu={getInfiniteSubMenu}>
            <ListItemText>Open File...</ListItemText>
            <FlexExpander />
            <ListItemCell>
                <Quiet>⌘ + O</Quiet>
            </ListItemCell>
        </MenuItem>

        <MenuItem onClick={createMenuSelectHandler(2)} subMenu={getInfiniteSubMenu}>
            <ListItemText>Menu Item With Long Long Name</ListItemText>
        </MenuItem>
    </Menu>
</React.Fragment>;
```

## Extreme Menu

```js
const {Button} = require('../button');
const {Typography} = require('../typography');
const {FlexExpander} = require('../flex-expander');
const {ListItemText, ListItemCell} = require('../list');
const {Menu, MenuItem} = require('.');

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
        <ListItemText>Menu Item</ListItemText>
        <FlexExpander />
        <ListItemCell>
            <Typography quiet>{index}</Typography>
        </ListItemCell>
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
