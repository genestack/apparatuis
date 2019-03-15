```js
initialState = {visible: true, direction: 'left'};

handleButtonClick = () => setState(({visible}) => ({visible: !visible}));
handleCheckboxChange = (event) =>
    setState({
        direction: event.currentTarget.checked ? 'right' : 'left'
    });

<div style={{overflow: 'hidden'}}>
    <Slide in={state.visible} direction={state.direction}>
        <Paper style={{width: 100, padding: 16}}>
            <Typography>Hi! I am could be hidden.</Typography>
        </Paper>
    </Slide>
    <div style={{display: 'flex', alignItems: 'baseline'}}>
        <Button style={{width: 100, marginTop: 8}} onClick={handleButtonClick}>
            {state.visible ? 'Hide' : 'Show'}
        </Button>
        <Typography as="label" box="inline">
            <input type="checkbox" onChange={handleCheckboxChange} /> Right Direction
        </Typography>
    </div>
</div>;
```
