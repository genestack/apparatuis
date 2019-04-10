```js
const {PlayIcon} = require('../../icons/play-icon');
const {ShareIcon} = require('../../icons/share-icon');

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

const BackgroundPane = () => (
    <div
        style={{position: 'absolute', background: '#F5F5F5', width: 50, left: 0, top: 0, bottom: 0}}
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
        <div>
            <Button {...props}>{capitalize(props.variant || 'default')}</Button>{' '}
            <Button {...props} icon={<ShareIcon />} />
        </div>
        <Divider variant="transparent" />
        <div>
            <Button {...props} icon={<PlayIcon />}>
                {capitalize(props.variant || 'default')}
            </Button>
        </div>
        <Divider variant="transparent" />
    </React.Fragment>
);

<Paper style={{display: 'flex'}}>
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
        <Typography box="paragraph">Hover</Typography>
        <ButtonSamples variant="primary" hovered />
        <ButtonSamples hovered />
        <ButtonSamples variant="outlined" hovered />
        <ButtonSamples variant="ghost" hovered />
    </Pane>
    <Pane>
        <Typography box="paragraph">Focus</Typography>
        <ButtonSamples variant="primary" focused />
        <ButtonSamples focused />
        <ButtonSamples variant="outlined" focused />
        <ButtonSamples variant="ghost" focused />
    </Pane>
    <Pane>
        <Typography box="paragraph">Active</Typography>
        <ButtonSamples variant="primary" active />
        <ButtonSamples active />
        <ButtonSamples variant="outlined" active />
        <ButtonSamples variant="ghost" active />
    </Pane>
</Paper>;
```

```js
const {PlayIcon} = require('../../icons/play-icon');
const {ShareIcon} = require('../../icons/share-icon');

<PageContent as={Paper} style={{width: 500}}>
    <FlexItem container>
        <FlexItem>
            <Button icon={<ShareIcon />} tiny />
        </FlexItem>
        <FlexItem>
            <Button tiny>Tiny</Button>
        </FlexItem>
        <FlexItem>
            <Button tiny icon={<PlayIcon />}>
                Tiny
            </Button>
        </FlexItem>
        <FlexItem shrink>
            <Button icon={<ShareIcon />}>Button with long text</Button>
        </FlexItem>
        <FlexItem shrink>
            <Button icon={<ShareIcon />} wrap>
                Button with long text
            </Button>
        </FlexItem>
    </FlexItem>
</PageContent>;
```
