```js
const {Button} = require('../button');
const {Shake} = require('.');

initialState = {shaking: false};

handleButtonClick = () => { setState({shaking: true}) }
handleShakeComplete = () => { setState({shaking: false}) }

<div>
    <Shake in={state.shaking} onEntered={handleShakeComplete}>
        <Button
            style={{width: 100}}
            onClick={handleButtonClick}
        >
            {state.shaking ? 'Shaking...' : 'Shake Me'}
        </Button>
    </Shake>
</div>;
```
