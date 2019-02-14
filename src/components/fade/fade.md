```js
const {Button} = require('../button');
const {Typography} = require('../typography');
const {Fade} = require('.');

initialState = {visible: true};

handleButtonClick = () => setState(({visible}) => ({visible: !visible}));

<div>
    <Button style={{width: 80}} onClick={handleButtonClick}>
        {state.visible ? 'Hide' : 'Show'}
    </Button>{' '}
    <Fade in={state.visible}>
        <Typography box="inline">Hi! I am could be hidden.</Typography>
    </Fade>
</div>;
```
