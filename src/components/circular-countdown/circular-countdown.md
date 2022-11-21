```js
const [state, setState] = React.useState({
    in: false,
    durationInputValue: '6000',
    duration: 6000
});

handleDurationChange = (durationInputValue) => {
    const parsedValue = parseInt(durationInputValue, 10);
    const duration = isFinite(parsedValue) ? parsedValue : 6000;
    setState((current) => ({...current, duration, durationInputValue}));
};

<PageContent as={Paper}>
    <Controls>
        <ControlsItem>
            <Typography as="label" htmlFor="circular-countdown-duration">
                Duration:
            </Typography>
        </ControlsItem>
        <ControlsItem>
            <Input
                style={{width: 100}}
                id="circular-countdown-duration"
                type="number"
                min="0"
                value={state.durationInputValue}
                onValueChange={handleDurationChange}
            />
        </ControlsItem>
        <ControlsItem>
            <Button onClick={() => setState((state) => ({...state, in: !state.in}))}>Toggle</Button>
        </ControlsItem>
        <ControlsItem>
            <CircularCountdown in={state.in} duration={state.duration} />
        </ControlsItem>
    </Controls>
</PageContent>;
```
