```js
const {DownloadIcon} = require('../../icons/download-icon');
const {HelpIcon} = require('../../icons/help-icon');

const leftCellStyle = {width: 20, textAlign: 'center'};
const StateExample = (props) => (
    <div {...props} style={{width: 200, border: '1px solid #ddd', marginBottom: 8}} />
);
const Quiet = (props) => <Typography {...props} variant="caption" quiet box="inline" />;

<Flex container>
    <div style={{alignItems: 'flex-start'}}>
        <Flex>
            <PageContent as={Paper} style={{width: 200}}>
                <Typography variant="section" box="paragraph">
                    Tissue:
                </Typography>
                <PageFullWidth>
                    <List>
                        <ListItem as="label">
                            <ListItemCell style={leftCellStyle}>
                                <input type="checkbox" />
                            </ListItemCell>
                            <ListItemText>
                                <ListItemText noGrow>Liver</ListItemText>
                                <ListItemText noGrow quiet variant="caption">
                                    12
                                </ListItemText>
                            </ListItemText>
                            <ListItemCell>
                                <HelpIcon />
                            </ListItemCell>
                        </ListItem>
                        <ListItem as="label">
                            <ListItemCell style={leftCellStyle}>
                                <input type="checkbox" />
                            </ListItemCell>
                            <ListItemText>
                                <ListItemText>Very long name of tissue</ListItemText>
                                <ListItemText noShrink quiet variant="caption">
                                    99999
                                </ListItemText>
                            </ListItemText>
                        </ListItem>
                        <ListItem as="label">
                            <ListItemCell style={leftCellStyle}>
                                <input type="checkbox" />
                            </ListItemCell>
                            <ListItemText wrap>Very long name of tissue. Few lines</ListItemText>
                            <ListItemText quiet variant="caption" noShrink>
                                3
                            </ListItemText>
                        </ListItem>
                        <ListItem disabled>
                            <ListItemCell style={leftCellStyle}>
                                <input type="checkbox" disabled />
                            </ListItemCell>
                            <ListItemText>Bone</ListItemText>
                            <ListItemCell>
                                <Quiet>3</Quiet>
                            </ListItemCell>
                        </ListItem>
                        <ListItem as="label">
                            <ListItemCell style={leftCellStyle}>
                                <input type="checkbox" />
                            </ListItemCell>
                            <ListItemText>Leaf</ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem as="label">
                            <ListItemCell style={leftCellStyle}>
                                <input type="radio" name="foo" />
                            </ListItemCell>
                            <ListItemText>Brain</ListItemText>
                        </ListItem>
                        <ListItem as="label">
                            <ListItemCell style={leftCellStyle}>
                                <input type="radio" name="foo" />
                            </ListItemCell>
                            <ListItemText>Lymph Node</ListItemText>
                        </ListItem>
                        <ListItem as="label">
                            <ListItemCell style={leftCellStyle}>
                                <DownloadIcon />
                            </ListItemCell>
                            <ListItemText>
                                <ListItemText noGrow>Download</ListItemText>
                                <ListItemText quiet variant="caption">
                                    145 MB
                                </ListItemText>
                            </ListItemText>
                        </ListItem>
                    </List>
                </PageFullWidth>
            </PageContent>
        </Flex>
        <Flex>
            <PageContent as={Paper}>
                <Typography variant="section" box="paragraph">
                    List Item States:
                </Typography>
                <StateExample>
                    <ListItem>Normal</ListItem>
                </StateExample>
                <StateExample>
                    <ListItem focused>Focused</ListItem>
                </StateExample>
                <StateExample>
                    <ListItem hovered>Hovered</ListItem>
                </StateExample>
                <StateExample>
                    <ListItem active>Active</ListItem>
                </StateExample>

                <StateExample>
                    <ListItem disabled>Disabled</ListItem>
                </StateExample>
            </PageContent>
        </Flex>
    </div>
</Flex>;
```
