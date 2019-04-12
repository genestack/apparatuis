```js
<PageContent as={Paper}>
    <Controls>
        <ControlsItem>
            <ButtonGroup>
                <Button>First</Button>
                <Button>Second</Button>
                <Button>Third</Button>
            </ButtonGroup>
        </ControlsItem>

        <ControlsItem>
            <ButtonGroup variant="primary">
                <Button>First</Button>
                <Button>Second</Button>
                <Button>Third</Button>
            </ButtonGroup>
        </ControlsItem>
    </Controls>
    <Divider gap={2} variant="transparent" />
    <Controls>
        <ControlsItem>
            <ButtonGroup variant="outlined">
                <Button>First</Button>
                <Button>Second</Button>
                <Button>Third</Button>
            </ButtonGroup>
        </ControlsItem>

        <ControlsItem>
            <ButtonGroup variant="ghost">
                <Button>First</Button>
                <Button>Second</Button>
                <Button>Third</Button>
            </ButtonGroup>
        </ControlsItem>
    </Controls>
</PageContent>
```

### Active Buttons

```js
initialState = {
    value: null
};

<PageContent as={Paper}>
    <ButtonGroup>
        <Button active={state.value === 'First'} onClick={() => setState({value: 'First'})}>
            First
        </Button>
        <Button active={state.value === 'Second'} onClick={() => setState({value: 'Second'})}>
            Second
        </Button>
        <Button active={state.value === 'Third'} onClick={() => setState({value: 'Third'})}>
            Third
        </Button>
    </ButtonGroup>
</PageContent>;
```

### Button With Menu

```js
const {KeyboardArrowBottomIcon} = require('../../icons/keyboard-arrow-bottom-icon.tsx');

<PageContent as={Paper}>
    <ButtonGroup variant="primary">
        <Button>Main Action</Button>
        <MenuHandler
            menu={
                <Menu placement="bottom-end">
                    <MenuItem>Secondary Action 1</MenuItem>
                    <MenuItem>Secondary Action 2</MenuItem>
                    <MenuItem>Secondary Action 3</MenuItem>
                </Menu>
            }
        >
            {({open}) => <Button active={open} icon={<KeyboardArrowBottomIcon />} />}
        </MenuHandler>
    </ButtonGroup>
</PageContent>;
```
