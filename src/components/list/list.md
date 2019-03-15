```js
const {DownloadIcon} = require('../../icons/download-icon');
const {HelpIcon} = require('../../icons/help-icon');

const leftCellStyle = {width: 20, textAlign: 'center'};
const StateExample = (props) => (
    <div {...props} style={{width: 200, border: '1px solid #ddd', marginBottom: 8}} />
);
const Quiet = (props) => <Typography {...props} variant="caption" quiet box="inline" />;

<div style={{display: 'flex'}}>
    <Paper style={{display: 'flex', flexDirection: 'column', width: 200}}>
        <Typography variant="section" box="paragraph" style={{padding: '0 16px'}}>
            Tissue:
        </Typography>
        <List>
            <ListItem as="label">
                <ListItemCell style={leftCellStyle}>
                    <input type="checkbox" />
                </ListItemCell>
                <ListItemText>Liver</ListItemText>
                <ListItemCell>
                    <Quiet>12</Quiet>
                </ListItemCell>
                <FlexExpander />
                <HelpIcon />
            </ListItem>
            <ListItem as="label">
                <ListItemCell style={leftCellStyle}>
                    <input type="checkbox" />
                </ListItemCell>
                <ListItemText>Very long name of tissue</ListItemText>
                <ListItemCell>
                    <Quiet>99999</Quiet>
                </ListItemCell>
            </ListItem>
            <ListItem as="label">
                <ListItemCell style={leftCellStyle}>
                    <input type="checkbox" />
                </ListItemCell>
                <ListItemText wrap>Very long name of tissue. Few lines</ListItemText>
                <ListItemCell>
                    <Quiet>3</Quiet>
                </ListItemCell>
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
                <ListItemText>Download</ListItemText>
                <ListItemCell>
                    <Quiet>145 MB</Quiet>
                </ListItemCell>
            </ListItem>
        </List>
    </Paper>
    <div style={{marginLeft: 16}}>
        <Typography variant="section" box="paragraph">
            List Item States:
        </Typography>
        <StateExample>
            <ListItem>
                <ListItemText>Normal</ListItemText>
            </ListItem>
        </StateExample>
        <StateExample>
            <ListItem focused>
                <ListItemText>Focused</ListItemText>
            </ListItem>
        </StateExample>
        <StateExample>
            <ListItem hovered>
                <ListItemText>Hovered</ListItemText>
            </ListItem>
        </StateExample>
        <StateExample>
            <ListItem active>
                <ListItemText>Active</ListItemText>
            </ListItem>
        </StateExample>

        <StateExample>
            <ListItem disabled>
                <ListItemText>Disabled</ListItemText>
            </ListItem>
        </StateExample>
    </div>
</div>;
```
