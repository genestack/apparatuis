```js
const {
    Presentation,
    usePresentation,
    PresentationControls,
    PresentationState,
    PresentationPane
} = require('../../../styleguide-components/presentation');
const {Typography} = require('../typography');
const {BookmarkBorderedIcon, DraftIcon, OpenFolderIcon, LinkIcon} = require('../../icons');

const TabsExampleFrame = (props) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                position: 'relative',
                border: '1px solid',
                borderColor: props.inverted
                    ? 'rgba(255, 255, 255, 0.6)'
                    : 'rgba(130, 130, 130, 0.6)',
                padding: 16,
                width: 600,
                height: 320,
                overflow: 'hidden',
                boxSizing: 'border-box'
            }}
        >
            <Typography
                variant="caption"
                quiet
                style={{
                    position: 'absolute',
                    right: 4,
                    top: 0
                }}
            >
                600x320
            </Typography>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 0
                }}
            >
                {props.children}
            </div>
        </div>
    );
};

function TabsExample() {
    const {inverted, variant, size, hasPrepend, hasAppend} = usePresentation();

    const [value, setValue] = React.useState(0);

    return (
        <TabsExampleFrame inverted={inverted}>
            <DropdownTabs
                value={value}
                onValueChange={(value) => setValue(value)}
                variant={variant}
                size={size}
            >
                <Tab prepend={hasPrepend && <LinkIcon />}>Signals</Tab>
                <Tab prepend={hasPrepend && <OpenFolderIcon />}>Tree view</Tab>
                <Tab
                    prepend={hasPrepend && <BookmarkBorderedIcon />}
                    append={
                        hasAppend && (
                            <Typography as="span" intent="quiet" variant="caption">
                                81
                            </Typography>
                        )
                    }
                >
                    My bookmarks
                </Tab>
                <Tab prepend={hasPrepend && <DraftIcon />} disabled>
                    Drafts
                </Tab>
            </DropdownTabs>
        </TabsExampleFrame>
    );
}

<Presentation
    initialState={{
        size: 'normal',
        variant: 'ghost',
        hasPrepend: true,
        hasAppend: true
    }}
>
    <PresentationPane>
        <TabsExample />
    </PresentationPane>
    <PresentationControls>
        <PresentationState name="hasPrepend" label="Prepend" />
        <PresentationState name="hasAppend" label="Append" />

        <ListItem>
            <Typography variant="section">Variant</Typography>
        </ListItem>
        <PresentationState name="variant" label="Ghost" value="ghost" />
        <PresentationState name="variant" label="Solid" value="solid" />

        <ListItem>
            <Typography variant="section">Size</Typography>
        </ListItem>
        <PresentationState name="size" label="Normal" value="normal" />
        <PresentationState name="size" label="Small" value="small" />
    </PresentationControls>
</Presentation>;
```

### Ghost dropdown tabs

```js
function TabPanel(props) {
    const {children, selectedValue, value} = props;

    return (
        <div role="tabpanel" hidden={selectedValue !== value} style={{paddingTop: 20}}>
            <Typography>{children}</Typography>
        </div>
    );
}

function TabsFrame() {
    const [tabValue, setTabValue] = React.useState(2);

    return (
        <>
            <DropdownTabs
                value={tabValue}
                onValueChange={(value) => setTabValue(value)}
                style={{
                    width: 160
                }}
            >
                <Tab>Signals</Tab>
                <Tab>Tree view</Tab>
                <Tab>My bookmarks</Tab>
                <Tab disabled>Drafts</Tab>
            </DropdownTabs>

            <TabPanel selectedValue={tabValue} value={0}>
                Signals
            </TabPanel>
            <TabPanel selectedValue={tabValue} value={1}>
                Tree view
            </TabPanel>
            <TabPanel selectedValue={tabValue} value={2}>
                My bookmarks
            </TabPanel>
            <TabPanel selectedValue={tabValue} value={3}>
                Drafts
            </TabPanel>
        </>
    );
}

<PageContent as={Paper}>
    <TabsFrame />
</PageContent>;
```

### Solid dropdown tabs

```js
function TabPanel(props) {
    const {children, selectedValue, value} = props;

    return (
        <div role="tabpanel" hidden={selectedValue !== value} style={{paddingTop: 20}}>
            <Typography>{children}</Typography>
        </div>
    );
}

function TabsFrame() {
    const [tabValue, setTabValue] = React.useState(2);

    return (
        <>
            <DropdownTabs
                value={tabValue}
                onValueChange={(value) => setTabValue(value)}
                variant="solid"
                style={{
                    width: 160
                }}
            >
                <Tab>Signals</Tab>
                <Tab>Tree view</Tab>
                <Tab>My bookmarks</Tab>
                <Tab disabled>Drafts</Tab>
            </DropdownTabs>

            <TabPanel selectedValue={tabValue} value={0}>
                Signals
            </TabPanel>
            <TabPanel selectedValue={tabValue} value={1}>
                Tree view
            </TabPanel>
            <TabPanel selectedValue={tabValue} value={2}>
                My bookmarks
            </TabPanel>
            <TabPanel selectedValue={tabValue} value={3}>
                Drafts
            </TabPanel>
        </>
    );
}

<PageContent as={Paper}>
    <TabsFrame />
</PageContent>;
```

### Small dropdown tabs with prepend and append

```js
const {BookmarkBorderedIcon, DraftIcon, OpenFolderIcon, LinkIcon} = require('../../icons');

function TabPanel(props) {
    const {children, selectedValue, value} = props;

    return (
        <div role="tabpanel" hidden={selectedValue !== value} style={{paddingTop: 20}}>
            <Typography>{children}</Typography>
        </div>
    );
}

function TabsFrame() {
    const [tabValue, setTabValue] = React.useState(30);

    return (
        <>
            <DropdownTabs value={tabValue} onValueChange={(value) => setTabValue(value)}>
                <Tab value={10} prepend={<LinkIcon />}>
                    Signals
                </Tab>
                <Tab value={20} prepend={<OpenFolderIcon />}>
                    Tree view
                </Tab>
                <Tab
                    value={30}
                    prepend={<BookmarkBorderedIcon />}
                    append={
                        <Typography as="span" intent="quiet" variant="caption">
                            120
                        </Typography>
                    }
                >
                    My bookmarks
                </Tab>
                <Tab value={40} prepend={<DraftIcon />} disabled>
                    Drafts
                </Tab>
            </DropdownTabs>

            <TabPanel selectedValue={tabValue} value={10}>
                Signals
            </TabPanel>
            <TabPanel selectedValue={tabValue} value={20}>
                Tree view
            </TabPanel>
            <TabPanel selectedValue={tabValue} value={30}>
                My bookmarks
            </TabPanel>
            <TabPanel selectedValue={tabValue} value={40}>
                Drafts
            </TabPanel>
        </>
    );
}

<PageContent as={Paper}>
    <TabsFrame />
</PageContent>;
```
