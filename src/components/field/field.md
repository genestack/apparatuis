```js
<Paper>
    <PageContent>
        <Controls align="baseline" style={{flexWrap: 'wrap'}}>
            <ControlsItem>
                <Typography quiet variant="caption">
                    As div element
                </Typography>
                <Field>Div element</Field>
            </ControlsItem>
            <ControlsItem>
                <Typography quiet variant="caption">
                    As invalid input
                </Typography>
                <Field component="input" invalid placeholder="Input content" />
            </ControlsItem>
            <ControlsItem>
                <Typography quiet variant="caption">
                    As textarea
                </Typography>
                <Field component="textarea" placeholder="Input content" rows={3} />
            </ControlsItem>
            <ControlsItem>
                <Typography quiet variant="caption">
                    As disabled element
                </Typography>
                <Field disabled>Div element</Field>
            </ControlsItem>
            <ControlsItem>
                <Typography quiet variant="caption">
                    As select
                </Typography>
                <Field component="select">
                    <option value="Foo">Foo</option>
                    <option value="Bar">Bar</option>
                </Field>
            </ControlsItem>
            <ControlsItem>
                <Typography quiet variant="caption">
                    As number input
                </Typography>
                <Field component="input" type="number" />
            </ControlsItem>
        </Controls>
    </PageContent>
</Paper>
```
