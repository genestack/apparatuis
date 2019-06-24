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

<Controls justify="space-between">
    <ControlsItem style={{width: 200, alignSelf: 'flex-start'}}>
        <PageContent as={Paper}>
            <PageFullWidth>
                <List>
                    <ListItem>
                        <Typography variant="section">Properties</Typography>
                    </ListItem>
                    <ListItem
                        as="label"
                        interactive
                        prepend={
                            <input
                                type="checkbox"
                                checked={state.withArrow}
                                onChange={handleWithArrowChange}
                            />
                        }
                    >
                        With Arrow
                    </ListItem>
                    <ListItem
                        as="label"
                        prepend={
                            <input
                                type="checkbox"
                                checked={state.disableTransition}
                                onChange={handleDisableTransitionChange}
                            />
                        }
                    >
                        Disable Transition
                    </ListItem>
                </List>
            </PageFullWidth>
        </PageContent>
    </ControlsItem>
    <ControlsItem>
        <Button onClick={handleButtonClick} variant="primary">
            Toggle popover
        </Button>
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
    </ControlsItem>
    <ControlsItem style={{width: 200}}>
        <PageContent as={Paper}>
            <PageFullWidth>
                <ListItem>
                    <Typography variant="section" box="paragraph">
                        Placement
                    </Typography>
                </ListItem>
                <List onChange={handlePlacementChange}>
                    {placements.map((placement) => (
                        <ListItem
                            key={placement}
                            as="label"
                            interactive
                            prepend={
                                <input
                                    type="radio"
                                    name="placement"
                                    value={placement}
                                    defaultChecked={state.placement === placement}
                                />
                            }
                        >
                            {placement}
                        </ListItem>
                    ))}
                </List>
            </PageFullWidth>
        </PageContent>
    </ControlsItem>
</Controls>;
```
