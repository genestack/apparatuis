```js
const {
    Presentation,
    usePresentation,
    PresentationControls,
    PresentationState,
    PresentationPane
} = require('../../../styleguide-components/presentation');

const BadgeExample = (props) => {
    const presentation = usePresentation();
    const [text, setText] = React.useState('Superadmin');

    return (
        <React.Fragment>
            <Controls>
                <ControlsItem>
                    <Badge
                        ghost={presentation.variant === 'ghost'}
                        intent={presentation.intent}
                        disableTextTransform={presentation.disableTextTransform}
                    >
                        {text}
                    </Badge>
                </ControlsItem>
            </Controls>
            <Divider variant="transparent" gap={3} />
            <Controls>
                <ControlsItem>
                    <Typography as="label" htmlFor="badge-text">
                        Badge text:
                    </Typography>
                </ControlsItem>
                <ControlsItem>
                    <Input
                        style={{width: 100}}
                        id="badge-text"
                        value={text}
                        onValueChange={setText}
                    />
                </ControlsItem>
            </Controls>
        </React.Fragment>
    );
};

<Presentation
    initialState={{
        variant: 'solid',
        intent: 'default'
    }}
>
    <PresentationPane>
        <BadgeExample />
    </PresentationPane>
    <PresentationControls>
        <PresentationState name="inverted" label="Inverted" />
        <PresentationState name="disableTextTransform" label="Disable text transform" />
        <ListItem>
            <Typography variant="section">Variant</Typography>
        </ListItem>
        <PresentationState name="variant" label="Solid" value="solid" />
        <PresentationState name="variant" label="Ghost" value="ghost" />
        <ListItem>
            <Typography variant="section">Intent</Typography>
        </ListItem>
        <PresentationState name="intent" label="No intent" value="default" />
        <PresentationState name="intent" label="Warning" value="warning" />
    </PresentationControls>
</Presentation>;
```

#### Usage example

```js
const {SearchIcon} = require('../../icons/search-icon.tsx');

function ListExample() {
    return (
        <Paper style={{maxWidth: 257}}>
            <List>
                <ListItem box="paragraph" append={<Badge ghost>Admin</Badge>}>
                    Macfarlane Burnet
                </ListItem>
                <ListItem box="paragraph" append={<Badge disableTextTransform>You</Badge>}>
                    Cyril Burt
                </ListItem>
                <ListItem box="paragraph" append={<Badge ghost>Superadmin</Badge>}>
                    John Cairns
                </ListItem>
                <ListItem box="paragraph" append={<Badge ghost>Admin</Badge>}>
                    Allan Campbell
                </ListItem>
            </List>
        </Paper>
    );
}

function RowExample() {
    return (
        <div style={{width: 400}}>
            <div style={{display: 'flex'}}>
                <Typography variant="caption" style={{display: 'flex', flexShrink: 1, flexGrow: 1}}>
                    Name
                </Typography>
                <Typography
                    variant="caption"
                    style={{width: 60, display: 'flex', flexShrink: 0, flexGrow: 0}}
                >
                    Signals
                </Typography>
            </div>
            <Divider gap={1} variant="dashed" />
            <div style={{display: 'flex'}}>
                <Typography
                    style={{display: 'flex', flexShrink: 1, flexGrow: 1, marginRight: '16px'}}
                >
                    Long compound name of the entity
                </Typography>

                <div
                    style={{
                        width: 60,
                        display: 'flex',
                        flexDirection: 'column',
                        flexShrink: 0,
                        flexGrow: 0
                    }}
                >
                    <Badge>Abc</Badge>
                    <Badge>Qwe</Badge>
                    <Badge>aggr</Badge>
                </div>
            </div>
        </div>
    );
}

<RootElement>
    <PageContent as={Paper}>
        <WithSeparator separator={<Divider gap={4} />}>
            <React.Fragment>
                <Typography quiet>In text</Typography>
                <Divider variant="transparent" gap={1} />

                <Typography>
                    Clermont Dionne <Badge ghost>Admin</Badge>
                </Typography>
            </React.Fragment>
            <React.Fragment>
                <Typography quiet>In button</Typography>
                <Divider variant="transparent" gap={1} />
                <Button>
                    <Badge>EXP</Badge>
                </Button>
            </React.Fragment>
            <React.Fragment>
                <Typography quiet>In list</Typography>
                <Divider variant="transparent" gap={1} />
                <ListExample />
            </React.Fragment>
            <React.Fragment>
                <Typography quiet>In input</Typography>
                <Divider variant="transparent" gap={1} />
                <Input
                    prepend={<SearchIcon />}
                    append={<Badge ghost>EXP</Badge>}
                    placeholder="Search by expression"
                />
            </React.Fragment>
            <React.Fragment>
                <Typography quiet>In row cell</Typography>
                <Divider variant="transparent" gap={1} />
                <RowExample />
            </React.Fragment>
        </WithSeparator>
    </PageContent>
</RootElement>;
```
