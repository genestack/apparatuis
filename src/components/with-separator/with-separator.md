```js
const items = new Array(10).fill(null).map((_, i) => (
    <Typography box="inline" key={i} as="span">
        Item:{' '}
        <Typography quiet box="inline" variant="caption" as="span">
            {i}
        </Typography>
    </Typography>
));

const someFlag = true;

<PageContent as={Paper}>
    <WithSeparator
        separator={
            <Typography quiet box="inline" variant="caption" as="span">
                ,{' '}
            </Typography>
        }
    >
        {items}
        {someFlag ? (
            <Typography box="inline" as="span">
                Some value by flag
            </Typography>
        ) : null}
    </WithSeparator>
</PageContent>;
```
