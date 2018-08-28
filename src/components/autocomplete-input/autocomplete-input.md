```js
const AutocompleteDataProvider = require('./data-provider').default;
initialState = { emulateNetworkError: false };
<div>
    <AutocompleteDataProvider fetch={(value) => {
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
    }}>
        {({items, isLoading, value, error, onValueChange}) => (
            <AutocompleteInput
                items={items}
                isLoading={isLoading}
                error={error}
                onValueChange={onValueChange}
                value={value}
            />
        )}
    </AutocompleteDataProvider>

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
</div>
```
