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
                    <ListItem
                        interactive
                        append={
                            <Typography quiet as="span">
                                1
                            </Typography>
                        }
                    >
                        List item
                    </ListItem>
                    <ListItem
                        interactive
                        append={
                            <Typography quiet as="span">
                                2
                            </Typography>
                        }
                    >
                        List item
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
        as="form"
        onSubmit={handleFormSubmit}
    >
        <DialogHeader>
            <Typography variant="title">Session Timed Out</Typography>
        </DialogHeader>
        <DialogBody>
            <Typography box="paragraph">
                Your session has timed out, or you logged on as another user in a different window.
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

renderStateCheckbox = (key, title) => (
    <ListItem
        as="label"
        interactive
        prepend={
            <input
                type="checkbox"
                checked={state[key]}
                onChange={(event) => setState({[key]: event.target.checked})}
            />
        }
    >
        {title}
    </ListItem>
);

renderStateRadio = (key, value, title) => (
    <ListItem
        as="label"
        interactive
        prepend={
            <input
                name={key}
                type="radio"
                checked={state[key] === value}
                onChange={(event) => setState({[key]: value})}
            />
        }
    >
        {title}
    </ListItem>
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
                                <ListItem
                                    key={i}
                                    interactive
                                    append={
                                        <Typography quiet as="span">
                                            {item.count}
                                        </Typography>
                                    }
                                >
                                    {item.title}
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
                    {renderStateCheckbox('showCloseButton', 'Close Button')}
                    {renderStateCheckbox('scrollableDialog', 'Scrollable')}
                    {renderStateCheckbox('showLongBody', 'Long Body')}
                    {renderStateCheckbox('showTitle', 'Title')}
                    {renderStateCheckbox('showSubtitle', 'Subtitle')}
                    {renderStateCheckbox('showBody', 'Body')}
                    {renderStateCheckbox('showList', 'List')}
                    {renderStateCheckbox('showFooter', 'Footer')}

                    <ListItem>
                        <Typography variant="section">Size:</Typography>
                    </ListItem>
                    {renderStateRadio('size', 'auto', 'Auto')}
                    {renderStateRadio('size', 'small', 'Small')}
                    {renderStateRadio('size', 'medium', 'Medium')}
                    {renderStateRadio('size', 'large', 'Large')}
                </List>
            </PageFullWidth>
        </PageContent>
    </Dialog>
</PageContent>;
```

#### Dialog with auto focusable input

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
    <Button onClick={handleDialogOpen}>Open dialog</Button>

    <Dialog open={state.open} onClose={handleDialogClose}>
        <DialogHeader>
            <Typography variant="title">Dialog with autoFocus</Typography>
        </DialogHeader>

        <DialogBody>
            <Typography box="paragraph">
                This input should be in focus when dialog opens:
            </Typography>
            <SuggestInput autoFocus fullWidth>
                <SuggestInputItem value="foo">Foo</SuggestInputItem>
                <SuggestInputItem value="bar">Bar</SuggestInputItem>
            </SuggestInput>
        </DialogBody>

        <DialogFooter>
            <Button onClick={handleDialogClose}>Close</Button>
        </DialogFooter>
    </Dialog>
</PageContent>;
```
