```js
const items = new Array(10).fill(null).map((_, i) => (
    <Typography box="inline" key={i}>
        Item:{' '}
        <Typography quiet box="inline" variant="caption">
            {i}
        </Typography>
    </Typography>
));

const someFlag = true;

<PageContent as={Paper}>
    <WithSeparator
        separator={
            <Typography quiet box="inline" variant="caption">
                ,{' '}
            </Typography>
        }
    >
        {items}
        {someFlag ? <Typography box="inline">Some value by flag</Typography> : null}
    </WithSeparator>
</PageContent>;
```
