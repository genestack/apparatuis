```js
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
    setState(({expanded}) => ({expanded: !expanded}), () => this.popper.scheduleUpdate());

handlePlacementChange = (event) => {
    setState({placement: event.target.value});
};

handleWithArrowChange = (event) =>
    setState({withArrow: event.currentTarget.checked}, () => this.popper.scheduleUpdate());

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

<div style={{display: 'flex', position: 'relative', alignItems: 'center'}}>
    <PageContent as={Paper} style={{width: 200, alignSelf: 'flex-start'}}>
        <ListItemText variant="section" box="paragraph">
            Properties
        </ListItemText>
        <PageFullWidth>
            <List>
                <ListItem as="label">
                    <ListItemCell>
                        <input
                            type="checkbox"
                            checked={state.withArrow}
                            onChange={handleWithArrowChange}
                        />
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
        </PageFullWidth>
    </PageContent>
    <FlexExpander style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
        <Button onClick={handleButtonClick}>Toggle popover</Button>
    </FlexExpander>
    <PageContent as={Paper} style={{width: 200}}>
        <ListItemText variant="section" box="paragraph">
            Placement
        </ListItemText>
        <PageFullWidth>
            <List onChange={handlePlacementChange}>
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
        </PageFullWidth>
    </PageContent>
    <Popover
        open={!!state.referenceElement}
        referenceElement={state.referenceElement}
        popperRef={(popper) => (this.popper = popper)}
        placement={state.placement}
        withArrow={state.withArrow}
        disableTransition={state.disableTransition}
    >
        <PageContent style={{textAlign: 'center'}}>
            <Typography box="paragraph">Hi! I am popover</Typography>
            {state.expanded ? (
                <Typography box="paragraph">With some expanded content</Typography>
            ) : null}
            <Button onClick={handleToggleExpandButtonClick}>Toggle Content</Button>
        </PageContent>
    </Popover>
</div>;
```
