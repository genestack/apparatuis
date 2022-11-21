```js
const [state, setState] = React.useState({
    referenceElement: null
});

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

### useTooltipHandler hook

```js
const {useTooltipHandler} = require('./use-tooltip-handler');

function Example() {
    const referenceRef = React.useRef();
    const tooltip = useTooltipHandler({
        referenceElement: referenceRef.current
    });

    return (
        <React.Fragment>
            <Button {...tooltip.getReferenceProps({ref: referenceRef})}>Hover Me</Button>
            <Tooltip {...tooltip.getTooltipProps()}>Hi human!</Tooltip>
        </React.Fragment>
    );
}

<PageContent as={Paper}>
    <Example />
</PageContent>;
```
