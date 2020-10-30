```js
const {
    Presentation,
    usePresentation,
    PresentationControls,
    PresentationState,
    PresentationPane
} = require('../../../styleguide-components/presentation');
const {DraftIcon} = require('../../icons');

const BadgeExample = (props) => {
    const {
        useTooltip,
        hovered,
        selected,
        disabled,
        variant,
        size,
        hasPrepend,
        hasAppend,
        indicatorPlacement
    } = usePresentation();
    const [text, setText] = React.useState('Gene Expression Similarity Search');

    return (
        <React.Fragment>
            <Controls>
                <ControlsItem
                    style={{
                        width: 420,
                        height: 40
                    }}
                >
                    <Tab
                        variant={variant}
                        size={size}
                        prepend={hasPrepend && <DraftIcon />}
                        append={
                            hasAppend && (
                                <Typography as="span" intent="quiet" variant="caption">
                                    81
                                </Typography>
                            )
                        }
                        hovered={hovered}
                        selected={selected}
                        disabled={disabled}
                        indicatorPlacement={indicatorPlacement}
                        tooltip={useTooltip && text}
                    >
                        {text}
                    </Tab>
                </ControlsItem>
            </Controls>
            <Divider variant="transparent" gap={3} />
            <Controls>
                <ControlsItem>
                    <Typography as="label" htmlFor="tab-text">
                        Tab text:
                    </Typography>
                </ControlsItem>
                <ControlsItem>
                    <Input
                        style={{width: 100}}
                        id="tab-text"
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
        useTooltip: false,
        hovered: false,
        selected: false,
        disabled: false,
        hasPrepend: true,
        hasAppend: false,
        variant: 'ghost',
        size: 'normal',
        indicatorPlacement: 'bottom'
    }}
>
    <PresentationPane>
        <BadgeExample />
    </PresentationPane>
    <PresentationControls>
        <PresentationState name="useTooltip" label="Use tooltip" />
        <PresentationState name="hovered" label="Hovered" />
        <PresentationState name="selected" label="Selected" />
        <PresentationState name="disabled" label="Disabled" />
        <PresentationState name="hasPrepend" label="Append" />
        <PresentationState name="hasAppend" label="Prepend" />

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

        <ListItem>
            <Typography variant="section">Indicator placement</Typography>
        </ListItem>
        <PresentationState name="indicatorPlacement" label="Left" value="left" />
        <PresentationState name="indicatorPlacement" label="Top" value="top" />
        <PresentationState name="indicatorPlacement" label="Right" value="right" />
        <PresentationState name="indicatorPlacement" label="Bottom" value="bottom" />
    </PresentationControls>
</Presentation>;
```
