```js
const [state, setState] = React.useState({
    referenceElement: null,
    expanded: false,
    placement: 'bottom',
    withArrow: true,
    disableTransition: false,
    roundCorners: false
});

handleButtonClick = (event) => {
    const target = event.currentTarget;

    setState(({referenceElement}) => ({
        ...state,
        referenceElement: !referenceElement ? target : null
    }));
};

handleToggleExpandButtonClick = () => setState(({expanded}) => ({...state, expanded: !expanded}));

handlePlacementChange = (event) => {
    setState({...state, placement: event.target.value});
};

handleWithArrowChange = (event) => setState({...state, withArrow: event.currentTarget.checked});

handleDisableTransitionChange = (event) =>
    setState({...state, disableTransition: event.currentTarget.checked});

handleRoundCornersChange = (event) =>
    setState({...state, roundCorners: event.currentTarget.checked});

const popperRef = React.useRef(null);

React.useLayoutEffect(() => {
    popperRef.current.scheduleUpdate();
}, [state.expanded, state.withArrow]);

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
                    <ListItem
                        as="label"
                        prepend={
                            <input
                                type="checkbox"
                                checked={state.roundCorners}
                                onChange={handleRoundCornersChange}
                            />
                        }
                    >
                        Round Corners
                    </ListItem>
                </List>
            </PageFullWidth>
        </PageContent>
    </ControlsItem>
    <ControlsItem>
        <Button onClick={handleButtonClick} intent="accent">
            Toggle popover
        </Button>
        <Popover
            open={!!state.referenceElement}
            referenceElement={state.referenceElement}
            popperRef={popperRef}
            placement={state.placement}
            withArrow={state.withArrow}
            disableTransition={state.disableTransition}
            roundCorners={state.roundCorners}
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
