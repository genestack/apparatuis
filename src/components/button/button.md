```js
const {
    Presentation,
    usePresentation,
    PresentationControls,
    PresentationState,
    PresentationPane
} = require('../../../styleguide-components/presentation');
const {ArrowRightIcon} = require('../../icons/arrow-right-icon');

const ButtonExampleFrame = (props) => {
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
                width: 240,
                height: 180,
                boxSizing: 'border-box'
            }}
        >
            <Typography
                variant="caption"
                intent="quiet"
                style={{
                    position: 'absolute',
                    right: 4,
                    top: 0
                }}
            >
                240x180
            </Typography>
            <div
                style={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    minWidth: 0
                }}
            >
                {props.children}
            </div>
        </div>
    );
};

function ButtonExample() {
    const presentation = usePresentation();

    let text;

    if (presentation.text === 'short') {
        text = 'Click me!';
    }

    if (presentation.text === 'long') {
        text = 'Button with very very long text that does not fit into a parent';
    }

    return (
        <ButtonExampleFrame inverted={presentation.inverted}>
            <Button
                component={presentation.renderAs}
                disabled={presentation.disabled}
                href={presentation.renderAs === 'a' ? document.location : undefined}
                ghost={presentation.variant === 'ghost'}
                intent={presentation.intent}
                icon={presentation.withIcon ? <ArrowRightIcon /> : undefined}
                wrap={presentation.wrap}
                size={presentation.size}
                rounded={presentation.rounded}
            >
                {text}
            </Button>
        </ButtonExampleFrame>
    );
}

<Presentation
    initialState={{
        renderAs: 'button',
        variant: 'solid',
        intent: 'no-intent',
        text: 'short',
        size: 'normal'
    }}
>
    <PresentationPane>
        <ButtonExample />
    </PresentationPane>
    <PresentationControls>
        <PresentationState name="inverted" label="Inverted" />
        <PresentationState name="disabled" label="Disabled" />
        <PresentationState name="wrap" label="Wrap words" />
        <PresentationState name="rounded" label="Rounded" />
        <ListItem>
            <Typography variant="section">Text</Typography>
        </ListItem>
        <PresentationState name="text" label="Short text" value="short" />
        <PresentationState name="text" label="Long text" value="long" />
        <PresentationState name="text" label="Without text" value="none" />
        <PresentationState name="withIcon" label="With icon" />
        <ListItem>
            <Typography variant="section">Render as</Typography>
        </ListItem>
        <PresentationState name="renderAs" label="Button" value="button" />
        <PresentationState name="renderAs" label="Anchor" value="a" />
        <PresentationState name="renderAs" label="Div" value="div" />
        <ListItem>
            <Typography variant="section">Variant</Typography>
        </ListItem>
        <PresentationState name="variant" label="Solid" value="solid" />
        <PresentationState name="variant" label="Ghost" value="ghost" />
        <ListItem>
            <Typography variant="section">Intent</Typography>
        </ListItem>
        <PresentationState name="intent" label="No intent" value="no-intent" />
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

### Upload file

```js
const {Presentation, PresentationPane} = require('../../../styleguide-components/presentation');

<Presentation>
    <PresentationPane>
        <Button component="label">
            Upload file...
            <input type="file" style={{display: 'none'}} />
        </Button>
    </PresentationPane>
</Presentation>;
```

### Button in disabled fieldset

```js
const {
    Presentation,
    usePresentation,
    PresentationControls,
    PresentationState,
    PresentationPane
} = require('../../../styleguide-components/presentation');

function ButtonFieldsetExample() {
    const presentation = usePresentation();

    return (
        <fieldset disabled={presentation.disabled}>
            <Button
                onClick={() => alert('click')}
                component={presentation.span ? 'span' : 'button'}
            >
                Click
            </Button>
        </fieldset>
    );
}

<Presentation initialState={{disabled: true, span: false}}>
    <PresentationPane>
        <ButtonFieldsetExample />
    </PresentationPane>
    <PresentationControls>
        <PresentationState name="disabled" label="Disable fieldset" />
        <PresentationState name="span" label="Use span element for button" />
    </PresentationControls>
</Presentation>;
```
