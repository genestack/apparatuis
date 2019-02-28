```js
const {Button} = require('../button');
const {Paper} = require('../paper');
const {Typography} = require('../typography');
const {Grow} = require('.');

initialState = {visible: true};

handleButtonClick = () => setState(({visible}) => ({visible: !visible}));

<div>
    <Grow in={state.visible}>
        <Paper style={{width: 100, padding: 16}}>
            <Typography>Hi! I am could be hidden.</Typography>
        </Paper>
    </Grow>
    <Button style={{width: 100, marginTop: 8}} onClick={handleButtonClick}>
        {state.visible ? 'Hide' : 'Show'}
    </Button>{' '}
</div>;
```
