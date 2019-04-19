```js
initialState = {value: ''};
<PageContent>
    <Controls>
        <ControlsItem>
            <Input
                onValueChange={(value) => setState({value})}
                value={state.value}
                placeholder="Enter some value"
            />
        </ControlsItem>
        <ControlsItem grow>
            <Input
                onValueChange={(value) => setState({value})}
                value={state.value}
                placeholder="Read-only and invalid"
                fullWidth
                readOnly
                invalid
            />
        </ControlsItem>
    </Controls>
    <Divider gap={4} />
    <Typography box="paragraph">
        <Typography variant="section" box="inline">
            Value:
        </Typography>{' '}
        {state.value}
    </Typography>
</PageContent>;
```
