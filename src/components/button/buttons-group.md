```js
const ButtonsGroup = require('./buttons-group').default;
const Button = require('../button/button').default;
<ButtonsGroup>
    <Button
        onClick={() => alert('clicked on default button')}
    >
        Default button
    </Button>
    <Button
        onClick={(event, value) => alert('clicked on a button')}
    >
        One more button
    </Button>
    <Button
        onClick={() => alert('clicked on default button')}
        disabled
    >
        Default disabled button
    </Button>
</ButtonsGroup>
```
