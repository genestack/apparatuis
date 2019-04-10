```js
const buttons = new Array(10).fill(null).map((_, i) => (
    <FlexItem key={i}>
        <TooltipHandler tooltip={<Tooltip>I am a tooltip {i}</Tooltip>}>
            <Button>
                <div>{i}</div>
            </Button>
        </TooltipHandler>
    </FlexItem>
));

<PageContent as={Paper}>
    <FlexItem container>{buttons}</FlexItem>
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
                        Hello!<br />
                        I am an async tooltip!
                    </React.Fragment>
                )}
            </Tooltip>
        );
    }
}

initialState = {
    asyncDuration: 600
};

<FlexItem container>
    <FlexItem>
        <TooltipHandler tooltip={<AsyncTooltip asyncDuration={state.asyncDuration} />}>
            <Button>Hover for tooltip</Button>
        </TooltipHandler>
    </FlexItem>
    <Flex>
        <label htmlFor="tooltip-handler-async-duration">
            <Typography>Async timeout duration:</Typography>
        </label>
    </Flex>
    <Flex>
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
    </Flex>
</FlexItem>;
```

#### Disabled button

```js
<TooltipHandler tooltip={<Tooltip>I am tooltip!</Tooltip>}>
    <Button disabled>Hover me</Button>
</TooltipHandler>
```
