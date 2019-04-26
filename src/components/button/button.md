```js
const {DarkContext} = require('../../utils/dark-context');
const {PlayIcon} = require('../../icons/play-icon');
const {ShareIcon} = require('../../icons/share-icon');

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

const BackgroundPane = () => (
    <div
        style={{
            position: 'absolute',
            background: state.inverted ? '#1C1717' : '#F5F5F5',
            width: 50,
            left: 0,
            top: 0,
            bottom: 0
        }}
    />
);

const Pane = (props) => (
    <PageContent style={{position: 'relative'}}>
        <BackgroundPane />
        <div style={{position: 'relative'}} {...props} />
    </PageContent>
);

const ButtonSamples = (props) => (
    <React.Fragment>
        <Controls>
            <ControlsItem>
                <Button {...props}>{capitalize(props.variant || 'default')}</Button>
            </ControlsItem>
            <ControlsItem>
                <Button {...props} icon={<ShareIcon />} />
            </ControlsItem>
        </Controls>
        <Divider variant="transparent" />
        <div>
            <Button {...props} icon={<PlayIcon />}>
                {capitalize(props.variant || 'default')}
            </Button>
        </div>
        <Divider variant="transparent" />
    </React.Fragment>
);

initialState = {
    inverted: false
};

handleInvertedChange = (event) => setState({inverted: event.currentTarget.checked});

<React.Fragment>
    <PageContent>
        <Controls as="label">
            <ControlsItem>
                <input type="checkbox" checked={state.inverted} onChange={handleInvertedChange} />
            </ControlsItem>
            <ControlsItem>
                <Typography>Inverted</Typography>
            </ControlsItem>
        </Controls>
    </PageContent>
    <DarkContext.Provider value={state.inverted}>
        <Paper style={{display: 'flex', background: state.inverted ? '#252E42' : '#FFF'}}>
            <Pane>
                <Typography box="paragraph">Disabled</Typography>
                <ButtonSamples variant="primary" disabled />
                <ButtonSamples disabled />
                <ButtonSamples variant="outlined" disabled />
                <ButtonSamples variant="ghost" disabled />
            </Pane>
            <Pane>
                <Typography box="paragraph">Normal</Typography>
                <ButtonSamples variant="primary" />
                <ButtonSamples />
                <ButtonSamples variant="outlined" />
                <ButtonSamples variant="ghost" />
            </Pane>
            <Pane>
                <Typography box="paragraph">Active</Typography>
                <ButtonSamples variant="primary" active />
                <ButtonSamples active />
                <ButtonSamples variant="outlined" active />
                <ButtonSamples variant="ghost" active />
            </Pane>
        </Paper>
    </DarkContext.Provider>
</React.Fragment>;
```

```js
const {PlayIcon} = require('../../icons/play-icon');
const {ShareIcon} = require('../../icons/share-icon');

const ieFixStyle = {display: 'flex'};

<PageContent as={Paper} style={{width: 500}}>
    <Controls>
        <ControlsItem>
            <Button icon={<ShareIcon />} tiny />
        </ControlsItem>
        <ControlsItem>
            <Button tiny>Tiny</Button>
        </ControlsItem>
        <ControlsItem>
            <Button tiny icon={<PlayIcon />}>
                Tiny
            </Button>
        </ControlsItem>
        <ControlsItem shrink style={ieFixStyle}>
            <Button icon={<ShareIcon />}>Button with long text</Button>
        </ControlsItem>
        <ControlsItem shrink>
            <Button icon={<ShareIcon />} wrap>
                Button with long text
            </Button>
        </ControlsItem>
    </Controls>
</PageContent>;
```
