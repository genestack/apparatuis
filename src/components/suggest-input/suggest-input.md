```js
const {escapeRegExp} = require('../../utils/escape-reg-exp');

const items = [
    {name: 'Don', surname: 'Perry'},
    {name: 'Olivia', surname: 'Nguyen'},
    {name: 'Donald', surname: 'Edwards'},
    {name: 'Jeremiah', surname: 'Phelps'},
    {name: 'Virgie', surname: 'Jefferson'},
    {name: 'Mitchell', surname: 'Schultz'},
    {name: 'Aiden', surname: 'Dunn'},
    {name: 'Rhoda', surname: 'Martin'},
    {name: 'William', surname: 'Burns'},
    {name: 'Brett', surname: 'Haynes'},
    {name: 'Steve', surname: 'Lyons'},
    {name: 'Chase', surname: 'Lynch'},
    {name: 'Troy', surname: 'Walsh'},
    {name: 'Adrian', surname: 'Fox'},
    {name: 'Aiden', surname: 'Dixon'},
    {name: 'Tony', surname: 'George'},
    {name: 'Mabelle', surname: 'Martinez'},
    {name: 'Dollie', surname: 'Cunningham'},
    {name: 'Melvin', surname: 'Williams'},
    {name: 'Harriet', surname: 'Carroll'}
].sort((a, b) => a.surname.localeCompare(b.surname));

const getFullName = (item) => `${item.name} ${item.surname}`;

const hasItemMatch = (value, item) =>
    getFullName(item).match(new RegExp(escapeRegExp(value.trim()), 'ig'));

const renderItem = (value, item) => {
    const fullName = getFullName(item);
    const wordsToHighlight = value.split(' ');
    return (
        <SuggestInputItem key={fullName} value={fullName}>
            <Typography
                box="inline"
                variant="caption"
                intent="quiet"
                style={{marginRight: 4}}
                as="span"
            >
                <Highlight words={wordsToHighlight}>{item.name}</Highlight>
            </Typography>
            <Highlight words={wordsToHighlight}>{item.surname}</Highlight>
        </SuggestInputItem>
    );
};

const notFoundElement = (
    <ListItem>
        <Typography intent="quiet" variant="caption">
            No Suggests
        </Typography>
    </ListItem>
);

function fetchItems(query) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(items.filter((item) => hasItemMatch(query, item)));
        }, 500);
    });
}

function useItemsRequest() {
    const initialState = {
        query: null,
        loading: false,
        result: undefined,
        prevResult: undefined
    };

    const [state, setState] = React.useState(initialState);

    React.useEffect(() => {
        let didCancel = false;

        if (!state.query) {
            setState((prevState) => ({
                ...prevState,
                loading: false,
                result: undefined,
                prevResult: prevState.result
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                loading: true,
                result: undefined,
                prevResult: prevState.result || prevState.prevResult
            }));

            fetchItems(state.query).then((result) => {
                if (didCancel) {
                    return;
                }
                setState((prevState) => ({...prevState, loading: false, result}));
            });
        }

        return () => {
            didCancel = true;
        };
    }, [state.query]);

    return {
        loading: state.loading,
        query: state.query,
        setQuery: (query) => setState((prevState) => ({...prevState, query})),
        clear: () => setState(initialState),
        result: state.result,
        prevResult: state.prevResult
    };
}

function SyncExample() {
    return (
        <SuggestInput onComplete={(value) => console.log(value)}>
            {(value = '') => {
                const suggests = items
                    .filter((item) => hasItemMatch(value, item))
                    .map((item) => renderItem(value, item));

                return suggests.length ? suggests : notFoundElement;
            }}
        </SuggestInput>
    );
}

function AsyncExample() {
    const [value, setValue] = React.useState('');
    const request = useItemsRequest();

    const handleValueChange = (value) => {
        setValue(value);
        if (value) {
            request.setQuery(value);
        }
    };

    const handleComplete = (value) => {
        setValue(value);
    };

    const handleOpenChange = (open) => {
        if (open) {
            request.setQuery(value);
        } else {
            request.clear();
        }
    };

    const result = request.loading ? request.prevResult : request.result;

    const content =
        result && value
            ? result.length
                ? result.map((item) => renderItem(value, item))
                : notFoundElement
            : null;

    return (
        <SuggestInput
            clearable
            loading={!!value && request.loading}
            value={value}
            onValueChange={handleValueChange}
            onOpenChange={handleOpenChange}
            onComplete={handleComplete}
            openOnFocus
        >
            {content}
        </SuggestInput>
    );
}

const [state, setState] = React.useState({
    async: false
});

<Paper>
    <PageContent>
        <Controls>
            <ControlsItem>{state.async ? <AsyncExample /> : <SyncExample />}</ControlsItem>
            <ControlsItem>
                <Typography as="label">
                    <input
                        type="checkbox"
                        checked={state.async}
                        onChange={() => setState(({async}) => ({async: !async}))}
                    />
                    {' Async'}
                </Typography>
            </ControlsItem>
        </Controls>
    </PageContent>
</Paper>;
```
