### Stateful

```js
initialState = {
    value: null
};

handleValueSelect = (value) => {
    setState({value});
};

const menu = (
    <Menu onValueSelect={handleValueSelect}>
        <MenuItem value="Menu Item 1" append={<Typography quiet>1</Typography>}>
            Menu Item
        </MenuItem>
        <Divider />
        <MenuItem value="Menu Item 2" append={<Typography quiet>2</Typography>}>
            Menu Item
        </MenuItem>
        <MenuItem
            subMenu={
                <SubMenu>
                    <MenuItem value="Menu Item 3.1" append={<Typography quiet>3.1</Typography>}>
                        Menu Item
                    </MenuItem>
                </SubMenu>
            }
            append={<Typography quiet>3</Typography>}
        >
            Menu Item
        </MenuItem>
    </Menu>
);

<PageContent as={Paper}>
    <MenuHandler menu={() => menu}>
        <Button>Open Stateful Menu {state.value ? `(${state.value})` : null}</Button>
    </MenuHandler>
</PageContent>;
```

### Stateless

```js
const {DownloadIcon} = require('../../icons/download-icon');

const Quiet = (props) => <Typography {...props} variant="caption" quiet box="inline" />;

const getInfiniteSubMenu = () => (
    <SubMenu>
        <MenuItem>Sub Menu Item 1</MenuItem>
        <MenuItem subMenu={getInfiniteSubMenu}>Sub Menu Item 2</MenuItem>
        <MenuItem subMenu={getInfiniteSubMenu}>Sub Menu Item 3</MenuItem>
    </SubMenu>
);

initialState = {
    referenceElement: null,
    selectedItemValue: undefined
};

handleButtonClick = (event) => {
    setState({referenceElement: event.currentTarget});
};

handleMenuClose = () => {
    setState({referenceElement: null});
};

handleMenuValueSelect = (value) => {
    setState({
        selectedItemValue: value,
        referenceElement: null
    });
};

items = new Array(100).fill(null).map((_, index) => (
    <MenuItem
        key={index}
        onClick={handleMenuClose}
        subMenu={getInfiniteSubMenu}
        append={<Typography quiet>{index}</Typography>}
    >
        Menu Item
    </MenuItem>
));

<PageContent as={Paper}>
    <Controls>
        <ControlsItem>
            <Button onClick={handleButtonClick}>Open Menu</Button>
        </ControlsItem>
        <ControlsItem>
            <Typography box="inline">
                {' '}
                Last selected menu item value:{' '}
                {typeof state.selectedItemValue === 'undefined'
                    ? 'undefined'
                    : JSON.stringify(state.selectedItemValue)}
            </Typography>
        </ControlsItem>
    </Controls>
    <Menu
        open={!!state.referenceElement}
        onClose={handleMenuClose}
        onValueSelect={handleMenuValueSelect}
        referenceElement={state.referenceElement}
        style={{maxWidth: 250}}
    >
        <MenuItem value="Download" prepend={<DownloadIcon />} subMenu={<SubMenu>{items}</SubMenu>}>
            <MenuItemText noGrow>Download</MenuItemText>
            <MenuItemCell>
                <Quiet>125 MB</Quiet>
            </MenuItemCell>
        </MenuItem>

        <MenuItem value="Open File" append={<Quiet>⌘ + O</Quiet>}>
            Open File...
        </MenuItem>

        <MenuItem value="Create File" append={<Quiet>⌘ + N</Quiet>} subMenu={getInfiniteSubMenu}>
            Create File...
        </MenuItem>

        <MenuItem value="Save File" append={<Quiet>⌘ + S</Quiet>} subMenu={getInfiniteSubMenu}>
            <MenuItemText noGrow>Save File</MenuItemText>
            <MenuItemCell>
                <Quiet>(5 min ago)</Quiet>
            </MenuItemCell>
        </MenuItem>

        <MenuItem value="Long Menu" subMenu={getInfiniteSubMenu}>
            Menu Item With Long Long Name
        </MenuItem>
    </Menu>
</PageContent>;
```

### Extreme

```js
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
    <MenuItem key={index} append={<Typography quiet>{index}</Typography>}>
        Menu Item
    </MenuItem>
));

<PageContent as={Paper}>
    <Button onClick={handleButtonClick}>Open Extreme Menu</Button>
    <Menu
        open={!!state.referenceElement}
        onClose={handleMenuClose}
        referenceElement={state.referenceElement}
        onValueSelect={handleMenuClose}
    >
        {items}
    </Menu>
</PageContent>;
```
