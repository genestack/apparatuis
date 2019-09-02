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
        <Paper style={{width: '450px'}}>
            <PageContent>
                <Controls gap={4}>
                    <ControlsItem>
                        {icon}
                    </ControlsItem>
                    <ControlsItem>
                        <Typography>{name}</Typography>
                        <Typography quiet variant="caption">
                            <pre>{`import {${variable}} from 'genestack-ui/src/icons';`}</pre>
                        </Typography>
                    </ControlsItem>
                </Controls>
            </PageContent>
        </Paper>
    );
}
function makeChunks(arr, chunkLength) {
    const chunked = [];
    let chunk = [];
    arr.forEach((icon) => {
        if(chunk.length < chunkLength) {
            chunk.push(icon);
        } else {
            chunked.push(chunk);
            chunk = [icon];
        }
    });
    return chunked;
}


<WithSeparator separator={<Divider gap={2} variant="transparent" />}>
    {makeChunks(Object.keys(icons).sort(), 2).map((chunk) => (
        <Controls>
            {chunk.map((iconName) => {
                const Icon = icons[iconName];
                return (
                    <ControlsItem>
                        <IconPlate icon={<Icon />} name={iconName.replace('Icon', '')} variable={iconName} />
                    </ControlsItem>
                )
            })}
        </Controls>
    ))}
</WithSeparator>
```