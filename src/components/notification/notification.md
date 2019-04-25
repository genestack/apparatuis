```js
notificationStyle = {
    position: 'fixed',
    right: 16,
    top: 16
};

initialState = {
    open: false,
    exited: true,
    autoClose: true
};

notificationRef = React.createRef();

handleShowNotificationClick = () => setState({open: true, exited: false});
handleNotificationExited = () => setState({exited: true});
handleNotificationClose = () => setState({open: false});
handleNotificationMouseEnter = (event) => notificationRef.current.stopClosing();
handleNotificationMouseLeave = (event) => notificationRef.current.startClosing();
handleAutoCloseChange = (event) => setState({autoClose: event.currentTarget.checked});

<PageContent as={Paper}>
    <Controls>
        <ControlsItem>
            <Button onClick={handleShowNotificationClick}>Show Notification</Button>
        </ControlsItem>
        <ControlsItem>
            <Typography as="label">
                <input type="checkbox" onChange={handleAutoCloseChange} checked={state.autoClose} />
                Auto-close
            </Typography>
        </ControlsItem>
    </Controls>
    {!state.exited ? (
        <Slide in={state.open} onExited={handleNotificationExited} appear direction="top">
            <Notification
                ref={notificationRef}
                style={notificationStyle}
                onClose={handleNotificationClose}
                onMouseEnter={handleNotificationMouseEnter}
                onMouseLeave={handleNotificationMouseLeave}
                disableAutoClose={!state.autoClose}
            >
                <Typography box="paragraph">Hi! I am notification.</Typography>
            </Notification>
        </Slide>
    ) : null}
</PageContent>;
```

### Simple Notification Manager

```js
class NotificationManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: []
        };

        this.wrapperStyle = {
            transition: 'transform cubic-bezier(0.4, 0, 0.2, 1) 300ms',
            position: 'absolute',
            right: 0,
            top: 0
        };

        this.lastNotificationIndex = -1;
        this.handleCreateNotification = this.handleCreateNotification.bind(this);
    }

    handleCreateNotification() {
        this.setState(({notifications}) => {
            this.lastNotificationIndex += 1;

            return {notifications: [...notifications, this.lastNotificationIndex]};
        });
    }

    createCloseHandler(key) {
        return () =>
            this.setState(({notifications}) => ({
                notifications: notifications.filter((k) => k !== key)
            }));
    }

    render() {
        return (
            <React.Fragment>
                <Controls>
                    <ControlsItem>
                        <Button onClick={this.handleCreateNotification}>
                            Add Notification To Queue
                        </Button>
                    </ControlsItem>
                    <ControlsItem>
                        <Typography>
                            Notifications in queue: {this.state.notifications.length}
                        </Typography>
                    </ControlsItem>

                    <ControlsItem>
                        <Typography>
                            Last notification index: {this.lastNotificationIndex}
                        </Typography>
                    </ControlsItem>
                </Controls>
                <div style={{position: 'fixed', right: 16, top: 16}}>
                    {this.state.notifications.slice(0, 3).map((key, index) => (
                        <div
                            key={key}
                            style={{...this.wrapperStyle, transform: `translateY(${index * 46}px)`}}
                        >
                            <Slide in appear direction="right">
                                <Notification onClose={this.createCloseHandler(key)}>
                                    <Typography box="paragraph">
                                        Hi! I am notification. #{key}
                                    </Typography>
                                </Notification>
                            </Slide>
                        </div>
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

<PageContent as={Paper}>
    <NotificationManager />
</PageContent>;
```
