```js
const {Button} = require('../button');
const {Paper} = require('../paper');
const {FlexExpander} = require('../flex-expander');
const {List, ListItem, ListItemCell, ListItemText} = require('../list');
const {Typography} = require('../typography');
const {Popover} = require('.');

initialState = {
    referenceElement: null,
    expanded: false,
    placement: 'bottom',
    withArrow: true,
    disableTransition: false
};

handleButtonClick = (event) => {
    const target = event.currentTarget;

    setState(({referenceElement}) => ({
        referenceElement: !referenceElement ? target : null
    }));
};

handleToggleExpandButtonClick = () =>
    setState(({expanded}) => ({expanded: !expanded}), () => this.popover.scheduleUpdate());

handlePlacementChange = (event) => {
    setState({placement: event.target.value});
};

handleWithArrowChange = (event) =>
    setState({withArrow: event.currentTarget.checked}, () => this.popover.scheduleUpdate());

handleDisableTransitionChange = (event) =>
    setState({disableTransition: event.currentTarget.checked});

const placements = [
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'top-start',
    'top-end',
    'right',
    'right-start',
    'right-end',
    'bottom',
    'bottom-end',
    'bottom-start',
    'left',
    'left-end',
    'left-start'
];

<div style={{display: 'flex', position: 'relative'}}>
    <List style={{width: 200}}>
        <ListItem>
            <ListItemText variant="section">Properties</ListItemText>
        </ListItem>
        <ListItem as="label">
            <ListItemCell>
                <input type="checkbox" checked={state.withArrow} onChange={handleWithArrowChange} />
            </ListItemCell>
            <ListItemText>With Arrow</ListItemText>
        </ListItem>
        <ListItem as="label">
            <ListItemCell>
                <input
                    type="checkbox"
                    checked={state.disableTransition}
                    onChange={handleDisableTransitionChange}
                />
            </ListItemCell>
            <ListItemText>Disable Transition</ListItemText>
        </ListItem>
    </List>
    <FlexExpander style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
        <Button onClick={handleButtonClick}>Toggle popover</Button>
    </FlexExpander>
    <Paper style={{width: 200}}>
        <List onChange={handlePlacementChange}>
            <ListItem>
                <ListItemText variant="section">Placement</ListItemText>
            </ListItem>
            {placements.map((placement) => (
                <ListItem key={placement} as="label">
                    <ListItemCell>
                        <input
                            type="radio"
                            name="placement"
                            value={placement}
                            defaultChecked={state.placement === placement}
                        />
                    </ListItemCell>
                    <ListItemText>{placement}</ListItemText>
                </ListItem>
            ))}
        </List>
    </Paper>
    <Popover
        open={!!state.referenceElement}
        referenceElement={state.referenceElement}
        style={{padding: 16, textAlign: 'center'}}
        ref={(popover) => (this.popover = popover)}
        placement={state.placement}
        withArrow={state.withArrow}
        disableTransition={state.disableTransition}
    >
        <Typography box="paragraph">Hi! I am popover</Typography>
        {state.expanded ? (
            <Typography box="paragraph">With some expanded content</Typography>
        ) : null}
        <Button onClick={handleToggleExpandButtonClick}>Toggle Content</Button>
    </Popover>
</div>;
```
