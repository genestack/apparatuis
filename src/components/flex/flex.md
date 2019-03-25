```js
const {MenuIcon} = require('../../icons/menu-icon.tsx');
const {KeyboardArrowRightIcon} = require('../../icons/keyboard-arrow-right-icon.tsx');
const flexStyles = require('./flex.module.css');

<div style={{background: '#fff', maxWidth: 640}}>
    <Flex container>
        <div style={{padding: '0 16px'}}>
            <Flex cell>
                <MenuIcon />
            </Flex>
            <Flex cell grow shrink>
                <Typography variant="section">Input Label</Typography>
            </Flex>
            <Flex cell>
                <Input style={{width: 200, alignSelf: 'baseline'}} placeholder="Input" />
            </Flex>
        </div>
    </Flex>
</div>;
```
