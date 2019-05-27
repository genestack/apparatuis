```js
<PageContent as={Paper}>
    <Controls>
        <ControlsItem>
            <Link disabled>I am a super link</Link>
        </ControlsItem>
        <ControlsItem>
            <Link>I am a super link</Link>
        </ControlsItem>
    </Controls>
    <Divider gap={4} variant="transparent" />
    <Controls>
        <ControlsItem>
            <Link disabled variant="pseudo">
                I am a super link
            </Link>
        </ControlsItem>
        <ControlsItem>
            <Link variant="pseudo">I am a super link</Link>
        </ControlsItem>
    </Controls>
    <Divider gap={4} variant="transparent" />
    <Controls>
        <ControlsItem>
            <Link disabled variant="external">
                I am a super link
            </Link>
        </ControlsItem>
        <ControlsItem>
            <Link variant="external">I am a super link</Link>
        </ControlsItem>
    </Controls>
</PageContent>
```
