### Focus to input after MenuItem click

```js
const {MoreIcon} = require('../../icons/more-icon.tsx');

function Example() {
    const inputRef = React.useRef();

    const menu = (
        <Menu>
            <MenuItem
                subtitle="Input should be focused after menu item selection"
                onClick={() => {
                    console.log('focus');
                    inputRef.current.focus();
                }}
            >
                Menu Item
            </MenuItem>
        </Menu>
    );

    return (
        <Controls>
            <ControlsItem>
                <Input inputRef={inputRef} />
            </ControlsItem>
            <ControlsItem>
                <MenuHandler menu={menu}>
                    <Button icon={<MoreIcon />} />
                </MenuHandler>
            </ControlsItem>
        </Controls>
    );
}

<Paper>
    <PageContent>
        <Example />
    </PageContent>
</Paper>;
```
