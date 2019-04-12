```js
const {ArrowLeftIcon} = require('../../icons/arrow-left-icon');
const {ArrowRightIcon} = require('../../icons/arrow-right-icon');
const {KeyboardArrowBottomIcon} = require('../../icons/keyboard-arrow-bottom-icon.tsx');
const {MoreIcon} = require('../../icons/more-icon');
const {StopIcon} = require('../../icons/stop-icon');
const {PlayIcon} = require('../../icons/play-icon');
const {PauseIcon} = require('../../icons/pause-icon');

initialState = {
    activeRegulation: null
};

const regulationButtons = (
    <React.Fragment>
        <Button
            active={state.activeRegulation === 'Up'}
            onClick={() => setState({activeRegulation: 'Up'})}
        >
            Up
        </Button>
        <Button
            active={state.activeRegulation === 'All'}
            onClick={() => setState({activeRegulation: 'All'})}
        >
            All
        </Button>
        <Button
            active={state.activeRegulation === 'Down'}
            onClick={() => setState({activeRegulation: 'Down'})}
        >
            Down
        </Button>
    </React.Fragment>
);

<PageContent as={Paper}>
    <WithSeparator separator={<Divider gap={4} />}>
        <Controls>
            <Controls item>
                <Button variant="primary">Sign in</Button>
            </Controls>
            <Controls item>
                <Button>Sign in as another user</Button>
            </Controls>
        </Controls>

        <Controls>
            <Controls item>
                <Button>Show Selected</Button>
            </Controls>
            <Controls item>
                <Button>Cancel</Button>
            </Controls>
        </Controls>

        <Controls>
            <Controls item>
                <ButtonGroup>{regulationButtons}</ButtonGroup>
            </Controls>
            <Controls item>
                <ButtonGroup>
                    <Button icon={<ArrowLeftIcon />} />
                    <Button icon={<ArrowRightIcon />} />
                </ButtonGroup>
            </Controls>
            <Controls item>
                <ButtonGroup>
                    <Button>Create new</Button>
                    <Button icon={<KeyboardArrowBottomIcon />} />
                </ButtonGroup>
            </Controls>
        </Controls>

        <Controls>
            <Controls item>
                <ButtonGroup variant="outlined">{regulationButtons}</ButtonGroup>
            </Controls>
            <Controls item>
                <ButtonGroup variant="outlined">
                    <Button icon={<ArrowLeftIcon />} />
                    <Button icon={<ArrowRightIcon />} />
                </ButtonGroup>
            </Controls>
            <Controls item>
                <ButtonGroup variant="outlined">
                    <Button>Create new</Button>
                    <Button icon={<MoreIcon />} />
                </ButtonGroup>
            </Controls>
        </Controls>

        <Controls gap={1}>
            <Controls item>
                <Button>Open</Button>
            </Controls>
            <Controls item>
                <Button>Import</Button>
            </Controls>
            <Controls item>
                <Button>Create new</Button>
            </Controls>
        </Controls>

        <Controls gap={8}>
            <Controls item>
                <Controls gap={1}>
                    <Controls item>
                        <Button variant="ghost" icon={<PlayIcon />} disabled />
                    </Controls>
                    <Controls item>
                        <Button variant="ghost" icon={<PauseIcon />} />
                    </Controls>
                    <Controls item>
                        <Button variant="ghost" icon={<StopIcon />} />
                    </Controls>
                </Controls>
            </Controls>

            <Controls item>
                <Controls gap={1}>
                    <Controls item>
                        <Button icon={<PlayIcon />} disabled />
                    </Controls>
                    <Controls item>
                        <Button icon={<PauseIcon />} />
                    </Controls>
                    <Controls item>
                        <Button icon={<StopIcon />} />
                    </Controls>
                </Controls>
            </Controls>
        </Controls>

        <Controls justify="space-between">
            <Controls item>
                <Controls container gap={1} as="label">
                    <Controls item>
                        <Typography>Filter</Typography>
                    </Controls>
                    <Controls item>
                        <Input placeholder="Compound, biological conditions" style={{width: 160}} />
                    </Controls>
                </Controls>
            </Controls>
            <Controls item>
                <Button>Export as TSV</Button>
            </Controls>
        </Controls>

        <Controls gap={6}>
            <Controls item>
                <Controls container gap={1}>
                    <Controls item>
                        <Button>Open</Button>
                    </Controls>
                    <Controls item>
                        <Button>Import</Button>
                    </Controls>
                </Controls>
            </Controls>
            <Controls item>
                <Button>Export as TSV</Button>
            </Controls>
        </Controls>

        <Controls gap={8}>
            <Controls item>
                <ButtonGroup variant="outlined">{regulationButtons}</ButtonGroup>
            </Controls>
            <Controls item>
                <ButtonGroup variant="outlined">
                    <Button icon={<ArrowLeftIcon />} />
                    <Button icon={<ArrowRightIcon />} />
                </ButtonGroup>
            </Controls>
        </Controls>
    </WithSeparator>
</PageContent>;
```
