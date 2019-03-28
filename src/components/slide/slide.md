```js
initialState = {visible: true, direction: 'left', fast: false};

const directions = ['left', 'right', 'top', 'bottom'];

handleFastChange = (event) => setState({fast: event.currentTarget.checked});
handleButtonClick = () => setState(({visible}) => ({visible: !visible}));
handleDirectionChange = (event) =>
    setState({
        direction: event.target.value
    });

<Flex container>
    <div>
        <FlexExpander />
        <Flex cell>
            <div>
                <Slide in={state.visible} direction={state.direction} fast={state.fast}>
                    <Paper style={{width: 100, padding: 16}}>
                        <Typography>Hi! I am could be hidden.</Typography>
                    </Paper>
                </Slide>
                <Button
                    style={{width: 100, marginTop: 8, position: 'relative'}}
                    onClick={handleButtonClick}
                >
                    {state.visible ? 'Hide' : 'Show'}
                </Button>
            </div>
        </Flex>
        <FlexExpander />
        <Flex cell>
            <Paper style={{padding: '16px 0'}}>
                <Typography style={{padding: '0 16px'}} variant="section">
                    Direction:
                </Typography>
                <List>
                    <ListItem as="label">
                        <ListItemCell>
                            <input
                                type="checkbox"
                                onChange={handleFastChange}
                                checked={state.fast}
                            />
                        </ListItemCell>
                        <ListItemText>Fast transition</ListItemText>
                    </ListItem>
                </List>
                <Typography style={{padding: '0 16px'}} variant="section">
                    Direction:
                </Typography>
                <List onChange={handleDirectionChange}>
                    {directions.map((direction) => (
                        <ListItem as="label" key={direction}>
                            <ListItemCell>
                                <input
                                    type="radio"
                                    name="direction"
                                    value={direction}
                                    defaultChecked={state.direction === direction}
                                />
                            </ListItemCell>
                            <ListItemText>{direction}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Flex>
    </div>
</Flex>;
```
