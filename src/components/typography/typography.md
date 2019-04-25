```js
const {DarkContext} = require('../../utils/dark-context');

initialState = {
    inverted: false,
    quiet: true
};

<React.Fragment>
    <PageContent as={Paper}>
        <Typography as="h1" variant="header" box="paragraph">
            Small Airways Smoking Hackett 2012 SRP005411 (SRA)
        </Typography>
        <Typography as="p" box="paragraph">
            I&R, Homo sapiens,{' '}
            <Typography as="span" quiet box="inline">
                Tissue:
            </Typography>{' '}
            Epithelium of Bronchiole
        </Typography>
        <Typography as="h2" variant="title" box="paragraph">
            Description and Background
        </Typography>
        <Typography as="p" box="paragraph">
            Morphological changes in the small airway epithelium are the first histopathological
            manifestations of smoking-induced lung disease. Gene expression profiling using
            microarrays has permitted the identification of changes in the small airway epithelium
            of chronic cigarette smokers who have normal pulmonary function.
        </Typography>
        <Typography as="p" box="paragraph">
            The availability of high throughput, massively parallel RNA sequencing (RNA-Seq) of the
            entire transcriptome opens the possibility of a higher sensitivity and more detailed
            characterization of the response of the small airway epithelium to smoking.
        </Typography>
        <Typography as="h3" variant="section" box="paragraph">
            Epithelium of Bronchiole Basic information
        </Typography>
        <Typography as="p" box="paragraph">
            Epithelial cells were obtained by fiberoptic bronchoscopy and brushing of healthy
            smokers (n=6) and n=5 healthy nonsmokers, all with normal lung function and chest
            x-rays. RNA was extracted and used for massively parallel sequencing of PolyA selected
            transcripts using the Illumina Genome Snalyzer II.
        </Typography>

        <Typography as="p" variant="caption" box="paragraph">
            The availability of high throughput, massively parallel RNA sequencing (RNA-Seq) of the
            entire transcriptome opens the possibility of a higher sensitivity and more detailed
            characterization of the response of the small airway epithelium to smoking.
        </Typography>
    </PageContent>

    <Divider gap={4} variant="transparent" />

    <Controls style={{alignItems: 'flex-start'}} gap={6}>
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
        </ControlsItem>
        <ControlsItem shrink>
            <PageContent
                as={Paper}
                style={{background: state.inverted ? 'rgb(51, 51, 51)' : 'rgb(255, 255, 255)'}}
            >
                <DarkContext.Provider value={state.inverted}>
                    <Typography as="h1" variant="header" box="paragraph">
                        <Typography as="span" variant="header" box="inline" quiet={state.quiet}>
                            Quiet Header
                        </Typography>{' '}
                        Helvetica Bold{' '}
                        <Typography as="span" variant="title" box="inline" quiet={state.quiet}>
                            24/32
                        </Typography>
                    </Typography>
                    <Typography as="h2" variant="title" box="paragraph">
                        <Typography as="span" variant="title" box="inline" quiet={state.quiet}>
                            Quiet Title
                        </Typography>{' '}
                        Helvetica Bold{' '}
                        <Typography as="span" variant="title" box="inline" quiet={state.quiet}>
                            20/28
                        </Typography>
                    </Typography>
                    <Typography as="h3" variant="section" box="paragraph">
                        <Typography as="span" variant="section" box="inline" quiet={state.quiet}>
                            Quiet Section
                        </Typography>{' '}
                        Helvetica Bold
                        <Typography as="span" variant="body" box="inline" quiet={state.quiet}>
                            20/28
                        </Typography>
                    </Typography>
                    <Typography as="p" box="paragraph">
                        <Typography as="span" box="inline" quiet={state.quiet}>
                            Quiet body text
                        </Typography>{' '}
                        Helvetica Normal
                        <Typography as="span" variant="caption" box="inline" quiet={state.quiet}>
                            14/20
                        </Typography>
                    </Typography>
                    <Typography variant="caption" box="paragraph" quiet={state.quiet}>
                        Quiet caption text – small body text Helvetica Normal 12/18
                    </Typography>
                    <Typography variant="caption" box="paragraph">
                        <Typography as="span" variant="caption" box="inline" quiet>
                            Tissue:
                        </Typography>{' '}
                        Epithelium of Bronchiole
                    </Typography>
                    <Divider gap={4} variant="transparent" />
                    <Typography box="paragraph">
                        A &lt;STRONG&gt; tag{' '}
                        <strong>
                            is working well with <em>texts</em> and <em>captions</em>
                        </strong>
                    </Typography>
                    <Typography box="paragraph">
                        <Typography quiet as="span" box="inline">
                            Quiet is useful for secondary information
                        </Typography>, while <em>Italic</em> is done with &lt;EM&gt; tag.
                    </Typography>
                </DarkContext.Provider>
            </PageContent>
        </ControlsItem>
    </Controls>
</React.Fragment>;
```
