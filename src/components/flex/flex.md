```js
const {StudyIcon} = require('../../icons/study-icon.tsx');
const {KeyboardArrowRightIcon} = require('../../icons/keyboard-arrow-right-icon.tsx');
const flexStyles = require('./flex.module.css');
const {Divider} = require('../divider');
const {Typography} = require('../typography');

const defaultFlexStyles = {
    background: '#fff',
    height: '50px'
};

<div style={{maxWidth: 640}}>
    <Flex style={defaultFlexStyles} container justify="start" gap={0}>
        <Typography>Justify: start</Typography>
    </Flex>
    <Divider variant="transparent" />
    <Flex style={defaultFlexStyles} container justify="center" gap={0}>
        <Typography>Justify: center</Typography>
    </Flex>
    <Divider variant="transparent" />
    <Flex style={defaultFlexStyles} container justify="end" gap={0}>
        <Typography>Justify: end</Typography>
    </Flex>
    <Divider variant="transparent" />
    <Flex style={defaultFlexStyles} container justify="end" direction="row-reverse" gap={0}>
        <Typography>Justify: end + Direction: row-reverse</Typography>
    </Flex>
    <Divider variant="transparent" />
    <Flex style={defaultFlexStyles} container align="start" gap={0}>
        <Typography>Align: start</Typography>
    </Flex>
    <Divider variant="transparent" />
    <Flex style={defaultFlexStyles} container align="start" direction="column-reverse" gap={0}>
        <Typography>Align: start + Direction: column-reverse</Typography>
    </Flex>
    <Divider variant="transparent" />
    <Flex style={defaultFlexStyles} container align="center" gap={0}>
        <Typography>Align: center</Typography>
    </Flex>
    <Divider variant="transparent" />
    <Flex style={defaultFlexStyles} container align="end" gap={0}>
        <Typography>Align: end</Typography>
    </Flex>
</div>;
```
