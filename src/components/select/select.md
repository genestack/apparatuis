```js
const React = require('react');
const {
    Presentation,
    usePresentation,
    PresentationControls,
    PresentationState,
    PresentationPane
} = require('../../../styleguide-components/presentation');
const {GenericFileIcon} = require('../../icons');
const {Badge} = require('../badge');
const {Typography} = require('../typography');
const {MenuCaption} = require('../menu');
const {Divider} = require('../divider');

const INTENSIFICATION = {
    icon: <GenericFileIcon />,
    badge: <Badge>Uberon</Badge>,
    counter: '128'
};

const NATIVE_OPTIONS = [
    {
        value: '0',
        label: 'All the perimeter'
    },
    {
        value: '10',
        label: 'North wall'
    },
    {
        value: '20',
        label: 'South wall'
    },
    {
        value: '30',
        label: 'East side'
    },
    {
        value: '40',
        label: 'West side'
    }
];

const MENU_OPTIONS = [
    {
        value: '10',
        label: 'Done',
        append: (
            <Typography quiet as="span" status="success">
                12
            </Typography>
        )
    },
    {
        value: '20',
        label: 'Queued',
        append: (
            <Typography quiet as="span">
                8
            </Typography>
        )
    },
    {
        value: '30',
        label: 'Running',
        append: (
            <Typography quiet as="span">
                354
            </Typography>
        )
    },
    {
        value: '40',
        label: 'Failed',
        append: (
            <Typography quiet as="span">
                1
            </Typography>
        ),
        disabled: true
    },
    {
        hasDivider: true,
        value: '0',
        label: 'All reports'
    }
];

const SelectExampleFrame = (props) => {
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
                width: 320,
                height: 180,
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
                320x180
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

function OptionLabelComponent({children}) {
    const {prepend, append} = usePresentation();

    return (
        <OptionLabel prepend={INTENSIFICATION[prepend]} append={INTENSIFICATION[append]}>
            {children}
        </OptionLabel>
    );
}

function SelectExample() {
    const {
        native,
        inverted,
        variant,
        intent,
        size,
        prepend,
        append,
        invalid,
        focused,
        disabled
    } = usePresentation();

    const [value, setValue] = React.useState('0');

    return (
        <SelectExampleFrame inverted={inverted}>
            <Select
                native={native}
                placeholder={native ? 'Select a wall' : 'Select a report...'}
                value={value}
                onValueChange={(value) => setValue(value)}
                ghost={variant === 'ghost'}
                intent={intent}
                size={size}
                invalid={invalid}
                disabled={disabled}
                focused={focused}
            >
                {native ? (
                    NATIVE_OPTIONS.map(({value, label}) => (
                        <Option
                            key={value}
                            value={value}
                            label={<OptionLabelComponent>{label}</OptionLabelComponent>}
                        >
                            {label}
                        </Option>
                    ))
                ) : (
                    <>
                        <MenuCaption>
                            <Typography quiet>Within the last 24 hours</Typography>
                        </MenuCaption>

                        {MENU_OPTIONS.map(({value, label, hasDivider, ...restProps}) => (
                            <React.Fragment key={value}>
                                {hasDivider && <Divider />}
                                <Option
                                    value={value}
                                    label={<OptionLabelComponent>{label}</OptionLabelComponent>}
                                    {...restProps}
                                >
                                    {label}
                                </Option>
                            </React.Fragment>
                        ))}
                    </>
                )}
            </Select>
        </SelectExampleFrame>
    );
}

<Presentation
    initialState={{
        native: true,
        variant: 'solid',
        intent: 'no-intent',
        size: 'normal',
        prepend: 'badge',
        append: 'counter'
    }}
>
    <PresentationPane>
        <SelectExample />
    </PresentationPane>
    <PresentationControls>
        <PresentationState name="inverted" label="Inverted" />

        <hr />

        <PresentationState name="native" label="Is native" />
        <PresentationState name="invalid" label="Invalid" />
        <PresentationState name="disabled" label="Disabled" />
        <PresentationState name="focused" label="Focus" />

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

        <ListItem>
            <Typography variant="section">Size</Typography>
        </ListItem>
        <PresentationState name="size" label="Normal" value="normal" />
        <PresentationState name="size" label="Small" value="small" />

        <ListItem>
            <Typography variant="section">Prepend</Typography>
        </ListItem>
        <PresentationState name="prepend" label="None" value="none" />
        <PresentationState name="prepend" label="Icon" value="icon" />
        <PresentationState name="prepend" label="Badge" value="badge" />
        <PresentationState name="prepend" label="Counter" value="counter" />

        <ListItem>
            <Typography variant="section">Append</Typography>
        </ListItem>
        <PresentationState name="append" label="None" value="none" />
        <PresentationState name="append" label="Icon" value="icon" />
        <PresentationState name="append" label="Badge" value="badge" />
        <PresentationState name="append" label="Counter" value="counter" />
    </PresentationControls>
</Presentation>;
```

