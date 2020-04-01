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
        <div style={{padding: '8px 16px'}}>
            <Controls gap={4}>
                <ControlsItem>{icon}</ControlsItem>
                <ControlsItem>
                    <Typography>{name}</Typography>
                    <Typography quiet variant="caption" as="div">
                        <pre
                            style={{margin: '0'}}
                        >{`import {${variable}} from 'genestack-ui/src/icons';`}</pre>
                    </Typography>
                </ControlsItem>
            </Controls>
        </div>
    );
}

<Paper>
    <WithSeparator separator={<Divider style={{marginLeft: 50, width: 'auto'}} gap={0} />}>
        {Object.keys(icons)
            .sort()
            .map((iconName, index) => {
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
    </WithSeparator>
</Paper>;
```
