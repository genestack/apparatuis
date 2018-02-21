```js
<div>
    <Button
        onClick={() => alert('clicked on default button')}
    >
        Default button
    </Button>
    <Button
        kind="primary"
        onClick={(event, value) => alert(`clicked on primary button with value=${value}`)}
        value={3}
    >
        Primary button
    </Button>
</div>
```
