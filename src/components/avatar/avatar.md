```js
const [state, setState] = React.useState({
    userName: 'Marc Chagall'
});

const {UserGroupIcon} = require('../../icons/user-group-icon');
const {OrganizationIcon} = require('../../icons/organization-icon');

const AvatarListExample = () => {
    return (
        <List>
            <ListItem>
                <Controls>
                    <ControlsItem>
                        <Avatar initials="WK" title="Wassily Kandinsky" />
                    </ControlsItem>
                    <ControlsItem>
                        <Typography>Wassily Kandinsky</Typography>
                    </ControlsItem>
                </Controls>
            </ListItem>
            <ListItem>
                <Controls>
                    <ControlsItem>
                        <Avatar initials="IR" title="Ilya Repin" />
                    </ControlsItem>
                    <ControlsItem>
                        <Typography>Ilya Repin</Typography>
                    </ControlsItem>
                </Controls>
            </ListItem>
            <ListItem>
                <Controls>
                    <ControlsItem>
                        <Avatar initials="M" title="Malevich" />
                    </ControlsItem>
                    <ControlsItem>
                        <Typography>Malevich</Typography>
                    </ControlsItem>
                </Controls>
            </ListItem>
        </List>
    );
};

<PageContent as={Paper}>
    <Controls>
        <Typography intent="quiet">In list</Typography>
    </Controls>
    <AvatarListExample />
    <Divider gap={4} />
    <Controls gap={8}>
        <ControlsItem>
            <Controls>
                <ControlsItem>
                    <Typography as="label" htmlFor="user-name">
                        User name:
                    </Typography>
                </ControlsItem>
                <ControlsItem>
                    <Input
                        style={{width: 100}}
                        id="user-name"
                        value={state.userName}
                        onValueChange={(value) => setState({userName: value})}
                    />
                </ControlsItem>
            </Controls>
        </ControlsItem>
        <ControlsItem>
            <Controls>
                <ControlsItem>
                    <Avatar
                        initials={state.userName
                            .trim()
                            .split(' ')
                            .filter((word, index, arr) => index === 0 || index === arr.length - 1)
                            .map((word) => Array.from(word)[0])
                            .join('')}
                    />
                </ControlsItem>

                <ControlsItem>
                    <Typography>{state.userName}</Typography>
                </ControlsItem>
            </Controls>
        </ControlsItem>
    </Controls>
    <Divider gap={4} />
    <Typography intent="quiet">Icon avatars</Typography>
    <Typography>
        Icon avatars are created by passing an icon as children or by icon props.
    </Typography>
    <Divider gap={2} variant="transparent" />
    <Controls gap={4}>
        <ControlsItem>
            <Avatar icon={<OrganizationIcon />} style={{backgroundColor: '#ebedef'}} />
        </ControlsItem>
        <ControlsItem>
            <Avatar icon={<UserGroupIcon />} style={{backgroundColor: '#ebedef'}} />
        </ControlsItem>
    </Controls>
</PageContent>;
```
