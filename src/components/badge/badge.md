```js
const {SearchIcon} = require('../../icons/search-icon.tsx');

function ListExample() {
    return (
        <Paper style={{maxWidth: 257}}>
            <List>
                <ListItem box="paragraph" append={<Badge ghost>Admin</Badge>}>
                    Breast
                </ListItem>
                <ListItem box="paragraph" append={<Badge uppercase={false}>You</Badge>}>
                    Breast
                </ListItem>
                <ListItem box="paragraph" append={<Badge ghost>Superadmin</Badge>}>
                    Breast
                </ListItem>
                <ListItem box="paragraph" append={<Badge ghost>Admin</Badge>}>
                    Breast
                </ListItem>
            </List>
        </Paper>
    );
}

function RowExample() {
    return (
        <React.Fragment>
            <div style={{width: 400, display: 'flex'}}>
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
            <div style={{width: 400, display: 'flex'}}>
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
                    <Badge>Foo</Badge>
                </div>
            </div>
        </React.Fragment>
    );
}

<RootElement>
    <PageContent as={Paper}>
        <WithSeparator separator={<Divider gap={4} />}>
            <React.Fragment>
                <Typography quiet>In text</Typography>
                <Divider variant="transparent" gap={2} />

                <Typography>
                    Clermont Dionne <Badge ghost>Admin</Badge>
                </Typography>
            </React.Fragment>
            <React.Fragment>
                <Typography quiet>In button</Typography>
                <Divider variant="transparent" gap={2} />
                <Button variant="section" box="paragraph">
                    <Badge ghost>EXP</Badge> Send
                </Button>
            </React.Fragment>
            <React.Fragment>
                <Typography quiet>In list</Typography>
                <Divider variant="transparent" gap={2} />
                <ListExample />
            </React.Fragment>
            <React.Fragment>
                <Typography quiet>In input</Typography>
                <Divider variant="transparent" gap={2} />
                <Input
                    prepend={<SearchIcon />}
                    append={<Badge ghost>EXP</Badge>}
                    placeholder="Search by expression"
                />
            </React.Fragment>
            <React.Fragment>
                <Typography quiet>In row cell</Typography>
                <Divider variant="transparent" gap={2} />
                <RowExample />
            </React.Fragment>
        </WithSeparator>
    </PageContent>
</RootElement>;
```
