```js
const {DownloadIcon} = require('../../icons/download-icon');
const {HelpIcon} = require('../../icons/help-icon');

const leftCellStyle = {width: 20, textAlign: 'center'};
const StateExample = (props) => (
    <div {...props} style={{width: 200, border: '1px solid #ddd', marginBottom: 8}} />
);
const Quiet = (props) => <Typography {...props} intent="quiet" box="inline" as="span" />;

<Controls style={{alignItems: 'flex-start'}}>
    <ControlsItem style={{width: 200}}>
        <PageContent as={Paper}>
            <PageFullWidth>
                <List>
                    <ListItem>
                        <Typography variant="section">Tissue:</Typography>
                    </ListItem>
                    <ListItem
                        as="label"
                        interactive
                        prepend={<input type="checkbox" />}
                        append={<HelpIcon />}
                    >
                        <TextLabel caption="12">Liver</TextLabel>
                    </ListItem>
                    <ListItem
                        as="label"
                        interactive
                        prepend={<input type="checkbox" />}
                        append={
                            <Typography as="span" intent="quiet">
                                99999
                            </Typography>
                        }
                    >
                        Very long name of tissue
                    </ListItem>
                    <ListItem
                        as="label"
                        interactive
                        wrap
                        prepend={<input type="checkbox" />}
                        append={
                            <Typography as="span" intent="quiet">
                                3
                            </Typography>
                        }
                    >
                        <TextLabel wrap>Very long name of tissue. Few lines</TextLabel>
                    </ListItem>
                    <ListItem
                        disabled
                        prepend={<input type="checkbox" disabled />}
                        append={
                            <Typography as="span" intent="quiet">
                                3
                            </Typography>
                        }
                    >
                        Bone
                    </ListItem>
                    <ListItem as="label" interactive prepend={<input type="checkbox" />}>
                        Leaf
                    </ListItem>
                    <Divider />
                    <ListItem href="#" interactive>
                        I am a link
                    </ListItem>
                    <ListItem as="label" interactive prepend={<input type="radio" name="foo" />}>
                        Brain
                    </ListItem>
                    <ListItem as="label" interactive prepend={<input type="radio" name="foo" />}>
                        Lymph Node
                    </ListItem>
                    <ListItem
                        as="label"
                        interactive
                        prepend={<DownloadIcon />}
                        subtitle="Downloading of big file could overload your network"
                    >
                        <TextLabel caption="145 MB">Download</TextLabel>
                    </ListItem>
                </List>
            </PageFullWidth>
        </PageContent>
    </ControlsItem>
    <ControlsItem>
        <PageContent as={Paper}>
            <Typography variant="section" box="paragraph">
                List Item States:
            </Typography>
            <StateExample>
                <ListItem interactive>Normal</ListItem>
            </StateExample>
            <StateExample>
                <ListItem interactive focused>
                    Focused
                </ListItem>
            </StateExample>
            <StateExample>
                <ListItem interactive hovered>
                    Hovered
                </ListItem>
            </StateExample>
            <StateExample>
                <ListItem interactive active>
                    Active
                </ListItem>
            </StateExample>

            <StateExample>
                <ListItem interactive disabled>
                    Disabled
                </ListItem>
            </StateExample>
        </PageContent>
    </ControlsItem>
</Controls>;
```
