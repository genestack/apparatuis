Implemented by [rc-tooltip](https://github.com/react-component/tooltip) with Genestack custom styles

```js
const {Input} = require('../input');
const {Button} = require('../button');
const {Tooltip} = require('.');
<div id="tooltip-container" style={{position: 'relative'}}>
    <Tooltip
        overlay="This field is required"
        visible={true}
        getTooltipContainer={() => document.getElementById('tooltip-container')}
    >
        <Input style={{width: '300px'}} hasError />
    </Tooltip>
    <br />
    <br />
    <Tooltip overlay="I'm tooltip" placement="bottom">
        <Button onClick={() => alert('clicked on default button')}>Hover me!</Button>
    </Tooltip>
</div>;
```
