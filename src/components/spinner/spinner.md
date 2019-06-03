```js
const wait = (timeout) => {
    const start = new Date();
    while (new Date() - start < timeout) {}
};

<Paper>
    <PageContent>
        <div style={{textAlign: 'center'}}>
            <Spinner size={64} />
        </div>
        <Divider gap={3} variant="transparent" />
        <div style={{textAlign: 'center'}}>
            <Button onClick={() => wait(5000)}>
                Block JS thread<br />for 5 seconds
            </Button>
        </div>
    </PageContent>
</Paper>;
```
