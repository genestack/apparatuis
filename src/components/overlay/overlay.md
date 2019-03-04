```js
const {Input} = require('../input');
const {Button} = require('../button');
const {Fade} = require('../fade');
const {FocusTrap} = require('../focus-trap');
const {Typography} = require('../typography');
const {Overlay} = require('.');

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
        width: 200,
        backgroundColor: '#fff',
        boxShadow: '0 0 8px rgba(0,0,0,0.4)',
        padding: 32
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
        this.focusTrapRef = React.createRef();
    }

    handleSubModalOpen() {
        this.setState(
            {
                subModalOpen: true,
                subModalMounted: true
            },
            () => {
                this.focusTrapRef.current.focus();
            }
        );
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
                        style={{zIndex: 100}}
                        open={this.state.subModalOpen}
                        onClose={this.handleSubModalClose}
                        onClosed={this.handleSubModalClosed}
                    >
                        <FocusTrap enableSelfFocus ref={this.focusTrapRef}>
                            <Fade appear in={this.state.subModalOpen}>
                                <div style={this.styles}>
                                    <Typography variant="title" box="paragraph">
                                        Overlay Example
                                    </Typography>
                                    <Typography variant="body" box="paragraph">
                                        This some text of overlay
                                    </Typography>
                                    <div>
                                        <Input placeholder="Focus should be trapped" />
                                    </div>
                                    <div>
                                        <SimpleModal />
                                    </div>
                                </div>
                            </Fade>
                        </FocusTrap>
                    </Overlay>
                ) : null}
            </React.Fragment>
        );
    }
}

<SimpleModal />;
```
