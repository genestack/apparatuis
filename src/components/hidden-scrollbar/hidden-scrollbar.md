```js
items = new Array(100).fill(null).map((_, index) => (
    <ListItem key={index}>
        <ListItemText>List Item</ListItemText>
        <FlexExpander />
        <ListItemCell>
            <Typography quiet>{index}</Typography>
        </ListItemCell>
    </ListItem>
));

<div style={{display: 'flex', flexDirection: 'row', background: '#fff'}}>
    <HiddenScrollbar scrollStep={32} style={{maxHeight: 400}}>
        <List>{items}</List>
    </HiddenScrollbar>
</div>;
```
