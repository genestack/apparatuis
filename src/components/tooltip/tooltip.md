```js
initialState = {
    referenceElement: null
};

handleTooltipToggle = (event) => {
    const {currentTarget} = event;
    setState(({referenceElement}) => ({
        referenceElement: referenceElement ? null : currentTarget
    }));
};

handleTooltipClose = () => setState({referenceElement: null});

<PageContent as={Paper}>
    <Button onClick={handleTooltipToggle}>Toggle Tooltip</Button>
    <Tooltip
        open={!!state.referenceElement}
        referenceElement={state.referenceElement}
        onClose={handleTooltipClose}
        keepMounted
    >
        I am a tooltip
    </Tooltip>
</PageContent>;
```
