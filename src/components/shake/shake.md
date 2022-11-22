```js
const [state, setState] = React.useState({shaking: false});

handleButtonClick = () => {
    setState({shaking: true});
};
handleShakeComplete = () => {
    setState({shaking: false});
};

<PageContent as={Paper}>
    <Shake in={state.shaking} onEntered={handleShakeComplete}>
        <Button style={{width: 100}} onClick={handleButtonClick}>
            {state.shaking ? 'Shaking...' : 'Shake Me'}
        </Button>
    </Shake>
</PageContent>;
```
