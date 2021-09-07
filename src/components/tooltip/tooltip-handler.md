```js
const buttons = new Array(10).fill(null).map((_, i) => (
    <ControlsItem key={i}>
        <TooltipHandler tooltip={<Tooltip>I am a tooltip {i}</Tooltip>}>
            <Button>
                <div>{i}</div>
            </Button>
        </TooltipHandler>
    </ControlsItem>
));

<PageContent as={Paper}>
    <Controls>{buttons}</Controls>
</PageContent>;
```

#### Async example

```js
class AsyncTooltip extends React.Component {
    constructor() {
        this.popperRef = React.createRef();
        this.state = {loading: true};
    }

    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.setState({loading: false}, () => this.popperRef.current.scheduleUpdate());
        }, this.props.asyncDuration);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        const {asyncDuration, ...rest} = this.props;
        return (
            <Tooltip {...rest} popperRef={this.popperRef}>
                {this.state.loading ? (
                    'Loading...'
                ) : (
                    <React.Fragment>
                        Hello!
                        <br />I am an async tooltip!
                    </React.Fragment>
                )}
            </Tooltip>
        );
    }
}

initialState = {
    asyncDuration: 600
};

<PageContent as={Paper}>
    <Controls>
        <ControlsItem>
            <TooltipHandler tooltip={<AsyncTooltip asyncDuration={state.asyncDuration} />}>
                <Button>Hover for tooltip</Button>
            </TooltipHandler>
        </ControlsItem>
        <ControlsItem>
            <label htmlFor="tooltip-handler-async-duration">
                <Typography>Async timeout duration:</Typography>
            </label>
        </ControlsItem>
        <ControlsItem>
            <Input
                id="tooltip-handler-async-duration"
                style={{width: 60}}
                value={state.asyncDuration}
                onChange={(event) => {
                    let value = parseInt(event.currentTarget.value, 10);
                    value = isNaN(value) ? 0 : value;
                    setState({asyncDuration: value});
                }}
            />
        </ControlsItem>
    </Controls>
</PageContent>;
```

#### Inclusive Disabled button

If you want to use the tooltip on a disabled button, then use `inclusiveDisabled` property instead of `disabled` property

```js
<PageContent as={Paper}>
    <TooltipHandler tooltip={<Tooltip>I am tooltip!</Tooltip>}>
        <Button inclusiveDisabled>Hover me</Button>
    </TooltipHandler>
</PageContent>
```
