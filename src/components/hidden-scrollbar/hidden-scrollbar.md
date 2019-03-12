```js
const {FlexExpander} = require('../flex-expander');
const {Typography} = require('../typography');
const {List, ListItem, ListItemText, ListItemCell} = require('../list');
const {HiddenScrollbar} = require('.');

items = new Array(100).fill(null).map((_, index) => (
    <ListItem key={index}>
        <ListItemText>List Item</ListItemText>
        <FlexExpander />
        <ListItemCell>
            <Typography quiet>{index}</Typography>
        </ListItemCell>
    </ListItem>
));

<div style={{display: 'flex', flexDirection: 'row'}}>
    <HiddenScrollbar scrollStep={32} style={{maxHeight: 400, border: '1px solid grey'}}>
        <List>{items}</List>
    </HiddenScrollbar>
</div>;
```
