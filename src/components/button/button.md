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
    >
        Primary button
    </Button>
    <Button
        onClick={() => alert('clicked on default button')}
        disabled
    >
        Default disabled button
    </Button>
    <Button
        kind="primary"
        onClick={(event, value) => alert(`clicked on primary button with value=${value}`)}
        disabled
    >
        Primary disabled button
    </Button>

    <br />
    <br />

    <Button
        size="s"
        kind="primary"
        onClick={(event, value) => alert(`clicked on primary button with value=${value}`)}
    >
        Small Primary  button
    </Button>
    <Button
        size="s"
        onClick={(event, value) => alert(`clicked on primary button with value=${value}`)}
    >
        Small default button
    </Button>
</div>
```
