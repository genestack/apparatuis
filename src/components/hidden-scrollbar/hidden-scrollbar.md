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

<Paper style={{display: 'flex', flexDirection: 'row'}}>
    <HiddenScrollbar scrollStep={32} style={{maxHeight: 400}}>
        <List>{items}</List>
    </HiddenScrollbar>
</Paper>;
```
