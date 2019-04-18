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
                <HeaderButton>Label</HeaderButton>
            </WhiteControlsItem>
        </Controls>
        <Controls>
            <WhiteControlsItem>
                <HeaderButton>
                    <HeaderItemText>Tasks</HeaderItemText>
                    <HeaderItemText style={{color: '#D45E18'}}>5</HeaderItemText>
                </HeaderButton>
            </WhiteControlsItem>
        </Controls>
        <Controls>
            <WhiteControlsItem>
                <HeaderButton>
                    <HeaderItemText>Label</HeaderItemText>
                    <HeaderItemCell>
                        <Typography style={{color: '#D45E18'}}>5</Typography>
                    </HeaderItemCell>
                    <HeaderItemCell>
                        <Typography style={{color: '#34AF7C'}}>24</Typography>
                    </HeaderItemCell>
                </HeaderButton>
            </WhiteControlsItem>
        </Controls>
        <Controls>
            <WhiteControlsItem>
                <HeaderButton>
                    <HeaderItemText variant="section" style={{color: '#024DA1'}}>
                        Application Title
                    </HeaderItemText>
                </HeaderButton>
            </WhiteControlsItem>
        </Controls>
        <Controls>
            <WhiteControlsItem>
                <HeaderButton>
                    <HeaderItemIcon>
                        <OpenFolderIcon />
                    </HeaderItemIcon>
                    <HeaderItemText>Label</HeaderItemText>
                </HeaderButton>
            </WhiteControlsItem>
            <WhiteControlsItem>
                <HeaderButton>
                    <HeaderItemText>Label</HeaderItemText>
                    <HeaderItemIcon>
                        <OpenFolderIcon />
                    </HeaderItemIcon>
                </HeaderButton>
            </WhiteControlsItem>
        </Controls>
        <Controls>
            <WhiteControlsItem>
                <HeaderButton>
                    <HeaderItemIcon>
                        <FileIcon />
                    </HeaderItemIcon>
                    <HeaderItemText>File link name</HeaderItemText>
                </HeaderButton>
            </WhiteControlsItem>
        </Controls>
        <Controls>
            <WhiteControlsItem>
                <HeaderButton>
                    <HeaderButtonSecondaryActions>
                        <Button tiny variant="ghost" icon={<LockIcon />} />
                    </HeaderButtonSecondaryActions>
                    <HeaderItemIcon>
                        <FileIcon />
                    </HeaderItemIcon>
                    <HeaderItemText>File link name</HeaderItemText>
                </HeaderButton>
            </WhiteControlsItem>
            <WhiteControlsItem>
                <HeaderButton>
                    <HeaderButtonSecondaryActions>
                        <TooltipHandler
                            tooltip={
                                <Tooltip open style={{whiteSpace: 'nowrap'}}>
                                    I am disabled
                                </Tooltip>
                            }
                        >
                            <Button disabled tiny variant="ghost" icon={<LockIcon />} />
                        </TooltipHandler>
                    </HeaderButtonSecondaryActions>
                    <HeaderItemIcon>
                        <FileIcon />
                    </HeaderItemIcon>
                    <HeaderItemText>File link name</HeaderItemText>
                </HeaderButton>
            </WhiteControlsItem>
            <WhiteControlsItem>
                <HeaderButton>
                    <HeaderItemIcon>
                        <FileIcon />
                    </HeaderItemIcon>
                    <HeaderButtonSecondaryActions>
                        <Button tiny variant="ghost" icon={<LockIcon />} />
                    </HeaderButtonSecondaryActions>
                    <HeaderItemText>File link name</HeaderItemText>
                </HeaderButton>
            </WhiteControlsItem>
            <WhiteControlsItem>
                <HeaderButton>
                    <HeaderItemIcon>
                        <FileIcon />
                    </HeaderItemIcon>
                    <HeaderItemText>File link name</HeaderItemText>
                    <HeaderButtonSecondaryActions>
                        <Button tiny variant="ghost" icon={<MoreIcon />} />
                    </HeaderButtonSecondaryActions>
                </HeaderButton>
            </WhiteControlsItem>
        </Controls>
        <Controls>
            <WhiteControlsItem>
                <HeaderButton>
                    <HeaderButtonSecondaryActions>
                        <Button tiny variant="ghost" icon={<ShareIcon />} />
                        <Button tiny variant="ghost" icon={<LockIcon />} />
                    </HeaderButtonSecondaryActions>
                    <HeaderItemIcon>
                        <FileIcon />
                    </HeaderItemIcon>
                    <HeaderItemText>File link name</HeaderItemText>
                </HeaderButton>
            </WhiteControlsItem>
            <WhiteControlsItem>
                <TooltipHandler tooltip={<Tooltip>Did not expect to see me here?</Tooltip>}>
                    <HeaderButton disabled>
                        <HeaderButtonSecondaryActions>
                            <Button disabled tiny variant="ghost" icon={<ShareIcon />} />
                            <Button disabled tiny variant="ghost" icon={<LockIcon />} />
                        </HeaderButtonSecondaryActions>
                        <HeaderItemIcon>
                            <FileIcon />
                        </HeaderItemIcon>
                        <HeaderItemText>File link name</HeaderItemText>
                    </HeaderButton>
                </TooltipHandler>
            </WhiteControlsItem>
        </Controls>
        <Controls>
            <WhiteControlsItem>
                <HeaderButton>
                    <HeaderItemIcon>
                        <MenuIcon />
                    </HeaderItemIcon>
                </HeaderButton>
            </WhiteControlsItem>
            <WhiteControlsItem>
                <HeaderButton>
                    <HeaderItemIcon>
                        <OpenFolderIcon />
                    </HeaderItemIcon>
                </HeaderButton>
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
    </WithSeparator>
</PageContent>;
```
