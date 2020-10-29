#### Tab combinations

There is presented `Tab` in possible combinations below:

```js
const {DraftIcon, BookmarkIcon} = require('../../icons');

function TabSamples(props) {
    const {title, ...tabProps} = props;

    return (
        <React.Fragment>
            <Typography>{title}</Typography>
            <Divider variant="transparent" gap={1} />

            <Controls>
                <ControlsItem>
                    <Tab {...tabProps} selected>
                        Selected
                    </Tab>
                </ControlsItem>
                <ControlsItem>
                    <Tab
                        {...tabProps}
                        append={
                            <Typography
                                as="span"
                                intent="quiet"
                                inverted={tabProps.variant === 'solid'}
                                variant="caption"
                            >
                                81
                            </Typography>
                        }
                        selected
                    >
                        Selected with append
                    </Tab>
                </ControlsItem>
                <ControlsItem>
                    <Tab {...tabProps} prepend={<DraftIcon />} hovered>
                        Hovered
                    </Tab>
                </ControlsItem>
                <ControlsItem>
                    <Tab {...tabProps} prepend={<DraftIcon />} disabled>
                        Disabled
                    </Tab>
                </ControlsItem>
                <ControlsItem>
                    <Tab
                        {...tabProps}
                        tooltip="Some tooltip text"
                    >
                        With tooltip
                    </Tab>
                </ControlsItem>
            </Controls>
        </React.Fragment>
    );
}

<RootElement>
    <PageContent as={Paper}>
        <WithSeparator separator={<Divider gap={4} />}>
            <TabSamples title="Ghost tabs" />
            <TabSamples title="Solid tabs" variant="solid" />
            <TabSamples title="Small solid tabs" variant="solid" size="small" />
        </WithSeparator>
    </PageContent>
</RootElement>;
```
