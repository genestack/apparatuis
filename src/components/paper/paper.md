```js
const {DarkContext} = require('../../utils/dark-context');

const DarkContextWrapper = (props) => {
    const [inverted, setInverted] = React.useState(false);

    return (
        <>
            <PageContent>
                <Controls as="label">
                    <ControlsItem>
                        <input
                            type="checkbox"
                            checked={inverted}
                            onChange={() => setInverted(!inverted)}
                        />
                    </ControlsItem>
                    <ControlsItem>
                        <Typography>Inverted</Typography>
                    </ControlsItem>
                </Controls>
            </PageContent>
            <DarkContext.Provider value={inverted}>{props.children}</DarkContext.Provider>
        </>
    );
};

<DarkContextWrapper>
    <PageContent as={Paper}>
        <Typography variant="title" box="paragraph">
            This is a sheet of paper.
        </Typography>
        <Typography box="paragraph">
            Paper can be used to build surface or other elements for your application.
        </Typography>
    </PageContent>
</DarkContextWrapper>;
```
