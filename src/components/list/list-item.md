```js
const {
    Presentation,
    usePresentation,
    PresentationControls,
    PresentationState,
    PresentationPane
} = require('../../../styleguide-components/presentation');
const {ArrowRightIcon} = require('../../icons/arrow-right-icon');
const {DownloadIcon} = require('../../icons/download-icon');
const {HelpIcon} = require('../../icons/help-icon');

const longTitle = 'Super long menu item that could break line in some cases';

function ListItemExample() {
    const presentation = usePresentation();

    const text = presentation.longTitle
        ? 'Super long list item that could break line in some cases'
        : 'List item';

    return (
        <PageContent>
            <Controls>
                <ControlsItem>
                    <ListItem
                        as="label"
                        style={{width: 200, border: '1px solid #ddd'}}
                        interactive={presentation.interactive}
                        wrap={presentation.wrap}
                        prepend={
                            presentation.prepend === 'icon' ? (
                                <DownloadIcon />
                            ) : presentation.prepend === 'checkbox' ? (
                                <input type="checkbox" id="listItemExampleCheckbox" />
                            ) : null
                        }
                        disabled={presentation.disabled}
                        append={
                            presentation.appendIcon && presentation.appendText ? (
                                <Controls>
                                    <ControlsItem>
                                        <Typography quiet as="span">
                                            ⌘ + O
                                        </Typography>
                                    </ControlsItem>
                                    <ControlsItem style={{display: 'flex'}}>
                                        <HelpIcon />
                                    </ControlsItem>
                                </Controls>
                            ) : presentation.appendIcon ? (
                                <HelpIcon />
                            ) : presentation.appendText ? (
                                <Typography quiet as="span">
                                    ⌘ + O
                                </Typography>
                            ) : null
                        }
                    >
                        <TextLabel
                            wrap={presentation.wrap}
                            caption={presentation.appendCaption ? '12' : null}
                        >
                            {text}
                        </TextLabel>
                    </ListItem>
                </ControlsItem>
            </Controls>
        </PageContent>
    );
}

<Presentation
    initialState={{
        longTitle: false,
        interactive: false,
        wrap: false,
        disabled: false,
        prepend: null,
        appendCaption: false,
        appendIcon: false,
        appendText: false
    }}
>
    <PresentationPane>
        <ListItemExample />
    </PresentationPane>
    <PresentationControls>
        <PresentationState name="longTitle" label="Long Title" />
        <PresentationState name="interactive" label="Interactive" />
        <PresentationState name="disabled" label="Disabled" />
        <PresentationState name="wrap" label="Wrap title" />
        <PresentationState name="appendCaption" label="Append Caption" />
        <PresentationState name="appendIcon" label="Append Icon" />
        <PresentationState name="appendText" label="Append Text" />
        <PresentationState name="prepend" label="No Prepend" value={null} />
        <PresentationState name="prepend" label="Prepend Icon" value="icon" />
        <PresentationState name="prepend" label="Prepend Checkbox" value="checkbox" />
    </PresentationControls>
</Presentation>;
```