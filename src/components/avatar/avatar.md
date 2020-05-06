```js
initialState = {
    userName: 'Marcus Aurelius'
};

const AvatarListExample = () => {
    return (
        <List>
            <ListItem>
                <Controls>
                    <ControlsItem>
                        <Avatar initials="PE" title="Parmenides of Elea" />
                    </ControlsItem>
                    <ControlsItem>
                        <Typography>Parmenides of Elea</Typography>
                    </ControlsItem>
                </Controls>
            </ListItem>
            <ListItem>
                <Controls>
                    <ControlsItem>
                        <Avatar initials="ZC" title="Zeno of Citium" />
                    </ControlsItem>
                    <ControlsItem>
                        <Typography>Zeno of Citium</Typography>
                    </ControlsItem>
                </Controls>
            </ListItem>
            <ListItem>
                <Controls>
                    <ControlsItem>
                        <Avatar initials="A" title="Aristotle" />
                    </ControlsItem>
                    <ControlsItem>
                        <Typography>Aristotle</Typography>
                    </ControlsItem>
                </Controls>
            </ListItem>
        </List>
    );
};

<PageContent as={Paper}>
    <Controls>
        <Typography quiet>In list</Typography>
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
                            .split(' ')
                            .map((word) => word[0])
                            .join('')}
                    />
                </ControlsItem>

                <ControlsItem>
                    <Typography>{state.userName}</Typography>
                </ControlsItem>
            </Controls>
        </ControlsItem>
    </Controls>
</PageContent>;
```
