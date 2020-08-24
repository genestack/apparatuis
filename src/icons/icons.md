# Icons

Import example:

```ts
import {DownloadIcon, WarningIcon} from 'genestack-ui/src/icons';
```

```jsx harmony
const icons = require('./icons');

const {PageContent} = require('../components/page-content');
const {Paper} = require('../components/paper');
const {Typography} = require('../components/typography');
const {Divider} = require('../components/divider');
const {WithSeparator} = require('../components/with-separator');
const {Controls, ControlsItem} = require('../components/controls');

function IconPlate({icon, name, variable}) {
    return (
        <div
            style={{
                padding: '8px 16px',
                width: '90px',
                height: '65px',
                display: 'inline-block'
            }}
        >
            <Controls gap={4} style={{display: 'flex', flexDirection: 'column'}}>
                <ControlsItem>{icon}</ControlsItem>
                <Divider variant="transparent" gap={1} />
                <ControlsItem>
                    <Typography quiet variant="caption">
                        {name}
                    </Typography>
                </ControlsItem>
            </Controls>
        </div>
    );
}

initialState = {
    value: ''
};

const results = Object.keys(icons).filter((name) =>
    name.toLowerCase().match(state.value.toLowerCase())
);

<PageContent as={Paper}>
    <Controls>
        <Input
            value={state.value}
            onValueChange={(value) => setState({value})}
            style={{width: '300px'}}
            placeholder={'Search icons...'}
        />
    </Controls>
    <Divider variant="transparent" gap={1} />
    <Typography>
        {results.length} matching {results.length === 1 ? 'value' : 'values'}
    </Typography>
    <Divider variant="transparent" gap={3} />
    {results.map((iconName, index) => {
        const Icon = icons[iconName];
        return (
            <IconPlate
                key={index}
                icon={<Icon />}
                name={iconName.replace('Icon', '')}
                variable={iconName}
            />
        );
    })}
</PageContent>;
```
