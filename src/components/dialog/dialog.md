#### Simple Dialog

```js
initialState = {
    open: false
};

handleDialogOpen = () => {
    setState({open: true});
};

handleDialogClose = () => {
    setState({open: false});
};

<PageContent as={Paper}>
    <Button onClick={handleDialogOpen}>Open simple dialog</Button>

    <Dialog open={state.open} onClose={handleDialogClose}>
        <DialogHeader>
            <Typography variant="title">Underlying studies for "Exocrine System" column</Typography>
            <Typography quiet>Morphological changes</Typography>
        </DialogHeader>

        <DialogBody>
            <Typography box="paragraph">
                The availability of high throughput, massively parallel RNA sequencing (RNA-Seq) of
                the entire transcriptome opens the possibility of a higher sensitivity and more
                detailed characterization of the response of the small airway epithelium to smoking.
            </Typography>

            <DialogFullWidth>
                <List>
                    <ListItem>
                        <ListItemText>List item</ListItemText>
                        <FlexExpander />
                        <ListItemCell>
                            <Typography quiet>1</Typography>
                        </ListItemCell>
                    </ListItem>
                    <ListItem>
                        <ListItemText>List item</ListItemText>
                        <FlexExpander />
                        <ListItemCell>
                            <Typography quiet>2</Typography>
                        </ListItemCell>
                    </ListItem>
                </List>
            </DialogFullWidth>
        </DialogBody>

        <DialogFooter>
            <Controls justify="space-between">
                <ControlsItem>
                    <Controls>
                        <ControlsItem>
                            <Button variant="primary">Main Action</Button>
                        </ControlsItem>
                        <ControlsItem>
                            <Button onClick={handleDialogClose}>Close</Button>
                        </ControlsItem>
                    </Controls>
                </ControlsItem>
                <ControlsItem>
                    <Typography quiet>Helper text</Typography>
                </ControlsItem>
            </Controls>
        </DialogFooter>
    </Dialog>
</PageContent>;
```

#### Form Dialog

```js
FormExampleTransition =
    this.FormExampleTransition || ((props) => <Slide {...props} direction="top" />);

initialState = {
    dialogOpen: false
};

handleDialogOpen = () => {
    setState({dialogOpen: true});
};

handleFormSubmit = (event) => {
    event.preventDefault();
    const password = event.currentTarget.elements['password'].value;
    console.log({password});
    setState({dialogOpen: false});
};

<PageContent as={Paper}>
    <Button onClick={handleDialogOpen}>Open Form Dialog</Button>
    <Dialog
        open={state.dialogOpen}
        hideCloseButton
        transitionComponent={FormExampleTransition}
        style={{width: 400}}
    >
        <form onSubmit={handleFormSubmit}>
            <DialogHeader>
                <Typography variant="title">Session Timed Out</Typography>
            </DialogHeader>
            <DialogBody>
                <Typography box="paragraph">
                    Your session has timed out, or you logged on as another user in a different
                    window.
                </Typography>
                <Typography box="paragraph">
                    To continue as <b>user.name@genestack.com</b>, please enter your password:
                </Typography>
                <Input
                    type="password"
                    name="password"
                    autoComplete="off"
                    fullWidth
                    style={{margin: '4px 0'}}
                />
            </DialogBody>
            <DialogFooter>
                <Controls>
                    <ControlsItem>
                        <Button variant="primary" type="submit">
                            Sign in
                        </Button>
                    </ControlsItem>
                    <ControlsItem>
                        <TooltipHandler tooltip={<Tooltip>We will miss you</Tooltip>}>
                            <Button>Sign in as another user</Button>
                        </TooltipHandler>
                    </ControlsItem>
                </Controls>
            </DialogFooter>
        </form>
    </Dialog>
</PageContent>;
```

