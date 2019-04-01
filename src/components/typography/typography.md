```js
const Frame = (props) => <div style={{background: '#E5E5E5', padding: '16px 0'}} {...props} />;
const Row = (props) => <div style={{display: 'flex'}} {...props} />;
const Paper = ({inverted, useMaxWidth, ...rest}) => (
    <div
        {...rest}
        style={{
            boxSizing: 'border-box',
            background: inverted ? '#333333' : '#FFFFFF',
            maxWidth: useMaxWidth ? 264 : null,
            flexGrow: 1,
            ...rest.style
        }}
    />
);
const Controls = (props) => (
    <div style={{flexShrink: 0, flexGrow: 0, margin: '0 16px', textAlign: 'right'}} {...props} />
);

initialState = {
    inverted: false,
    quiet: true,
    useMaxWidth: true
};

<Frame>
    <Row>
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
                microarrays has permitted the identification of changes in the small airway
                epithelium of chronic cigarette smokers who have normal pulmonary function.
            </Typography>
            <Typography as="p" box="paragraph">
                The availability of high throughput, massively parallel RNA sequencing (RNA-Seq) of
                the entire transcriptome opens the possibility of a higher sensitivity and more
                detailed characterization of the response of the small airway epithelium to smoking.
            </Typography>
            <Typography as="h3" variant="section" box="paragraph">
                Epithelium of Bronchiole Basic information
            </Typography>
            <Typography as="p" box="paragraph">
                Epithelial cells were obtained by fiberoptic bronchoscopy and brushing of healthy
                smokers (n=6) and n=5 healthy nonsmokers, all with normal lung function and chest
                x-rays. RNA was extracted and used for massively parallel sequencing of PolyA
                selected transcripts using the Illumina Genome Snalyzer II.
            </Typography>

            <Typography as="p" variant="caption" box="paragraph">
                The availability of high throughput, massively parallel RNA sequencing (RNA-Seq) of
                the entire transcriptome opens the possibility of a higher sensitivity and more
                detailed characterization of the response of the small airway epithelium to smoking.
            </Typography>
        </PageContent>
    </Row>
    <Divider gap={4} variant="transparent" />
    <Row>
        <Controls>
            <Typography as="label" box="paragraph">
                Inverted{' '}
                <Checkbox
                    checked={state.inverted}
                    onValueChange={(inverted) => setState({inverted})}
                />
            </Typography>
            <Typography as="label" box="paragraph">
                Quiet{' '}
                <Checkbox checked={state.quiet} onValueChange={(quiet) => setState({quiet})} />
            </Typography>
            <Typography as="label" box="paragraph">
                Use max width{' '}
                <Checkbox
                    checked={state.useMaxWidth}
                    onValueChange={(useMaxWidth) => setState({useMaxWidth})}
                />
            </Typography>
        </Controls>
        <PageContent as={Paper} inverted={state.inverted} useMaxWidth={state.useMaxWidth}>
            <Typography as="h1" variant="header" box="paragraph" inverted={state.inverted}>
                <Typography
                    as="span"
                    variant="header"
                    box="inline"
                    quiet={state.quiet}
                    inverted={state.inverted}
                >
                    Quiet Header
                </Typography>{' '}
                Helvetica Bold{' '}
                <Typography
                    as="span"
                    variant="title"
                    box="inline"
                    quiet={state.quiet}
                    inverted={state.inverted}
                >
                    24/32
                </Typography>
            </Typography>
            <Typography as="h2" variant="title" box="paragraph" inverted={state.inverted}>
                <Typography
                    as="span"
                    variant="title"
                    box="inline"
                    quiet={state.quiet}
                    inverted={state.inverted}
                >
                    Quiet Title
                </Typography>{' '}
                Helvetica Bold{' '}
                <Typography
                    as="span"
                    variant="title"
                    box="inline"
                    quiet={state.quiet}
                    inverted={state.inverted}
                >
                    20/28
                </Typography>
            </Typography>
            <Typography as="h3" variant="section" box="paragraph" inverted={state.inverted}>
                <Typography
                    as="span"
                    variant="section"
                    box="inline"
                    quiet={state.quiet}
                    inverted={state.inverted}
                >
                    Quiet Section
                </Typography>{' '}
                Helvetica Bold
                <Typography
                    as="span"
                    variant="body"
                    box="inline"
                    quiet={state.quiet}
                    inverted={state.inverted}
                >
                    20/28
                </Typography>
            </Typography>
            <Typography as="p" box="paragraph" inverted={state.inverted}>
                <Typography as="span" box="inline" quiet={state.quiet} inverted={state.inverted}>
                    Quiet body text
                </Typography>{' '}
                Helvetica Normal
                <Typography
                    as="span"
                    variant="caption"
                    box="inline"
                    quiet={state.quiet}
                    inverted={state.inverted}
                >
                    14/20
                </Typography>
            </Typography>
            <Typography
                variant="caption"
                box="paragraph"
                quiet={state.quiet}
                inverted={state.inverted}
            >
                Quiet caption text – small body text Helvetica Normal 12/18
            </Typography>
            <Typography variant="caption" box="paragraph" inverted={state.inverted}>
                <Typography
                    as="span"
                    variant="caption"
                    box="inline"
                    quiet
                    inverted={state.inverted}
                >
                    Tissue:
                </Typography>{' '}
                Epithelium of Bronchiole
            </Typography>
            <Divider gap={4} variant="transparent" />
            <Typography box="paragraph" inverted={state.inverted}>
                A &lt;STRONG&gt; tag{' '}
                <strong>
                    is working well with <em>texts</em> and <em>captions</em>
                </strong>
            </Typography>
            <Typography box="paragraph" inverted={state.inverted}>
                <Typography quiet as="span" box="inline" inverted={state.inverted}>
                    Quiet is useful for secondary information
                </Typography>, while <em>Italic</em> is done with &lt;EM&gt; tag.
            </Typography>
        </PageContent>
    </Row>
</Frame>;
```
