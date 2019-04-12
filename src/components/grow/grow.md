```js
const transformOrigins = [
    'center center',
    'center left',
    'center right',
    'top center',
    'top left',
    'top right',
    'bottom center',
    'bottom left',
    'bottom right'
];

initialState = {visible: true, transformOrigin: transformOrigins[0]};

handleButtonClick = () => setState(({visible}) => ({visible: !visible}));

handleTransformOriginChange = (event) => setState({transformOrigin: event.target.value});

<Controls justify="space-between">
    <FlexExpander />
    <ControlsItem>
        <Grow in={state.visible} transformOrigin={state.transformOrigin}>
            <Paper style={{width: 100, padding: 16}}>
                <Typography>Hi! I am could be hidden.</Typography>
            </Paper>
        </Grow>
        <Button variant="primary" style={{width: 100, marginTop: 8}} onClick={handleButtonClick}>
            {state.visible ? 'Hide' : 'Show'}
        </Button>{' '}
    </ControlsItem>
    <FlexExpander />
    <ControlsItem>
        <PageContent as={Paper}>
            <Typography box="paragraph" variant="section">
                Transform origin:
            </Typography>
            <PageFullWidth>
                <List onChange={handleTransformOriginChange}>
                    {transformOrigins.map((transformOrigin) => (
                        <ListItem as="label" key={transformOrigin}>
                            <ListItemCell>
                                <input
                                    type="radio"
                                    defaultChecked={transformOrigin === state.transformOrigin}
                                    value={transformOrigin}
                                    name="transformOrigin"
                                />
                            </ListItemCell>
                            <ListItemText>{transformOrigin}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </PageFullWidth>
        </PageContent>
    </ControlsItem>
</Controls>;
```
