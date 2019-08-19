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

### Auto-filled input

```js
<RootElement>
    <PageContent>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <Paper style={{width: 320}}>
                <PageContent>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Typography box="paragraph">
                            Fill fields and click to the key icon in the address bar to save
                            credentials and enabling auto-fill.
                        </Typography>

                        <Typography box="paragraph" style={{marginTop: 12}}>
                            Email
                        </Typography>
                        <Field
                            fullWidth
                            component="input"
                            type="email"
                            name="email"
                            autoComplete="username"
                        />

                        <Typography box="paragraph" style={{marginTop: 12}}>
                            Password
                        </Typography>
                        <Field
                            fullWidth
                            component="input"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                        />

                        <Typography box="paragraph" style={{marginTop: 20}}>
                            <Button type="submit" variant="primary">
                                Submit
                            </Button>
                        </Typography>
                    </form>
                </PageContent>
            </Paper>
        </div>
    </PageContent>
</RootElement>
```
