```js
const buttons = new Array(10).fill(null).map((_, i) => (
    <Flex cell key={i}>
        <div>
            <TooltipHandler tooltip={<Tooltip>I am a tooltip {i}</Tooltip>}>
                <Button>
                    <div>{i}</div>
                </Button>
            </TooltipHandler>
        </div>
    </Flex>
));

<Flex container>
    <div>{buttons}</div>
</Flex>;
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

<Flex container>
    <div>
        <Flex cell>
            <div>
                <TooltipHandler tooltip={<AsyncTooltip asyncDuration={state.asyncDuration} />}>
                    <Button>Hover for tooltip</Button>
                </TooltipHandler>
            </div>
        </Flex>
        <Flex cell>
            <label htmlFor="tooltip-handler-async-duration">
                <Typography>Async timeout duration:</Typography>
            </label>
        </Flex>
        <Flex cell>
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
    </div>
</Flex>;
```

#### Disabled button

```js
<TooltipHandler tooltip={<Tooltip>I am tooltip!</Tooltip>}>
    <span style={{display: 'inline-block'}}>
        <Button disabled>Hover me</Button>
    </span>
</TooltipHandler>
```
