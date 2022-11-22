```js
const {DownloadIcon} = require('../../icons/download-icon');
const {QuestionGhostIcon} = require('../../icons/question-ghost-icon');
const [state, setState] = React.useState({
    longTitle: false,
    caption: false,
    wrap: false,
    disabled: false,
    prepend: 'none',
    appendIcon: false,
    appendText: false,
    subMenu: false,
    subtitle: 'none',
    inclusiveDisabled: false
});

const shortTitle = 'Menu item';
const longTitle = 'Super long menu item that could break line in some cases';

const longSubtitle = 'Subtitle could contains some description about menu item';
const shortSubtitle = 'Subtitle for menu item';

renderCheckbox = (name, label) => (
    <ListItem
        as="label"
        interactive
        prepend={
            <input
                type="checkbox"
                checked={state[name]}
                onChange={(event) => setState({...state, [name]: event.target.checked})}
            />
        }
    >
        {label}
    </ListItem>
);

renderRadio = (name, label, value) => (
    <ListItem
        as="label"
        interactive
        prepend={
            <input
                type="radio"
                name={name}
                value={value}
                checked={state[name] === value}
                onChange={(event) => setState({...state, [name]: value})}
            />
        }
    >
        {label}
    </ListItem>
);

<PageContent>
    <Controls>
        <ControlsItem grow style={{textAlign: 'center'}}>
            <Paper style={{display: 'inline-block', maxWidth: 320, minWidth: 160}}>
                <TooltipHandler
                    tooltip={
                        state.hasTooltip ? (
                            <Tooltip
                                portalContainer={document.body}
                                modifiers={{
                                    preventOverflow: {
                                        boundariesElement: 'viewport'
                                    }
                                }}
                                placement="top"
                            >
                                Explanation text
                            </Tooltip>
                        ) : null
                    }
                >
                    <MenuItem
                        wrap={state.wrap}
                        prepend={
                            state.prepend === 'icon' ? (
                                <DownloadIcon />
                            ) : state.prepend === 'checkbox' ? (
                                <input type="checkbox" id="menuItemExampleCheckbox" />
                            ) : null
                        }
                        disabled={state.disabled}
                        inclusiveDisabled={state.inclusiveDisabled}
                        append={
                            state.appendIcon && state.appendText ? (
                                <Controls>
                                    <ControlsItem>
                                        <Typography intent="quiet" as="span">
                                            ⌘ + O
                                        </Typography>
                                    </ControlsItem>
                                    <ControlsItem style={{display: 'flex'}}>
                                        <QuestionGhostIcon />
                                    </ControlsItem>
                                </Controls>
                            ) : state.appendIcon ? (
                                <QuestionGhostIcon />
                            ) : state.appendText ? (
                                <Typography intent="quiet" as="span">
                                    ⌘ + O
                                </Typography>
                            ) : null
                        }
                        subtitle={
                            state.subtitle === 'short'
                                ? shortSubtitle
                                : state.subtitle === 'long'
                                ? longSubtitle
                                : null
                        }
                        subMenu={state.subMenu ? <SubMenu /> : null}
                    >
                        <TextLabel caption={state.caption ? '125 MB' : null} wrap={state.wrap}>
                            {state.longTitle ? longTitle : shortTitle}
                        </TextLabel>
                    </MenuItem>
                </TooltipHandler>
            </Paper>
        </ControlsItem>
        <ControlsItem>
            <PageContent as={Paper}>
                <PageFullWidth>
                    <List>
                        {renderCheckbox('longTitle', 'Long Title')}
                        {renderCheckbox('caption', 'Caption')}
                        {renderCheckbox('wrap', 'Wrap title')}
                        {renderCheckbox('disabled', 'Disabled')}
                        {renderCheckbox('inclusiveDisabled', 'Inclusive disabled')}
                        {renderRadio('prepend', 'Prepend Icon', 'icon')}
                        {renderRadio('prepend', 'Prepend Checkbox', 'checkbox')}
                        {renderCheckbox('appendIcon', 'Append Icon')}
                        {renderCheckbox('appendText', 'Append Text')}
                        {renderCheckbox('subMenu', 'SubMenu')}
                        {renderRadio('subtitle', 'No Subtitle', 'none')}
                        {renderRadio('subtitle', 'Short Subtitle', 'short')}
                        {renderRadio('subtitle', 'Long Subtitle', 'long')}
                        <Divider />
                        {renderCheckbox('hasTooltip', 'With tooltip')}
                    </List>
                </PageFullWidth>
            </PageContent>
        </ControlsItem>
    </Controls>
</PageContent>;
```
