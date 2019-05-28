```js
<RootElement>
    <PageContent as={Paper}>
        <WithSeparator separator={<Divider gap={2} variant="transparent" />}>
            <Controls>
                <ControlsItem>
                    <Link disabled>Common Link (p)</Link>
                </ControlsItem>
                <ControlsItem>
                    <Link>Common Link (p)</Link>
                </ControlsItem>
                <ControlsItem focus>
                    <Link focus>Common Link (p)</Link>
                </ControlsItem>
            </Controls>
            <Controls>
                <ControlsItem>
                    <Link variant="pseudo" disabled>
                        Pseudo Link (p)
                    </Link>
                </ControlsItem>
                <ControlsItem>
                    <Link variant="pseudo">Pseudo Link (p)</Link>
                </ControlsItem>
                <ControlsItem focus>
                    <Link variant="pseudo" focus>
                        Pseudo Link (p)
                    </Link>
                </ControlsItem>
            </Controls>
            <Controls>
                <ControlsItem>
                    <Link variant="external" disabled>
                        External Link (p)
                    </Link>
                </ControlsItem>
                <ControlsItem>
                    <Link variant="external">External Link (p)</Link>
                </ControlsItem>
                <ControlsItem focus>
                    <Link variant="external" focus>
                        External Link (p)
                    </Link>
                </ControlsItem>
            </Controls>
            <React.Fragment>
                <Typography variant="title" box="paragraph">
                    Super <Link variant="pseudo">Pseudo Link (p)</Link> in title
                </Typography>
                <Typography variant="caption" box="paragraph" style={{width: 200}}>
                    Caption <Link variant="external">External Link (p)</Link> in caption. Break
                    lines at this caption.
                </Typography>
                <Typography variant="section" box="paragraph" style={{width: 200}}>
                    Try to break <Link variant="pseudo">Pseudo Link (p) with long content</Link> to
                    see how it works on many lines
                </Typography>
            </React.Fragment>
        </WithSeparator>
    </PageContent>
</RootElement>
```
