```js
initialState = {visible: true};

handleButtonClick = () => setState(({visible}) => ({visible: !visible}));

<div style={{overflow: 'hidden'}}>
    <Slide in={state.visible}>
        <Paper style={{width: 100, padding: 16}}>
            <Typography>Hi! I am could be hidden.</Typography>
        </Paper>
    </Slide>
    <Button style={{width: 100, marginTop: 8}} onClick={handleButtonClick}>
        {state.visible ? 'Hide' : 'Show'}
    </Button>{' '}
</div>;
```
