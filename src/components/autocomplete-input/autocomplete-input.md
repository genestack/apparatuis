```js
const AutocompleteInput = require('./autocomplete-input.tsx').default;
const AutocompleteDataProvider = require('./data-provider').default;
const Checkbox = require('../checkbox/checkbox').default;
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

    <div>
        <Checkbox
            checked={state.emulateNetworkError}
            onChange={(event, value) => setState({
                emulateNetworkError: value
            })}
        >
            Emulate network error
        </Checkbox>
    </div>


    <div>
        <Checkbox
            checked={state.customRenderSuggestion}
            onChange={(event, value) => setState({
                customRenderSuggestion: value
            })}
        >
            Custom <b>renderSuggestion</b>
        </Checkbox>

        <br />

        <Checkbox
            checked={state.customRenderLoading}
            onChange={(event, value) => setState({
                customRenderLoading: value
            })}
        >
            Custom <b>renderLoading</b>
        </Checkbox>

        <br />

        <Checkbox
            checked={state.customRenderNoMatches}
            onChange={(event, value) => setState({
                customRenderNoMatches: value
            })}
        >
            Custom <b>renderNoMatches</b>
        </Checkbox>

        <br />

        <Checkbox
            checked={state.customRenderError}
            onChange={(event, value) => setState({
                customRenderError: value
            })}
        >
            Custom <b>renderError</b>
        </Checkbox>
    </div>

    <div>
        <AutocompleteDataProvider fetch={fetchFn}>
            {({items, isLoading, value, error, onValueChange}) => (
                <AutocompleteInput
                    hasError={Boolean(error)}
                    items={items}
                    isLoading={isLoading}
                    error={error}
                    onValueChange={onValueChange}
                    value={value}
                    placeholder={'Autocomplete placeholder'}
                    renderSuggestion={state.customRenderSuggestion ? customRenderSuggestionFn : undefined}
                    renderLoading={state.customRenderLoading ? customRenderLoadingFn : undefined}
                    renderNoMatches={state.customRenderNoMatches ? customRenderNoMatchesFn : undefined}
                    renderError={state.customRenderError ? customRenderErrorFn : undefined}
                />
            )}
        </AutocompleteDataProvider>
    </div>
</div>
```
