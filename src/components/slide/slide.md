```js
const [state, setState] = React.useState({visible: true, direction: 'left', fast: false});

const directions = ['left', 'right', 'top', 'bottom'];

handleFastChange = (event) => setState({...state, fast: event.currentTarget.checked});
handleButtonClick = () => setState(({visible}) => ({...state, visible: !visible}));

<Controls>
    <FlexExpander />
    <ControlsItem>
        <Slide in={state.visible} direction={state.direction} fast={state.fast}>
            <Paper style={{width: 100, padding: 16}}>
                <Typography>Hi! I am could be hidden.</Typography>
            </Paper>
        </Slide>
        <Button
            style={{width: 100, marginTop: 8, position: 'relative'}}
            onClick={handleButtonClick}
            intent="accent"
        >
            {state.visible ? 'Hide' : 'Show'}
        </Button>
    </ControlsItem>
    <FlexExpander />
    <ControlsItem>
        <PageContent as={Paper}>
            <PageFullWidth>
                <List>
                    <ListItem
                        as="label"
                        interactive
                        prepend={
                            <input
                                type="checkbox"
                                onChange={handleFastChange}
                                checked={state.fast}
                            />
                        }
                    >
                        Fast transition
                    </ListItem>
                    <ListItem>
                        <Typography variant="section">Direction:</Typography>
                    </ListItem>
                    {directions.map((direction) => (
                        <ListItem
                            as="label"
                            interactive
                            key={direction}
                            prepend={
                                <input
                                    type="radio"
                                    name="direction"
                                    checked={state.direction === direction}
                                    onChange={() => setState({direction})}
                                />
                            }
                        >
                            {direction}
                        </ListItem>
                    ))}
                </List>
            </PageFullWidth>
        </PageContent>
    </ControlsItem>
</Controls>;
```
