```js
const {DarkContext} = require('../../utils/dark-context');
const {
    Presentation,
    usePresentation,
    PresentationControls,
    PresentationState,
    PresentationPane
} = require('../../../styleguide-components/presentation');

function TypographyExample() {
    const presentation = usePresentation();
    return (
        <React.Fragment>
            <Typography
                variant="header"
                box="paragraph"
                condensed={presentation.condensed}
                intent={presentation.intent}
            >
                Header IBM Plex <em>{presentation.condensed ? 'Condensed' : 'Sans'}</em>{' '}
                {presentation.intent === 'quiet' ? 'Medium' : 'Bold'} 24/32
            </Typography>
            <Typography
                variant="title"
                box="paragraph"
                condensed={presentation.condensed}
                intent={presentation.intent}
            >
                Title IBM Plex <em>{presentation.condensed ? 'Condensed' : 'Sans'}</em>{' '}
                {presentation.intent === 'quiet' ? 'Medium' : 'Bold'} 20/28
            </Typography>
            <Typography
                variant="section"
                box="paragraph"
                condensed={presentation.condensed}
                intent={presentation.intent}
            >
                Section IBM Plex <em>{presentation.condensed ? 'Condensed' : 'Sans'}</em>{' '}
                {presentation.intent === 'quiet' ? 'Medium' : 'Bold'} 14/20
            </Typography>
            <Typography
                box="paragraph"
                condensed={presentation.condensed}
                intent={presentation.intent}
            >
                Body IBM Plex <em>{presentation.condensed ? 'Condensed' : 'Sans'}</em> Regular 14/20
            </Typography>

            <Typography
                variant="caption"
                box="paragraph"
                condensed={presentation.condensed}
                intent={presentation.intent}
            >
                Caption IBM Plex <em>{presentation.condensed ? 'Condensed' : 'Sans'}</em> Regular
                12/18
            </Typography>
        </React.Fragment>
    );
}
<Presentation
    initialState={{
        inverted: false,
        intent: 'no-intent',
        condensed: false
    }}
>
    <PresentationControls>
        <PresentationState name="inverted" label="Inverted" />
        <PresentationState name="condensed" label="Condensed" />
        <ListItem>
            <Typography variant="section">Intent</Typography>
        </ListItem>
        <PresentationState name="intent" label="No intent" value="no-intent" />
        <PresentationState name="intent" label="Quiet" value="quiet" />
        <PresentationState name="intent" label="Alarm" value="alarm" />
        <PresentationState name="intent" label="Warning" value="warning" />
        <PresentationState name="intent" label="Success" value="success" />
    </PresentationControls>
    <PresentationPane>
        <TypographyExample />
    </PresentationPane>{' '}
</Presentation>;
```

```js
<React.Fragment>
    <PageContent as={Paper}>
        <Typography variant="header" box="paragraph">
            Small Airways Smoking Hackett 2012 SRP005411 (SRA)
        </Typography>
        <Typography box="paragraph">
            I&R, Homo sapiens,{' '}
            <Typography as="span" intent="quiet" box="inline">
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
</React.Fragment>
```
