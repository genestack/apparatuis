```js
initialState = {visible: true};

handleButtonClick = () => setState(({visible}) => ({visible: !visible}));

<PageContent as={Paper}>
    <Controls>
        <ControlsItem>
            <Button style={{width: 80}} onClick={handleButtonClick}>
                {state.visible ? 'Hide' : 'Show'}
            </Button>
        </ControlsItem>
        <ControlsItem>
            <Fade in={state.visible}>
                <Typography box="inline">Hi! I am could be hidden.</Typography>
            </Fade>
        </ControlsItem>
    </Controls>
</PageContent>;
```
