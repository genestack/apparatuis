```js
const Button = require('./button').default;
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
        tooltipProps={{overlay: "Due to Genestack's guides, each disabled button should have a hint with an explanation"}}
    >
        Default disabled button
    </Button>
    <Button
        kind="primary"
        onClick={(event, value) => alert(`clicked on primary button with value=${value}`)}
        disabled
        tooltipProps={{overlay:
            <div>Due to Genestack's guides,<br/> each disabled button should have a hint with an explanation</div>
        }}
    >
        Primary disabled button
    </Button>

    <br />
    <br />

    <Button
        size="small"
        kind="primary"
        onClick={(event, value) => alert(`clicked on primary button with value=${value}`)}
    >
        Small Primary  button
    </Button>
    <Button
        size="small"
        onClick={(event, value) => alert(`clicked on primary button with value=${value}`)}
    >
        Small default button
    </Button>
</div>
```