```js
initialState = {
    dialogOpen: false,
    scrollableDialog: false,
    showCloseButton: true,
    showLongBody: false,
    showTitle: true,
    showSubtitle: true,
    showBody: true,
    showList: true,
    showFooter: true,
    size: 'auto'
};

renderStateCheckbox = (name) => (
    <input
        type="checkbox"
        checked={state[name]}
        onChange={(event) => setState({[name]: event.target.checked})}
    />
);

renderSizeRadio = (value) => (
    <input
        name="size"
        type="radio"
        checked={state.size === value}
        onChange={(event) => setState({size: value})}
    />
);

handleDialogOpen = () => {
    setState({dialogOpen: true});
};

handleDialogClose = () => {
    setState({dialogOpen: false});
};

const samples = [
    {title: 'Mammary Gland', count: 218},
    {
        title: 'Prostate',
        count: 136
    },
    {
        title: 'Minor Salivary Gland',
        count: 70
    },
    {
        title: 'Salivary Gland',
        count: 13
    },
    {
        title: 'Breast',
        count: 3
    }
];

<PageContent as={Paper}>
    <Button onClick={handleDialogOpen}>Open configurable dialog</Button>
    <Dialog
        open={state.dialogOpen}
        onClose={handleDialogClose}
        scrollable={state.scrollableDialog}
        hideCloseButton={!state.showCloseButton}
        size={state.size}
    >
        {state.showTitle || state.showSubtitle ? (
            <DialogHeader>
                {state.showTitle ? (
                    <Typography variant="title">
                        Underlying studies for "Exocrine System" column
                    </Typography>
                ) : null}

                {state.showSubtitle ? <Typography quiet>Morphological changes</Typography> : null}
            </DialogHeader>
        ) : null}

        {state.showBody || state.showLongBody || state.showList ? (
            <DialogBody>
                {state.showBody ? (
                    <React.Fragment>
                        <Typography box="paragraph">
                            The availability of high throughput, massively parallel RNA sequencing
                            (RNA-Seq) of the entire transcriptome opens the possibility of a higher
                            sensitivity and more detailed characterization of the response of the
                            small airway epithelium to smoking.
                        </Typography>
                        <Typography box="paragraph">
                            RNA-seq of long poly adenylated RNA and long non poly adenylated RNA
                            from ENCODE cell lines
                        </Typography>
                    </React.Fragment>
                ) : null}
                {state.showLongBody
                    ? new Array(10).fill(null).map((_, i) => (
                          <React.Fragment key={i}>
                              <Typography box="paragraph">
                                  The availability of high throughput, massively parallel RNA
                                  sequencing (RNA-Seq) of the entire transcriptome opens the
                                  possibility of a higher sensitivity and more detailed
                                  characterization of the response of the small airway epithelium to
                                  smoking.
                              </Typography>
                              <Typography box="paragraph">
                                  RNA-seq of long poly adenylated RNA and long non poly adenylated
                                  RNA from ENCODE cell lines
                              </Typography>
                          </React.Fragment>
                      ))
                    : null}
                {state.showList ? (
                    <DialogFullWidth>
                        <List>
                            {samples.map((item, i) => (
                                <ListItem key={i}>
                                    <ListItemText>{item.title}</ListItemText>
                                    <FlexExpander />
                                    <ListItemCell>
                                        <Typography quiet variant="caption" box="inline">
                                            {item.count}
                                        </Typography>
                                    </ListItemCell>
                                </ListItem>
                            ))}
                        </List>
                    </DialogFullWidth>
                ) : null}
            </DialogBody>
        ) : null}

        {state.showFooter ? (
            <DialogFooter>
                <Controls justify="space-between">
                    <ControlsItem>
                        <Controls>
                            <ControlsItem>
                                <Button variant="primary">Main Action</Button>
                            </ControlsItem>
                            <ControlsItem>
                                <Button onClick={handleDialogClose}>Close</Button>
                            </ControlsItem>
                        </Controls>
                    </ControlsItem>
                    <ControlsItem>
                        <Typography quiet>Helper text</Typography>
                    </ControlsItem>
                </Controls>
            </DialogFooter>
        ) : null}

        <PageContent
            as={Paper}
            style={{position: 'absolute', right: -16, top: 0, transform: 'translateX(100%)'}}
        >
            <PageFullWidth>
                <List>
                    <ListItem as="label">
                        <ListItemCell>{renderStateCheckbox('showCloseButton')}</ListItemCell>
                        <ListItemText>Close Button</ListItemText>
                    </ListItem>
                    <ListItem as="label">
                        <ListItemCell>{renderStateCheckbox('scrollableDialog')}</ListItemCell>
                        <ListItemText>Scrollable</ListItemText>
                    </ListItem>
                    <ListItem as="label">
                        <ListItemCell>{renderStateCheckbox('showLongBody')}</ListItemCell>
                        <ListItemText>Long Body</ListItemText>
                    </ListItem>
                    <ListItem as="label">
                        <ListItemCell>{renderStateCheckbox('showTitle')}</ListItemCell>
                        <ListItemText>Title</ListItemText>
                    </ListItem>
                    <ListItem as="label">
                        <ListItemCell>{renderStateCheckbox('showSubtitle')}</ListItemCell>
                        <ListItemText>Subtitle</ListItemText>
                    </ListItem>
                    <ListItem as="label">
                        <ListItemCell>{renderStateCheckbox('showBody')}</ListItemCell>
                        <ListItemText>Body</ListItemText>
                    </ListItem>
                    <ListItem as="label">
                        <ListItemCell>{renderStateCheckbox('showList')}</ListItemCell>
                        <ListItemText>List</ListItemText>
                    </ListItem>
                    <ListItem as="label">
                        <ListItemCell>{renderStateCheckbox('showFooter')}</ListItemCell>
                        <ListItemText>Footer</ListItemText>
                    </ListItem>
                </List>
            </PageFullWidth>
            <Typography variant="section" box="paragraph">
                Size:
            </Typography>
            <PageFullWidth>
                <ListItem as="label">
                    <ListItemCell>{renderSizeRadio('auto')}</ListItemCell>
                    <ListItemText>Auto</ListItemText>
                </ListItem>
                <ListItem as="label">
                    <ListItemCell>{renderSizeRadio('small')}</ListItemCell>
                    <ListItemText>Small</ListItemText>
                </ListItem>
                <ListItem as="label">
                    <ListItemCell>{renderSizeRadio('medium')}</ListItemCell>
                    <ListItemText>Medium</ListItemText>
                </ListItem>
                <ListItem as="label">
                    <ListItemCell>{renderSizeRadio('large')}</ListItemCell>
                    <ListItemText>Large</ListItemText>
                </ListItem>
            </PageFullWidth>
        </PageContent>
    </Dialog>
</PageContent>;
```
