```js
const {DarkContext} = require('../../utils/dark-context');

initialState = {
    inverted: false,
    quiet: true
};

<React.Fragment>
    <PageContent as={Paper}>
        <Typography variant="header" box="paragraph">
            Small Airways Smoking Hackett 2012 SRP005411 (SRA)
        </Typography>
        <Typography box="paragraph">
            I&R, Homo sapiens,{' '}
            <Typography as="span" quiet box="inline">
                Tissue:
            </Typography>{' '}
            Epithelium of Bronchiole
        </Typography>
        <Typography variant="title" box="paragraph">
            Description and Background
        </Typography>
        <Typography box="paragraph">
            Morphological changes in the small airway epithelium are the first histopathological
            manifestations of smoking-induced lung disease. Gene expression profiling using
            microarrays has permitted the identification of changes in the small airway epithelium
            of chronic cigarette smokers who have normal pulmonary function.
        </Typography>
        <Typography box="paragraph">
            The availability of high throughput, massively parallel RNA sequencing (RNA-Seq) of the
            entire transcriptome opens the possibility of a higher sensitivity and more detailed
            characterization of the response of the small airway epithelium to smoking.
        </Typography>
        <Typography variant="section" box="paragraph">
            Epithelium of Bronchiole Basic information
        </Typography>
        <Typography box="paragraph">
            Epithelial cells were obtained by fiberoptic bronchoscopy and brushing of healthy
            smokers (n=6) and n=5 healthy nonsmokers, all with normal lung function and chest
            x-rays. RNA was extracted and used for massively parallel sequencing of PolyA selected
            transcripts using the Illumina Genome Snalyzer II.
        </Typography>

        <Typography variant="caption" box="paragraph">
            The availability of high throughput, massively parallel RNA sequencing (RNA-Seq) of the
            entire transcriptome opens the possibility of a higher sensitivity and more detailed
            characterization of the response of the small airway epithelium to smoking.
        </Typography>
    </PageContent>

    <Divider gap={4} variant="transparent" />

    <Controls style={{alignItems: 'flex-start'}} gap={4}>
        <ControlsItem>
            <Controls justify="end" as="label">
                <ControlsItem>
                    <Typography>Inverted</Typography>
                </ControlsItem>
                <ControlsItem>
                    <input
                        type="checkbox"
                        checked={state.inverted}
                        onChange={(event) => setState({inverted: event.currentTarget.checked})}
                    />
                </ControlsItem>
            </Controls>
            <Divider variant="transparent" />
            <Controls justify="end" as="label">
                <ControlsItem>
                    <Typography>Quiet</Typography>
                </ControlsItem>
                <ControlsItem>
                    <input
                        type="checkbox"
                        checked={state.quiet}
                        onChange={(event) => setState({quiet: event.currentTarget.checked})}
                    />
                </ControlsItem>
            </Controls>
            <Divider variant="transparent" />
            <Controls justify="end" as="label">
                <ControlsItem>
                    <Typography>Condensed</Typography>
                </ControlsItem>
                <ControlsItem>
                    <input
                        type="checkbox"
                        checked={state.condensed}
                        onChange={(event) => setState({condensed: event.currentTarget.checked})}
                    />
                </ControlsItem>
            </Controls>
        </ControlsItem>
        <ControlsItem shrink>
            <DarkContext.Provider value={state.inverted}>
                <PageContent as={Paper}>
                    <Typography variant="header" box="paragraph" condensed={state.condensed}>
                        <Typography
                            as="span"
                            variant="header"
                            box="inline"
                            intent={state.quiet ? 'quiet' : 'no-intent'}
                            condensed={state.condensed}
                        >
                            Quiet Header
                        </Typography>{' '}
                        Helvetica Bold{' '}
                        <Typography
                            as="span"
                            variant="title"
                            box="inline"
                            intent={state.quiet ? 'quiet' : 'no-intent'}
                            condensed={state.condensed}
                        >
                            24/32
                        </Typography>
                    </Typography>
                    <Typography variant="title" box="paragraph" condensed={state.condensed}>
                        <Typography
                            as="span"
                            variant="title"
                            box="inline"
                            intent={state.quiet ? 'quiet' : 'no-intent'}
                            condensed={state.condensed}
                        >
                            Quiet Title
                        </Typography>{' '}
                        Helvetica Bold{' '}
                        <Typography
                            as="span"
                            variant="title"
                            box="inline"
                            intent={state.quiet ? 'quiet' : 'no-intent'}
                            condensed={state.condensed}
                        >
                            20/28
                        </Typography>
                    </Typography>
                    <Typography variant="section" box="paragraph" condensed={state.condensed}>
                        <Typography
                            as="span"
                            variant="section"
                            box="inline"
                            intent={state.quiet ? 'quiet' : 'no-intent'}
                            condensed={state.condensed}
                        >
                            Quiet Section
                        </Typography>{' '}
                        Helvetica Bold
                        <Typography
                            as="span"
                            variant="body"
                            box="inline"
                            intent={state.quiet ? 'quiet' : 'no-intent'}
                            condensed={state.condensed}
                        >
                            14/20
                        </Typography>
                    </Typography>
                    <Typography box="paragraph" condensed={state.condensed}>
                        <Typography
                            as="span"
                            box="inline"
                            intent={state.quiet ? 'quiet' : 'no-intent'}
                            condensed={state.condensed}
                        >
                            Quiet body text
                        </Typography>{' '}
                        Helvetica Normal
                        <Typography
                            as="span"
                            variant="caption"
                            box="inline"
                            intent={state.quiet ? 'quiet' : 'no-intent'}
                            condensed={state.condensed}
                        >
                            14/20
                        </Typography>
                    </Typography>
                    <Typography
                        variant="caption"
                        box="paragraph"
                        intent={state.quiet ? 'quiet' : 'no-intent'}
                        condensed={state.condensed}
                    >
                        Quiet caption text – small body text Helvetica Normal 12/18
                    </Typography>
                    <Typography variant="caption" box="paragraph" condensed={state.condensed}>
                        <Typography
                            as="span"
                            variant="caption"
                            box="inline"
                            intent="quiet"
                            condensed={state.condensed}
                        >
                            Tissue:
                        </Typography>{' '}
                        Epithelium of Bronchiole
                    </Typography>
                    <Divider gap={4} variant="transparent" />
                    <Typography box="paragraph" condensed={state.condensed}>
                        A &lt;STRONG&gt; tag{' '}
                        <strong>
                            is working well with <em>texts</em> and <em>captions</em>
                        </strong>
                    </Typography>
                    <Typography box="paragraph" condensed={state.condensed}>
                        <Typography
                            intent="quiet"
                            as="span"
                            box="inline"
                            condensed={state.condensed}
                        >
                            Quiet is useful for secondary information
                        </Typography>
                        , while <em>Italic</em> is done with &lt;EM&gt; tag.
                    </Typography>
                    <Typography
                        box="paragraph"
                        variant="section"
                        intent="alarm"
                        condensed={state.condensed}
                    >
                        Error has occurred
                    </Typography>
                    <Typography box="paragraph" intent="warning" condensed={state.condensed}>
                        You shall not pass! (c) Gandalf
                    </Typography>
                    <Typography box="paragraph" intent="success" condensed={state.condensed}>
                        Download is complete
                    </Typography>
                </PageContent>
            </DarkContext.Provider>
        </ControlsItem>
    </Controls>
</React.Fragment>;
```
