```js
const AutocompleteDataProvider = require('./data-provider').default;
initialState = {
    emulateNetworkError: false,
    customRenderSuggestion: false,
    customRenderLoading: false,
    customRenderNoMatches: false,
    customRenderError: false
};

customRenderSuggestionFn = ({item, index, getItemProps}) => (
    <li key={index} {...getItemProps({item, index})}>
        {item} {index}
    </li>
);

customRenderLoadingFn = () => (
    <li>{'Loading...'}</li>
);

customRenderNoMatchesFn = () => (
    <li>{'No matches'}</li>
);

customRenderErrorFn = () => (
    <li>{'ERROR'}</li>
);

fetchFn = (value) => {
    const data = [
        'Don Perry',
        'Olivia Nguyen',
        'Donald Edwards',
        'Jeremiah Phelps',
        'Virgie Jefferson',
        'Mitchell Schultz',
        'Aiden Dunn',
        'Rhoda Martin',
        'William Burns',
        'Brett Haynes',
        'Steve Lyons',
        'Chase Lynch',
        'Troy Walsh',
        'Adrian Fox',
        'Aiden Dixon',
        'Tony George',
        'Mabelle Martinez',
        'Dollie Cunningham',
        'Melvin Williams',
        'Harriet Carroll'
    ].sort((a, b) => a.localeCompare(b));

    return new Promise((resolve, reject) => {
        const timeout = 400;
        const items = data.filter(item => item.includes(value)).slice(0, 5);

        setTimeout(
            () => state.emulateNetworkError ?
                reject() :
                resolve(items),
            timeout
        );
    });
};

<div>

    <p>
        <Checkbox
            isChecked={state.emulateNetworkError}
            onChange={(event, value) => setState({
                emulateNetworkError: value
            })}
        >
            Emulate network error
        </Checkbox>
    </p>


    <p>
        <Checkbox
            isChecked={state.customRenderSuggestion}
            onChange={(event, value) => setState({
                customRenderSuggestion: value
            })}
        >
            Custom <b>renderSuggestion</b>
        </Checkbox>

        <br />

        <Checkbox
            isChecked={state.customRenderLoading}
            onChange={(event, value) => setState({
                customRenderLoading: value
            })}
        >
            Custom <b>renderLoading</b>
        </Checkbox>

        <br />

        <Checkbox
            isChecked={state.customRenderNoMatches}
            onChange={(event, value) => setState({
                customRenderNoMatches: value
            })}
        >
            Custom <b>renderNoMatches</b>
        </Checkbox>

        <br />

        <Checkbox
            isChecked={state.customRenderError}
            onChange={(event, value) => setState({
                customRenderError: value
            })}
        >
            Custom <b>renderError</b>
        </Checkbox>
    </p>

    <p>
        <AutocompleteDataProvider fetch={fetchFn}>
            {({items, isLoading, value, error, onValueChange}) => (
                <AutocompleteInput
                    items={items}
                    isLoading={isLoading}
                    error={error}
                    onValueChange={onValueChange}
                    value={value}
                    renderSuggestion={state.customRenderSuggestion ? customRenderSuggestionFn : undefined}
                    renderLoading={state.customRenderLoading ? customRenderLoadingFn : undefined}
                    renderNoMatches={state.customRenderNoMatches ? customRenderNoMatchesFn : undefined}
                    renderError={state.customRenderError ? customRenderErrorFn : undefined}
                />
            )}
        </AutocompleteDataProvider>
    </p>
</div>
```
