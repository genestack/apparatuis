```js
items = new Array(100).fill(null).map((_, index) => (
    <ListItem
        key={index}
        interactive
        append={
            <Typography intent="quiet" as="span">
                {index}
            </Typography>
        }
    >
        List Item
    </ListItem>
));

<Paper style={{display: 'flex', flexDirection: 'row'}}>
    <HiddenScrollbar scrollStep={32} style={{maxHeight: 400}}>
        <List>{items}</List>
    </HiddenScrollbar>
</Paper>;
```
