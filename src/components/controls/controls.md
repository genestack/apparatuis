```js
const {DarkContext} = require('../../utils/dark-context');
const {ArrowLeftIcon} = require('../../icons/arrow-left-icon');
const {ArrowRightIcon} = require('../../icons/arrow-right-icon');
const {KeyboardArrowBottomIcon} = require('../../icons/keyboard-arrow-bottom-icon.tsx');
const {MoreIcon} = require('../../icons/more-icon');
const {StopIcon} = require('../../icons/stop-icon');
const {PlayIcon} = require('../../icons/play-icon');
const {PauseIcon} = require('../../icons/pause-icon');

initialState = {
    activeRegulation: null,
    inverted: false
};

handleInvertedChange = (event) => setState({inverted: event.currentTarget.checked});

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

<PageContent as={Paper} style={{background: state.inverted ? '#141820' : undefined}}>
    <DarkContext.Provider value={state.inverted}>
        <WithSeparator
            separator={
                <PageFullWidth>
                    <Divider gap={4} />
                </PageFullWidth>
            }
        >
            <Controls as="label">
                <ControlsItem>
                    <input
                        type="checkbox"
                        checked={state.inverted}
                        onChange={handleInvertedChange}
                    />
                </ControlsItem>
                <ControlsItem>
                    <Typography>Inverted</Typography>
                </ControlsItem>
            </Controls>

            <Controls>
                <ControlsItem>
                    <Button intent="accent">Sign in</Button>
                </ControlsItem>
                <ControlsItem>
                    <Button>Sign in as another user</Button>
                </ControlsItem>
            </Controls>

            <Controls>
                <ControlsItem>
                    <Button>Show Selected</Button>
                </ControlsItem>
                <ControlsItem>
                    <Button>Cancel</Button>
                </ControlsItem>
            </Controls>

            <Controls>
                <ControlsItem>
                    <ButtonGroup>{regulationButtons}</ButtonGroup>
                </ControlsItem>
                <ControlsItem>
                    <ButtonGroup>
                        <Button icon={<ArrowLeftIcon />} />
                        <Button icon={<ArrowRightIcon />} />
                    </ButtonGroup>
                </ControlsItem>
                <ControlsItem>
                    <ButtonGroup>
                        <Button>Create new</Button>
                        <Button icon={<KeyboardArrowBottomIcon />} />
                    </ButtonGroup>
                </ControlsItem>
            </Controls>

            <Controls>
                <ControlsItem>
                    <ButtonGroup ghost intent="accent">
                        {regulationButtons}
                    </ButtonGroup>
                </ControlsItem>
                <ControlsItem>
                    <ButtonGroup ghost intent="accent">
                        <Button icon={<ArrowLeftIcon />} />
                        <Button icon={<ArrowRightIcon />} />
                    </ButtonGroup>
                </ControlsItem>
                <ControlsItem>
                    <ButtonGroup ghost intent="accent">
                        <Button>Create new</Button>
                        <Button icon={<MoreIcon />} />
                    </ButtonGroup>
                </ControlsItem>
                <ControlsItem shrink>
                    <Button ghost intent="accent">
                        Very very very long button text
                    </Button>
                </ControlsItem>
            </Controls>

            <Controls gap={1}>
                <ControlsItem>
                    <Button>Open</Button>
                </ControlsItem>
                <ControlsItem>
                    <Button>Import</Button>
                </ControlsItem>
                <ControlsItem>
                    <Button>Create new</Button>
                </ControlsItem>
            </Controls>

            <Controls gap={8}>
                <ControlsItem>
                    <Controls gap={1}>
                        <ControlsItem>
                            <Button ghost icon={<PlayIcon />} disabled />
                        </ControlsItem>
                        <ControlsItem>
                            <Button ghost icon={<PauseIcon />} />
                        </ControlsItem>
                        <ControlsItem>
                            <Button ghost icon={<StopIcon />} />
                        </ControlsItem>
                    </Controls>
                </ControlsItem>

                <ControlsItem>
                    <Controls gap={1}>
                        <ControlsItem>
                            <Button icon={<PlayIcon />} disabled />
                        </ControlsItem>
                        <ControlsItem>
                            <Button icon={<PauseIcon />} />
                        </ControlsItem>
                        <ControlsItem>
                            <Button icon={<StopIcon />} />
                        </ControlsItem>
                    </Controls>
                </ControlsItem>
            </Controls>

            <Controls justify="space-between">
                <ControlsItem>
                    <Controls as="label">
                        <ControlsItem>
                            <Typography>Filter</Typography>
                        </ControlsItem>
                        <ControlsItem>
                            <Input
                                placeholder="Compound, biological conditions"
                                style={{width: 240}}
                            />
                        </ControlsItem>
                    </Controls>
                </ControlsItem>
                <ControlsItem>
                    <Button>Export as TSV</Button>
                </ControlsItem>
            </Controls>

            <Controls gap={4}>
                <ControlsItem>
                    <Controls gap={1}>
                        <ControlsItem>
                            <Button>Open</Button>
                        </ControlsItem>
                        <ControlsItem>
                            <Button>Import</Button>
                        </ControlsItem>
                    </Controls>
                </ControlsItem>
                <ControlsItem>
                    <Button>Export as TSV</Button>
                </ControlsItem>
            </Controls>

            <Controls gap={8}>
                <ControlsItem>
                    <ButtonGroup ghost intent="accent">
                        {regulationButtons}
                    </ButtonGroup>
                </ControlsItem>
                <ControlsItem>
                    <ButtonGroup ghost intent="accent">
                        <Button icon={<ArrowLeftIcon />} />
                        <Button icon={<ArrowRightIcon />} />
                    </ButtonGroup>
                </ControlsItem>
            </Controls>
        </WithSeparator>
    </DarkContext.Provider>
</PageContent>;
```
