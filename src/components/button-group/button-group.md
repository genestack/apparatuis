```js
const {
    Presentation,
    usePresentation,
    PresentationControls,
    PresentationState,
    PresentationPane
} = require('../../../styleguide-components/presentation');

const {DownloadIcon} = require('../../icons/download-icon');
const {LockIcon} = require('../../icons/lock-icon');
const {PlayIcon} = require('../../icons/play-icon');

function ButtonGroupExample() {
    const presentation = usePresentation();

    const [active, setActive] = React.useState(null);
    const buttonGroupRef = React.useRef(null);

    return (
        <ButtonGroup
            ghost={presentation.variant === 'ghost'}
            intent={presentation.intent}
            size={presentation.size}
        >
            <Button
                icon={presentation.icons ? <DownloadIcon /> : null}
                active={presentation.switcher && active === 'download'}
                onClick={() => setActive('download')}
            >
                {presentation.text ? 'Download' : null}
            </Button>
            <Button
                icon={presentation.icons ? <LockIcon /> : null}
                active={presentation.switcher && active === 'lock'}
                onClick={() => setActive('lock')}
            >
                {presentation.text ? 'Lock' : null}
            </Button>
            <Button
                icon={presentation.icons ? <PlayIcon /> : null}
                active={presentation.switcher && active === 'play'}
                onClick={() => setActive('play')}
            >
                {presentation.text ? 'Play' : null}
            </Button>
        </ButtonGroup>
    );
}

<Presentation
    initialState={{
        variant: 'normal',
        intent: 'default',
        size: 'normal',
        text: true
    }}
>
    <PresentationPane>
        <ButtonGroupExample />
    </PresentationPane>
    <PresentationControls>
        <PresentationState name="inverted" label="Inverted" />
        <PresentationState name="text" label="Text" />
        <PresentationState name="icons" label="Icons" />
        <PresentationState name="switcher" label="Switcher" />
        <ListItem>
            <Typography variant="section">Variant</Typography>
        </ListItem>
        <PresentationState name="variant" label="Normal" value="normal" />
        <PresentationState name="variant" label="Ghost" value="ghost" />
        <ListItem>
            <Typography variant="section">Intent</Typography>
        </ListItem>
        <PresentationState name="intent" label="Default" value="default" />
        <PresentationState name="intent" label="Accent" value="accent" />
        <PresentationState name="intent" label="Alarm" value="alarm" />
        <ListItem>
            <Typography variant="section">Size</Typography>
        </ListItem>
        <PresentationState name="size" label="Normal" value="normal" />
        <PresentationState name="size" label="Small" value="small" />
        <PresentationState name="size" label="Tiny" value="tiny" />
    </PresentationControls>
</Presentation>;
```

### Active Buttons

```js
initialState = {
    value: null
};

<PageContent as={Paper}>
    <ButtonGroup>
        <TooltipHandler tooltip={<Tooltip>First</Tooltip>}>
            <Button active={state.value === 'First'} onClick={() => setState({value: 'First'})}>
                First
            </Button>
        </TooltipHandler>
        <TooltipHandler tooltip={<Tooltip>Second</Tooltip>}>
            <Button
                disabled
                active={state.value === 'Second'}
                onClick={() => setState({value: 'Second'})}
            >
                Second
            </Button>
        </TooltipHandler>
        <TooltipHandler tooltip={<Tooltip>Third</Tooltip>}>
            <Button active={state.value === 'Third'} onClick={() => setState({value: 'Third'})}>
                Third
            </Button>
        </TooltipHandler>
    </ButtonGroup>
</PageContent>;
```

### Button With Menu

```js
const {KeyboardArrowBottomIcon} = require('../../icons/keyboard-arrow-bottom-icon.tsx');

<PageContent as={Paper}>
    <ButtonGroup intent="accent">
        <Button>Main Action</Button>
        <MenuHandler
            menu={
                <Menu placement="bottom-end">
                    <MenuItem>Secondary Action 1</MenuItem>
                    <MenuItem>Secondary Action 2</MenuItem>
                    <MenuItem>Secondary Action 3</MenuItem>
                </Menu>
            }
        >
            {({open}) => <Button active={open} icon={<KeyboardArrowBottomIcon />} />}
        </MenuHandler>
    </ButtonGroup>
</PageContent>;
```
