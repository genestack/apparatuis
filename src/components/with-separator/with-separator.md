```js
const items = new Array(10).fill(null).map((_, i) => (
    <Typography box="inline" key={i}>
        Item:{' '}
        <Typography quiet box="inline" variant="caption">
            {i}
        </Typography>
    </Typography>
));

<React.Fragment>
    <WithSeparator
        separator={
            <Typography quiet box="inline" variant="caption">
                ,{' '}
            </Typography>
        }
    >
        {items}
    </WithSeparator>
</React.Fragment>;
```
