```js
const {Typography} = require('../typography');
const {DownloadIcon} = require('../../icons/download-icon');
const {HelpIcon} = require('../../icons/help-icon');
const {KeyboardArrowRightIcon} = require('../../icons/keyboard-arrow-right-icon');

const Example = (props) => <div {...props} style={{margin: 4, textAlign: 'center'}} />;

const Plate = (props) => (
    <div {...props} style={{background: 'rgba(245, 245, 245, 1)', display: 'inline-block'}} />
);

const Caption = (props) => (
    <Typography {...props} style={{marginLeft: 4}} variant="caption" box="inline" />
);

<div style={{display: 'flex'}}>
    <Example>
        <Plate>
            <DownloadIcon />
        </Plate>
        <Caption>Download Icon</Caption>
    </Example>
    <Example>
        <Plate>
            <HelpIcon />
        </Plate>
        <Caption>Help Icon</Caption>
    </Example>
    <Example>
        <Plate>
            <KeyboardArrowRightIcon />
        </Plate>
        <Caption>Keyboard Arrow Right Icon</Caption>
    </Example>
</div>;
```
