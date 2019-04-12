```js
initialState = {
    backdropOpened: false
};

handleBackdropOpen = () => {
    this.container.focus();
    setState({backdropOpened: true});
};

handleBackdropClose = () => {
    setState({backdropOpened: false});
};

<PageContent as={Paper}>
    <Button onClick={handleBackdropOpen}>Open Backdrop</Button>

    <div
        style={{zIndex: 100, position: 'fixed'}}
        tabIndex={0}
        ref={(node) => {
            this.container = node;
        }}
    >
        <Backdrop open={state.backdropOpened} onClick={handleBackdropClose} />
    </div>
</PageContent>;
```
