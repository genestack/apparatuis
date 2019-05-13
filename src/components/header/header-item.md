```js
const {OpenFolderIcon} = require('../../icons/open-folder-icon');
const {FileIcon} = require('../../icons/file-icon');
const {LockIcon} = require('../../icons/lock-icon');
const {ShareIcon} = require('../../icons/share-icon');
const {MenuIcon} = require('../../icons/menu-icon');
const {MoreIcon} = require('../../icons/more-icon');

const WhiteControlsItem = (props) => <ControlsItem style={{background: '#fff'}} {...props} />;

<PageContent>
    <WithSeparator separator={<Divider variant="transparent" />}>
        <Controls>
            <WhiteControlsItem>
                <HeaderItem>Label</HeaderItem>
            </WhiteControlsItem>
        </Controls>
        <Controls>
            <WhiteControlsItem>
                <HeaderItem>
                    <HeaderItemText>Tasks</HeaderItemText>
                    <HeaderItemText style={{color: '#D45E18'}}>5</HeaderItemText>
                </HeaderItem>
            </WhiteControlsItem>
        </Controls>
        <Controls>
            <WhiteControlsItem>
                <HeaderItem>
                    <HeaderItemText>Label</HeaderItemText>
                    <HeaderItemCell>
                        <Typography style={{color: '#D45E18'}}>5</Typography>
                    </HeaderItemCell>
                    <HeaderItemCell>
                        <Typography style={{color: '#34AF7C'}}>24</Typography>
                    </HeaderItemCell>
                </HeaderItem>
            </WhiteControlsItem>
        </Controls>
        <Controls>
            <WhiteControlsItem>
                <HeaderItem>
                    <HeaderItemText variant="section" style={{color: '#024DA1'}}>
                        Application Title
                    </HeaderItemText>
                </HeaderItem>
            </WhiteControlsItem>
        </Controls>
        <Controls>
            <WhiteControlsItem>
                <HeaderItem>
                    <HeaderItemIcon>
                        <OpenFolderIcon />
                    </HeaderItemIcon>
                    <HeaderItemText>Label</HeaderItemText>
                </HeaderItem>
            </WhiteControlsItem>
            <WhiteControlsItem>
                <HeaderItem>
                    <HeaderItemText>Label</HeaderItemText>
                    <HeaderItemIcon>
                        <OpenFolderIcon />
                    </HeaderItemIcon>
                </HeaderItem>
            </WhiteControlsItem>
        </Controls>
        <Controls>
            <WhiteControlsItem>
                <HeaderItem>
                    <HeaderItemIcon>
                        <FileIcon />
                    </HeaderItemIcon>
                    <HeaderItemText>File link name</HeaderItemText>
                </HeaderItem>
            </WhiteControlsItem>
        </Controls>
        <Controls>
            <WhiteControlsItem>
                <HeaderItem>
                    <HeaderItemSecondaryActions>
                        <Button tiny variant="ghost" icon={<LockIcon />} />
                    </HeaderItemSecondaryActions>
                    <HeaderItemIcon>
                        <FileIcon />
                    </HeaderItemIcon>
                    <HeaderItemText>File link name</HeaderItemText>
                </HeaderItem>
            </WhiteControlsItem>
            <WhiteControlsItem>
                <HeaderItem>
                    <HeaderItemSecondaryActions>
                        <TooltipHandler
                            tooltip={
                                <Tooltip open style={{whiteSpace: 'nowrap'}}>
                                    I am disabled
                                </Tooltip>
                            }
                        >
                            <Button disabled tiny variant="ghost" icon={<LockIcon />} />
                        </TooltipHandler>
                    </HeaderItemSecondaryActions>
                    <HeaderItemIcon>
                        <FileIcon />
                    </HeaderItemIcon>
                    <HeaderItemText>File link name</HeaderItemText>
                </HeaderItem>
            </WhiteControlsItem>
            <WhiteControlsItem>
                <HeaderItem>
                    <HeaderItemIcon>
                        <FileIcon />
                    </HeaderItemIcon>
                    <HeaderItemSecondaryActions>
                        <Button tiny variant="ghost" icon={<LockIcon />} />
                    </HeaderItemSecondaryActions>
                    <HeaderItemText>File link name</HeaderItemText>
                </HeaderItem>
            </WhiteControlsItem>
            <WhiteControlsItem>
                <HeaderItem>
                    <HeaderItemIcon>
                        <FileIcon />
                    </HeaderItemIcon>
                    <HeaderItemText>File link name</HeaderItemText>
                    <HeaderItemSecondaryActions>
                        <Button tiny variant="ghost" icon={<MoreIcon />} />
                    </HeaderItemSecondaryActions>
                </HeaderItem>
            </WhiteControlsItem>
        </Controls>
        <Controls>
            <WhiteControlsItem>
                <HeaderItem>
                    <HeaderItemSecondaryActions>
                        <Button tiny variant="ghost" icon={<ShareIcon />} />
                        <Button tiny variant="ghost" icon={<LockIcon />} />
                    </HeaderItemSecondaryActions>
                    <HeaderItemIcon>
                        <FileIcon />
                    </HeaderItemIcon>
                    <HeaderItemText>File link name</HeaderItemText>
                </HeaderItem>
            </WhiteControlsItem>
            <WhiteControlsItem>
                <TooltipHandler tooltip={<Tooltip>Did not expect to see me here?</Tooltip>}>
                    <HeaderItem disabled>
                        <HeaderItemSecondaryActions>
                            <Button disabled tiny variant="ghost" icon={<ShareIcon />} />
                            <Button disabled tiny variant="ghost" icon={<LockIcon />} />
                        </HeaderItemSecondaryActions>
                        <HeaderItemIcon>
                            <FileIcon />
                        </HeaderItemIcon>
                        <HeaderItemText>File link name</HeaderItemText>
                    </HeaderItem>
                </TooltipHandler>
            </WhiteControlsItem>
        </Controls>
        <Controls>
            <WhiteControlsItem>
                <HeaderItem>
                    <HeaderItemIcon>
                        <MenuIcon />
                    </HeaderItemIcon>
                </HeaderItem>
            </WhiteControlsItem>
            <WhiteControlsItem>
                <HeaderItem>
                    <HeaderItemIcon>
                        <OpenFolderIcon />
                    </HeaderItemIcon>
                </HeaderItem>
            </WhiteControlsItem>
        </Controls>
        <Controls>
            <WhiteControlsItem>
                <HeaderBlock>
                    <HeaderItemCell>
                        <Button tiny>Trial version</Button>
                    </HeaderItemCell>
                </HeaderBlock>
            </WhiteControlsItem>
            <WhiteControlsItem>
                <HeaderBlock>
                    <HeaderItemCell>
                        <Button tiny icon={<ShareIcon />}>
                            Trial version
                        </Button>
                    </HeaderItemCell>
                </HeaderBlock>
            </WhiteControlsItem>
        </Controls>
        <Controls>
            <WhiteControlsItem>
                <HeaderItem href="#">
                    <HeaderItemSecondaryActions>
                        <Button tiny variant="ghost" icon={<ShareIcon />} />
                    </HeaderItemSecondaryActions>
                    <HeaderItemText>Button inside an anchor</HeaderItemText>
                </HeaderItem>
            </WhiteControlsItem>
        </Controls>
    </WithSeparator>
</PageContent>;
```
