```js
<RootElement>
    <PageContent as={Paper}>
        <Typography variant="section" box="inline">
            Tissues:
        </Typography>{' '}
        <WithSeparator separator=", ">
            <TextLabel box="inline" caption="2097">
                Breast
            </TextLabel>
            <TextLabel box="inline" caption="1946">
                Liver
            </TextLabel>
            <TextLabel box="inline" caption="1299">
                Lung
            </TextLabel>
            <TextLabel box="inline" caption="1015">
                Blood
            </TextLabel>
            <TextLabel box="inline" caption="871">
                Leaf
            </TextLabel>
        </WithSeparator>
    </PageContent>
    <Divider variant="transparent" />
    <PageContent as={Paper} style={{width: 200}}>
        <Typography variant="section" box="paragraph">
            Tissues:
        </Typography>{' '}
        <TextLabel box="paragraph" caption="2097">
            Breast
        </TextLabel>
        <TextLabel box="paragraph" caption="1946">
            Liver
        </TextLabel>
        <TextLabel box="paragraph" caption="1299">
            Lung
        </TextLabel>
        <TextLabel box="paragraph" caption="A very long caption 12">
            Blood
        </TextLabel>
        <TextLabel box="paragraph" caption="871">
            Very very long tissue name
        </TextLabel>
    </PageContent>
</RootElement>
```
