```js
const IconButton = require('./icon-button').default;
<div>
    <IconButton onClick={() => alert('clicked')}>
        <img width="22" src="https://goo.gl/fGkAat" />
    </IconButton>
    <br/>
    <IconButton onClick={() => alert('clicked')} disabled>
        <img width="22" src="https://goo.gl/fGkAat" />
    </IconButton> - disabled
</div>
```