### Native select with label

```js
const React = require('react');
const {Typography} = require('../typography');
const {HelpIcon, InfoIcon, FiltersIcon, LockIcon} = require('../../icons');

const OPTIONS = [
    {
        value: '10',
        label: 'Help',
        labelProps: {
            prepend: <HelpIcon />
        }
    },
    {
        value: '20',
        label: 'Filters',
        labelProps: {
            prepend: <FiltersIcon />
        }
    },
    {
        value: '30',
        label: 'Info',
        labelProps: {
            prepend: <InfoIcon />
        }
    },
    {
        value: '40',
        label: 'Lock',
        labelProps: {
            prepend: <LockIcon />
        }
    }
];

function SelectFrame() {
    const [selectValue, setSelectValue] = React.useState('');

    return (
        <>
            <Typography quiet as="span">
                Icon:{' '}
            </Typography>
            <Select
                native
                placeholder="Select a icon..."
                value={selectValue}
                onValueChange={(value) => setSelectValue(value)}
            >
                <Option value="" />
                {OPTIONS.map(({value, label, labelProps = {}, ...restProps}) => (
                    <Option
                        key={value}
                        value={value}
                        label={<OptionLabel {...labelProps}>{label}</OptionLabel>}
                        {...restProps}
                    >
                        {label}
                    </Option>
                ))}
            </Select>
        </>
    );
}

<PageContent as={Paper}>
    <SelectFrame />
</PageContent>;
```

### Menu select with unique labels

```js
const React = require('react');
const {Typography} = require('../typography');
const {CheckMarkIcon, PlayIcon, CrossIcon, MenuIcon} = require('../../icons');
const {Badge} = require('../badge');

const OPTIONS = [
    {
        value: '10',
        label: 'Done',
        prepend: <CheckMarkIcon />,
        append: (
            <Typography quiet as="span" status="success">
                12
            </Typography>
        )
    },
    {
        value: '20',
        label: 'Queued',
        prepend: <MenuIcon />,
        append: (
            <Typography quiet as="span">
                8
            </Typography>
        )
    },
    {
        value: '30',
        label: 'Running',
        prepend: <PlayIcon />,
        append: (
            <Typography quiet as="span">
                354
            </Typography>
        )
    },
    {
        value: '40',
        label: 'Failed',
        prepend: <CrossIcon />,
        append: (
            <Typography quiet as="span">
                1
            </Typography>
        ),
        disabled: true
    },
    {
        hasDivider: true,
        value: '0',
        label: 'All reports'
    }
];

function SelectFrame() {
    const [selectValue, setSelectValue] = React.useState('30');

    return (
        <>
            <Select
                value={selectValue}
                onValueChange={(value) => setSelectValue(value)}
                style={{
                    width: 135
                }}
            >
                {OPTIONS.map(({value, label, ...restProps}) => (
                    <Option
                        key={value}
                        value={value}
                        label={
                            <OptionLabel
                                prepend={<Badge>{label}</Badge>}
                                append={restProps.append}
                            />
                        }
                        {...restProps}
                    >
                        {label}
                    </Option>
                ))}
            </Select>
        </>
    );
}

<PageContent as={Paper}>
    <SelectFrame />
</PageContent>;
```
