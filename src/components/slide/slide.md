```js
initialState = {visible: true, direction: 'left'};

handleButtonClick = () => setState(({visible}) => ({visible: !visible}));
handleDirectionChange = (event) =>
    setState({
        direction: event.currentTarget.value
    });

<div style={{overflow: 'hidden', display: 'flex'}}>
    <div>
        <Slide in={state.visible} direction={state.direction}>
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

    <div style={{marginLeft: 16}}>
        <Typography variant="section">Direction:</Typography>
        <List>
            <ListItem as="label">
                <ListItemCell>
                    <input
                        type="radio"
                        name="direction"
                        value="left"
                        checked={state.direction === 'left'}
                        onChange={handleDirectionChange}
                    />
                </ListItemCell>
                <ListItemText>Left</ListItemText>
            </ListItem>
            <ListItem as="label">
                <ListItemCell>
                    <input
                        type="radio"
                        name="direction"
                        value="right"
                        checked={state.direction === 'right'}
                        onChange={handleDirectionChange}
                    />
                </ListItemCell>
                <ListItemText>Right</ListItemText>
            </ListItem>
            <ListItem as="label">
                <ListItemCell>
                    <input
                        type="radio"
                        name="direction"
                        value="top"
                        checked={state.direction === 'top'}
                        onChange={handleDirectionChange}
                    />
                </ListItemCell>
                <ListItemText>Top</ListItemText>
            </ListItem>
            <ListItem as="label">
                <ListItemCell>
                    <input
                        type="radio"
                        name="direction"
                        value="bottom"
                        checked={state.direction === 'bottom'}
                        onChange={handleDirectionChange}
                    />
                </ListItemCell>
                <ListItemText>Bottom</ListItemText>
            </ListItem>
        </List>
    </div>
</div>;
```
