```js
const {
    Presentation,
    usePresentation,
    PresentationControls,
    PresentationState,
    PresentationPane,
    PresentationSection
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
    const {
        inverted,
        animated,
        hasPrepend,
        hasAppend,
        view,
        orientation,
        variant,
        size,
        indicatorPlacement
    } = usePresentation();

    const [value, setValue] = React.useState(0);

    return (
        <TabsExampleFrame inverted={inverted}>
            <Tabs
                value={value}
                onValueChange={(value) => setValue(value)}
                orientation={orientation}
                variant={variant}
                size={size}
                animated={animated}
                indicatorPlacement={indicatorPlacement}
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
            </Tabs>
        </TabsExampleFrame>
    );
}

<Presentation
    initialState={{
        animated: true,
        orientation: 'horizontal',
        variant: 'ghost',
        size: 'normal',
        indicatorPlacement: 'bottom'
    }}
>
    <PresentationPane>
        <TabsExample />
    </PresentationPane>
    <PresentationControls>
        <PresentationState name="animated" label="Animated" />

        <PresentationState name="hasPrepend" label="Prepend" />
        <PresentationState name="hasAppend" label="Append" />

        <ListItem>
            <Typography variant="section">Orientation</Typography>
        </ListItem>
        <PresentationState name="orientation" label="Horizontal" value="horizontal" />
        <PresentationState name="orientation" label="Vertical" value="vertical" />

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
        <PresentationState name="size" label="Tiny" value="tiny" />

        <PresentationSection depends="variant" value="ghost">
            <ListItem>
                <Typography variant="section">Indicator placement</Typography>
            </ListItem>
            <PresentationState name="indicatorPlacement" label="Left" value="left" />
            <PresentationState name="indicatorPlacement" label="Top" value="top" />
            <PresentationState name="indicatorPlacement" label="Right" value="right" />
            <PresentationState name="indicatorPlacement" label="Bottom" value="bottom" />
        </PresentationSection>
    </PresentationControls>
</Presentation>;
```

### Simple tabs

```js
function TabPanel(props) {
    const {children, selectedValue, value} = props;

    return (
        <div role="tabpanel" hidden={selectedValue !== value}>
            <Typography style={{padding: '20px 24px 0'}}>{children}</Typography>
            <Preloader show count={4} wrapAll={List} wrapEach={ListItem} />
        </div>
    );
}

function TabsFrame() {
    const [tabValue, setTabValue] = React.useState(0);

    return (
        <>
            <Tabs value={tabValue} onValueChange={(value) => setTabValue(value)}>
                <Tab>Signals</Tab>
                <Tab>Tree view</Tab>
                <Tab>My bookmarks</Tab>
                <Tab disabled>Drafts</Tab>
            </Tabs>

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

### Horizontal tabs with long labels

```js
function TabPanel(props) {
    const {children, selectedValue, value} = props;

    return (
        <div role="tabpanel" hidden={selectedValue !== value}>
            <Typography style={{padding: '20px 24px 0'}}>{children}</Typography>
            <Preloader show count={4} wrapAll={List} wrapEach={ListItem} />
        </div>
    );
}

function TabsFrame() {
    const [tabValue, setTabValue] = React.useState(10);

    return (
        <>
            <Tabs value={tabValue} onValueChange={(value) => setTabValue(value)}>
                <Tab value={10}>
                    Creative Commons Attribution 2.0 Gene Expression Similarity Search
                </Tab>
                <Tab value={20}>Expression Data Miner</Tab>
                <Tab value={30} disabled>
                    Genetic Variations Initializer
                </Tab>
            </Tabs>

            <TabPanel selectedValue={tabValue} value={10}>
                Creative Commons Attribution 2.0 Gene Expression Similarity Search
            </TabPanel>
            <TabPanel selectedValue={tabValue} value={20}>
                Expression Data Miner
            </TabPanel>
            <TabPanel selectedValue={tabValue} value={30}>
                Genetic Variations Initializer
            </TabPanel>
        </>
    );
}

<PageContent as={Paper}>
    <TabsFrame />
</PageContent>;
```

### Horizontal tabs with meta info (prepend, append)

```js
const {BookmarkBorderedIcon, DraftIcon, OpenFolderIcon, LinkIcon} = require('../../icons');

function TabPanel(props) {
    const {children, selectedValue, value} = props;

    return (
        <div role="tabpanel" hidden={selectedValue !== value}>
            <Typography style={{padding: '20px 24px 0'}}>{children}</Typography>
            <Preloader show count={4} wrapAll={List} wrapEach={ListItem} />
        </div>
    );
}

function TabsFrame() {
    const [tabValue, setTabValue] = React.useState(10);

    return (
        <>
            <Tabs value={tabValue} onValueChange={(value) => setTabValue(value)}>
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
            </Tabs>

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

### Vertical tabs with icons

```js
const {BookmarkBorderedIcon, DraftIcon, OpenFolderIcon, LinkIcon} = require('../../icons');

function TabPanel(props) {
    const {children, selectedValue, value} = props;

    return (
        <div role="tabpanel" hidden={selectedValue !== value} style={{width: '100%'}}>
            <Typography style={{padding: '0 24px'}}>{children}</Typography>
            <Preloader show count={4} wrapAll={List} wrapEach={ListItem} />
        </div>
    );
}

function TabsFrame() {
    const [tabValue, setTabValue] = React.useState(0);

    return (
        <div style={{display: 'flex'}}>
            <Tabs
                value={tabValue}
                orientation="vertical"
                onValueChange={(value) => setTabValue(value)}
            >
                <Tab
                    prepend={<LinkIcon />}
                    tooltip={<span style={{whiteSpace: 'nowrap'}}>Signals</span>}
                />
                <Tab
                    prepend={<OpenFolderIcon />}
                    tooltip={<span style={{whiteSpace: 'nowrap'}}>Tree view</span>}
                />
                <Tab
                    prepend={<BookmarkBorderedIcon />}
                    tooltip={<span style={{whiteSpace: 'nowrap'}}>My bookmarks</span>}
                />
                <Tab
                    prepend={<DraftIcon />}
                    tooltip={<span style={{whiteSpace: 'nowrap'}}>Drafts</span>}
                    disabled
                />
            </Tabs>

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
        </div>
    );
}

<PageContent as={Paper}>
    <TabsFrame />
</PageContent>;
```

### Tabs as links

```js
const {BookmarkBorderedIcon, DraftIcon, OpenFolderIcon, LinkIcon} = require('../../icons');

function TabsFrame() {
    const [tabValue, setTabValue] = React.useState(10);

    return (
        <Tabs value={tabValue} onValueChange={(value) => setTabValue(value)}>
            <Tab value={10} component="a" href="#tabs">
                Tab
            </Tab>
            <Tab value={20} component="a" href="#link">
                Link
            </Tab>
            <Tab value={30} component="a" href="#select">
                Select
            </Tab>
        </Tabs>
    );
}

<PageContent as={Paper}>
    <TabsFrame />
</PageContent>;
```
