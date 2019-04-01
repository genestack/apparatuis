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

<div>
    <Button onClick={handleTooltipToggle}>Toggle Tooltip</Button>
    <Tooltip
        open={!!state.referenceElement}
        referenceElement={state.referenceElement}
        onClose={handleTooltipClose}
        keepMounted
    >
        I am a tooltip
    </Tooltip>
</div>;
```
