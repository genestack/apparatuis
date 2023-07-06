```js
const {
    Presentation,
    usePresentation,
    PresentationControls,
    PresentationState,
    PresentationPane
} = require('../../../styleguide-components/presentation');
const {ArrowRightIcon} = require('../../icons/arrow-right-icon');

const SwitchExample = (props) => {
    const presentation = usePresentation();

    return (
        <Typography
            as="label"
            style={{display: 'flex'}}
            variant={presentation.small ? 'caption' : undefined}
        >
            <Controls gap={presentation.small ? 1 : 2}>
                <ControlsItem>
                    <Switch
                        size={presentation.small ? 'small' : 'normal'}
                        disabled={presentation.disabled}
                    />
                </ControlsItem>
                <ControlsItem>Prefer my drafts</ControlsItem>{' '}
            </Controls>
        </Typography>
    );
};

<Presentation>
    <PresentationPane>
        <SwitchExample />
    </PresentationPane>
    <PresentationControls>
        <PresentationState name="inverted" label="Inverted" />
        <PresentationState name="disabled" label="Disabled" />
        <PresentationState name="small" label="Small" />
    </PresentationControls>
</Presentation>;
```

#### Usage example

```js
const {useMenuHandler} = require('../menu/use-menu-handler');
const {QuestionGhostIcon} = require('../../icons/question-ghost-icon');
const {WarningIcon} = require('../../icons/warning-icon');
const {DarkContext} = require('../../utils/dark-context');

function MenuExample() {
    const referenceElement = React.useRef();
    const [checked, setChecked] = React.useState(false);
    const menu = useMenuHandler({referenceElement: referenceElement.current});
    const onCheckedChange = (checked) => {
        setChecked(checked);
    };

    return (
        <React.Fragment>
            <Button
                {...menu.getReferenceProps({
                    ref: referenceElement,
                    active: menu.isOpen
                })}
            >
                Open menu
            </Button>
            <Menu {...menu.getMenuProps()}>
                <MenuItem
                    as="label"
                    append={<Switch checked={checked} onCheckedChange={onCheckedChange} />}
                >
                    Public access
                </MenuItem>
                <MenuItem>Rename</MenuItem>
                <MenuItem>Move to...</MenuItem>
            </Menu>
        </React.Fragment>
    );
}

function SwitchListItems() {
    return (
        <>
            <ListItem as="label" append={<Switch />}>
                Connect to Arvados 1
            </ListItem>
            <ListItem as="label" append={<Switch disabled />}>
                Connect to Arvados 2
            </ListItem>
            <ListItem as="label" append={<Switch />}>
                Connect to Arvados 3
            </ListItem>
            <ListItem as="label" append={<Switch />}>
                Connect to Arvados 4
            </ListItem>
        </>
    );
}
<PageContent as={Paper}>
    <Controls>
        <Typography intent="quiet">In menus</Typography>
    </Controls>
    <Divider variant="transparent" gap={2} />
    <MenuExample />
    <Divider gap={4} />
    <Typography intent="quiet">In lists</Typography>
    <Divider variant="transparent" gap={2} />
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Paper style={{maxWidth: 257}}>
            <ListItem>List Item 1</ListItem>
            <ListItem as="label" append={<QuestionGhostIcon />}>
                List Item 2
            </ListItem>
            <ListItem
                as="label"
                append={
                    <TooltipHandler tooltip={<Tooltip>Switch is disabled</Tooltip>}>
                        <Switch disabled />
                    </TooltipHandler>
                }
            >
                Connect to Arvados 1
            </ListItem>
            <ListItem as="label" append={<Switch defaultChecked />}>
                Connect to Arvados 2
            </ListItem>
        </Paper>
        <Paper style={{maxWidth: 257, backgroundColor: '#F3F5F7'}}>
            <SwitchListItems />
        </Paper>
        <DarkContext.Provider value={true}>
            <Paper style={{maxWidth: 257}}>
                <SwitchListItems />
            </Paper>
        </DarkContext.Provider>
    </div>
    <Divider gap={4} />
    <Typography intent="quiet">
        <a name="switch-with-label">Label</a>
    </Typography>
    <Divider variant="transparent" gap={2} />
    <Typography>
        You can provide a label to the Switch via the FormControlLabel component.
    </Typography>
    <Divider variant="transparent" gap={2} />
    <FormControlLabel control={<Switch defaultChecked />} label="Label" />
    <Divider variant="transparent" gap={1} />
    <FormControlLabel disabled control={<Switch />} label="Disabled" />
</PageContent>;
```
