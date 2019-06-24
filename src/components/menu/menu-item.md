```js
const {DownloadIcon} = require('../../icons/download-icon');
const {HelpIcon} = require('../../icons/help-icon');

initialState = {
    longTitle: false,
    caption: false,
    wrap: false,
    prepend: false,
    appendIcon: false,
    appendText: false,
    subMenu: false,
    subtitle: 'none'
};

const shortTitle = 'Menu item';
const longTitle = 'Super long menu item that could break line in some cases';

const longSubtitle = 'Subtitle could contains some description about menu item';
const shortSubtitle = 'Subtitle for menu item';

renderCheckbox = (name, label) => (
    <ListItem as="label">
        <ListItemCell>
            <input
                type="checkbox"
                checked={state[name]}
                onChange={(event) => setState({[name]: event.target.checked})}
            />
        </ListItemCell>
        <ListItemText>{label}</ListItemText>
    </ListItem>
);

renderRadio = (name, label, value) => (
    <ListItem as="label">
        <ListItemCell>
            <input
                type="radio"
                name={name}
                value={value}
                checked={state[name] === value}
                onChange={(event) => setState({[name]: value})}
            />
        </ListItemCell>
        <ListItemText>{label}</ListItemText>
    </ListItem>
);

<PageContent>
    <Controls>
        <ControlsItem grow style={{textAlign: 'center'}}>
            <Paper style={{display: 'inline-block', maxWidth: 320, minWidth: 160}}>
                <MenuItem
                    wrap={state.wrap}
                    prepend={state.prepend ? <DownloadIcon /> : null}
                    append={
                        state.appendIcon && state.appendText ? (
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
                        ) : state.appendIcon ? (
                            <HelpIcon />
                        ) : state.appendText ? (
                            <Typography quiet as="span">
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
            </Paper>
        </ControlsItem>
        <ControlsItem>
            <Paper>
                <List>
                    {renderCheckbox('longTitle', 'Long Title')}
                    {renderCheckbox('caption', 'Caption')}
                    {renderCheckbox('wrap', 'Wrap title')}
                    {renderCheckbox('prepend', 'Prepend Icon')}
                    {renderCheckbox('appendIcon', 'Append Icon')}
                    {renderCheckbox('appendText', 'Append Text')}
                    {renderCheckbox('subMenu', 'SubMenu')}
                    {renderRadio('subtitle', 'No Subtitle', 'none')}
                    {renderRadio('subtitle', 'Short Subtitle', 'short')}
                    {renderRadio('subtitle', 'Long Subtitle', 'long')}
                </List>
            </Paper>
        </ControlsItem>
    </Controls>
</PageContent>;
```