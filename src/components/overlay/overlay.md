```js
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-50%, -50%, 0)`,
        position: 'absolute',
        width: 240
    };
}

class SimpleModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subModalOpen: false,
            subModalMounted: false
        };

        this.styles = getModalStyle();
        this.handleSubModalOpen = this.handleSubModalOpen.bind(this);
        this.handleSubModalClose = this.handleSubModalClose.bind(this);
        this.handleSubModalClosed = this.handleSubModalClosed.bind(this);
    }

    handleSubModalOpen() {
        this.setState({
            subModalOpen: true,
            subModalMounted: true
        });
    }

    handleSubModalClose() {
        this.setState({
            subModalOpen: false
        });
    }

    handleSubModalClosed() {
        this.setState({
            subModalMounted: false
        });
    }

    render() {
        return (
            <React.Fragment>
                <Button onClick={this.handleSubModalOpen}>Open Overlay</Button>
                {this.state.subModalMounted ? (
                    <Overlay
                        open={this.state.subModalOpen}
                        onClose={this.handleSubModalClose}
                        onClosed={this.handleSubModalClosed}
                    >
                        <Fade appear in={this.state.subModalOpen}>
                            <PageContent as={Paper} style={this.styles} tabIndex={-1}>
                                <Typography variant="title" box="paragraph">
                                    Overlay Example
                                </Typography>
                                <Typography variant="body" box="paragraph">
                                    This some text of overlay
                                </Typography>
                                <div>
                                    <Input placeholder="Focus should be trapped" />
                                </div>
                                <PageFullWidth>
                                    <Divider gap={4} />
                                </PageFullWidth>
                                <div>
                                    <SimpleModal />
                                </div>
                            </PageContent>
                        </Fade>
                    </Overlay>
                ) : null}
            </React.Fragment>
        );
    }
}

<SimpleModal />;
```
