```js
const {ButtonsGroup, Button} = require('.');
<ButtonsGroup>
    <Button onClick={() => alert('clicked on default button')}>Default button</Button>
    <Button onClick={(event, value) => alert('clicked on a button')}>One more button</Button>
    <Button onClick={() => alert('clicked on default button')} disabled>
        Default disabled button
    </Button>
</ButtonsGroup>;
```
