```js
const {DarkContext} = require('../../utils/dark-context');
const {DownloadIcon} = require('../../icons/download-icon');
const {HelpIcon} = require('../../icons/help-icon');

const organismSampleSet = [
    ['Homo sapiens', '7 832'],
    ['Mus musculus', '319'],
    ['Arabidopsis thaliana', '155'],
    ['Zea mays', '63'],
    ['Gallus gallus', '40'],
    ['Triticum aestivum', '35'],
    ['Macaca mulatta', '30'],
    ['Pan troglodytes', '28'],
    ['Oryza sativa', '24'],
    ['Oryza sativa Japonica Group', '22'],
    ['Drosophila melanogaster', '19'],
    ['Solanum lycopersicum', '18'],
    ['Bos taurus', '17'],
    ['Rattus norvegicus', '16'],
    ['synthetic construct', '10'],
    ['Monodelphis domestica', '8'],
    ['Saccharomyces cerevisiae', '7'],
    ['Pan paniscus', '6'],
    ['Caenorhabditis elegans', '5'],
    ['Gorilla gorilla', '5'],
    ['Macaca fascicularis', '4'],
    ['Ornithorhynchus anatinus', '4'],
    ['Oryctolagus cuniculus', '4'],
    ['Sus scrofa', '4'],
    ['Zea mays subsp. mays', '4'],
    ['Aegilops tauschii', '3'],
    ['Callithrix jacchus', '3'],
    ['Canis lupus familiaris', '3'],
    ['Danio rerio', '3'],
    ['Escherichia coli', '3'],
    ['Oryza sativa Indica Group', '3'],
    ['Schizosaccharomyces pombe', '3'],
    ['Candida albicans', '2'],
    ['Heterocephalus glaber', '2'],
    ['Homo sapiens x Mus musculus hybrid cell line', '2'],
    ['other sequences', '2'],
    ['Pongo pygmaeus', '2'],
    ['Triticum urartu', '2'],
    ['Tupaia belangeri', '2'],
    ['unidentified plasmid', '2'],
    ['Xenopus tropicalis', '2'],
    ['Aegilops speltoides', '1'],
    ['Anolis carolinensis', '1'],
    ['Balaenoptera borealis', '1'],
    ['Brachypodium distachyon', '1'],
    ['Canis familiaris', '1'],
    ['Cavia porcellus', '1'],
    ['Chlorocebus aethiops sabaeus', '1'],
    ['Cucumber mosaic virus', '1'],
    ['Cymbidium ringspot virus', '1'],
    ['Dama dama', '1'],
    ['Dasypus novemcinctus', '1'],
    ['Daubentonia madagascariensis', '1'],
    ['Delphinus delphis', '1'],
    ['Echinochloa glabrescens', '1'],
    ['Equisetum arvense', '1'],
    ['Felis catus', '1'],
    ['Haemophilus influenzae', '1'],
    ['hman', '1'],
    ['Homo sapien', '1'],
    ['homo sapiens', '1'],
    ['human', '1'],
    ['Hylobates lar', '1'],
    ['Ictidomys tridecemlineatus', '1'],
    ['Influenza A virus (A/Brisbane/10/2007(H3N2))', '1'],
    ['Influenza A virus (A/Perth/16/2009(H3N2))', '1'],
    ['Influenza A virus (A/Udorn/307/1972(H3N2))', '1'],
    ['Influenza A virus (A/WSN/1933(H1N1))', '1'],
    ['Japanese rice fish', '1'],
    ['Japanses rice fish', '1'],
    ['Lagenorhynchus albirostris', '1'],
    ['Leishmania donovani', '1'],
    ['Lemur catta', '1'],
    ['Macaca nemestrina', '1'],
    ['Marchantia polymorpha subsp. polymorpha', '1'],
    ['Melon necrotic spot virus', '1'],
    ['Mesocricetus auratus', '1'],
    ['Mesoplodon bidens', '1'],
    ['Microcebus murinus', '1'],
    ['mixed libraries', '1'],
    ['mixed sample', '1'],
    ['Mus', '1'],
    ['Mus musculus castaneus', '1'],
    ['Mustela putorius furo', '1'],
    ['Neisseria gonorrhoeae', '1'],
    ['Neovison vison', '1'],
    ['Nicotiana benthamiana', '1'],
    ['Nycticebus coucang', '1'],
    ['Oryza nivara', '1'],
    ['Oryza punctata', '1'],
    ['Oryza rufipogon', '1'],
    ['Oryza sativa Indica group', '1'],
    ['Oryza sp.', '1'],
    ['Otolemur garnettii', '1'],
    ['Pepper mild mottle virus', '1'],
    ['Physcomitrella patens', '1'],
    ['Plasmodium berghei', '1'],
    ['Pongo abelii', '1'],
    ['Potato virus X', '1'],
    ['Pseudomonas syringae pv. tomato', '1'],
    ['Pseudomonas syringae pv. tomato str. DC3000', '1'],
    ['Salmonella enterica', '1'],
    ['Salmonella enterica subsp. enterica serovar Typhi str. Ty2', '1'],
    ['Sarcophilus harrisii', '1'],
    ['Schmidtea mediterranea', '1'],
    ['Schrenkiella parvula', '1'],
    ['Selaginella moellendorffii', '1'],
    ['Solanum habrochaites', '1'],
    ['Solanum lycopersicum L.', '1'],
    ['Solanum pennellii', '1'],
    ['Sorghum bicolor', '1'],
    ['Staphylococcus aureus subsp. aureus COL', '1'],
    ['Tobacco rattle virus', '1'],
    ['Tomato yellow leaf curl virus', '1'],
    ['Trichophyton rubrum', '1'],
    ['Triticum aestivum/Septoria tritici mixed cDNA library', '1'],
    ['Triticum dicoccoides', '1'],
    ['Triticum durum', '1'],
    ['Trypanosoma cruzi', '1'],
    ['Turnip mosaic virus', '1'],
    ['Watermelon mosaic virus', '1'],
    ['Xenopus laevis', '1'],
    ['Zea mays subsp. mexicana', '1'],
    ['Zea mays subsp. parviglumis', '1'],
    ['Zymoseptoria tritici IPO323', '1']
];

const ButtonWDialog = ({showScrollbars}) => {
    const [dialogOpened, setDialogOpened] = React.useState(false);

    return (
        <>
            <Button intent="accent" onClick={() => setDialogOpened(true)} style={{width: '100%'}}>
                Open dialog
            </Button>

            <DarkContext.Provider value={true}>
                <Dialog
                    open={dialogOpened}
                    onClose={() => setDialogOpened(false)}
                    size="medium"
                    scrollable
                >
                    <DialogHeader>
                        <Typography variant="header">Typography</Typography>
                    </DialogHeader>
                    <DialogBody
                        as={ScrollView}
                        showScrollbars={showScrollbars ? 'always' : 'default'}
                        style={{height: 300}}
                    >
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
                            Morphological changes in the small airway epithelium are the first
                            histopathological manifestations of smoking-induced lung disease. Gene
                            expression profiling using microarrays has permitted the identification
                            of changes in the small airway epithelium of chronic cigarette smokers
                            who have normal pulmonary function.
                        </Typography>
                        <Typography box="paragraph">
                            The availability of high throughput, massively parallel RNA sequencing
                            (RNA-Seq) of the entire transcriptome opens the possibility of a higher
                            sensitivity and more detailed characterization of the response of the
                            small airway epithelium to smoking.
                        </Typography>
                        <Typography variant="section" box="paragraph">
                            Epithelium of Bronchiole Basic information
                        </Typography>
                        <Typography box="paragraph">
                            Epithelial cells were obtained by fiberoptic bronchoscopy and brushing
                            of healthy smokers (n=6) and n=5 healthy nonsmokers, all with normal
                            lung function and chest x-rays. RNA was extracted and used for massively
                            parallel sequencing of PolyA selected transcripts using the Illumina
                            Genome Snalyzer II.
                        </Typography>

                        <Typography variant="caption" box="paragraph">
                            The availability of high throughput, massively parallel RNA sequencing
                            (RNA-Seq) of the entire transcriptome opens the possibility of a higher
                            sensitivity and more detailed characterization of the response of the
                            small airway epithelium to smoking.
                        </Typography>
                    </DialogBody>
                </Dialog>
            </DarkContext.Provider>
        </>
    );
};

initialState = {
    scrollbarsAlwaysShown: false
};

handleScrollbarsModeCheckboxChange = (event) =>
    setState({scrollbarsAlwaysShown: event.currentTarget.checked});

<>
    <PageContent>
        <Controls as="label">
            <ControlsItem>
                <input
                    type="checkbox"
                    checked={state.scrollbarsAlwaysShown}
                    onChange={handleScrollbarsModeCheckboxChange}
                />
            </ControlsItem>
            <ControlsItem>
                <Typography>Always show scroll bars</Typography>
            </ControlsItem>
        </Controls>
    </PageContent>

    <Controls style={{alignItems: 'flex-start'}}>
        <ControlsItem style={{width: 200}}>
            <PageContent as={Paper}>
                <PageFullWidth>
                    <List
                        as={ScrollView}
                        showScrollbars={state.scrollbarsAlwaysShown ? 'always' : 'default'}
                        style={{overflow: 'auto', height: 150}}
                    >
                        <ListItem>
                            <Typography variant="section">Tissue:</Typography>
                        </ListItem>
                        <ListItem
                            as="label"
                            interactive
                            prepend={<input type="checkbox" />}
                            append={<HelpIcon />}
                        >
                            <TextLabel caption="12">Liver</TextLabel>
                        </ListItem>
                        <ListItem
                            as="label"
                            interactive
                            prepend={<input type="checkbox" />}
                            append={
                                <Typography as="span" quiet>
                                    99999
                                </Typography>
                            }
                        >
                            Very long name of tissue
                        </ListItem>
                        <ListItem
                            as="label"
                            interactive
                            wrap
                            prepend={<input type="checkbox" />}
                            append={
                                <Typography as="span" quiet>
                                    3
                                </Typography>
                            }
                        >
                            <TextLabel wrap>Very long name of tissue. Few lines</TextLabel>
                        </ListItem>
                        <ListItem
                            disabled
                            prepend={<input type="checkbox" disabled />}
                            append={
                                <Typography as="span" quiet>
                                    3
                                </Typography>
                            }
                        >
                            Bone
                        </ListItem>
                        <ListItem as="label" interactive prepend={<input type="checkbox" />}>
                            Leaf
                        </ListItem>
                        <Divider />
                        <ListItem href="#" interactive>
                            I am a link
                        </ListItem>
                        <ListItem
                            as="label"
                            interactive
                            prepend={<input type="radio" name="foo" />}
                        >
                            Brain
                        </ListItem>
                        <ListItem
                            as="label"
                            interactive
                            prepend={<input type="radio" name="foo" />}
                        >
                            Lymph Node
                        </ListItem>
                        <ListItem
                            as="label"
                            interactive
                            prepend={<DownloadIcon />}
                            subtitle="Downloading of big file could overload your network"
                        >
                            <TextLabel caption="145 MB">Download</TextLabel>
                        </ListItem>
                    </List>
                </PageFullWidth>
            </PageContent>

            <Divider variant="transparent" />

            <PageContent as={Paper}>
                <ButtonWDialog showScrollbars={state.scrollbarsAlwaysShown} />
            </PageContent>
        </ControlsItem>

        <ControlsItem grow>
            <Paper>
                <Controls style={{alignItems: 'flex-start'}}>
                    <ControlsItem grow>
                        <List
                            as={ScrollView}
                            showScrollbars={state.scrollbarsAlwaysShown ? 'always' : 'default'}
                            style={{
                                overflow: 'auto',
                                height: 259,
                                backgroundColor: '#e6e9eb',
                                marginTop: 0,
                                marginBottom: 0
                            }}
                        >
                            <Divider variant="transparent" />
                            <ListItem>
                                <Typography variant="section">Organism:</Typography>
                            </ListItem>
                            {organismSampleSet.map(([title, append]) => (
                                <ListItem
                                    key={title}
                                    append={
                                        <Typography quiet as="span">
                                            {append}
                                        </Typography>
                                    }
                                >
                                    <TextLabel>{title}</TextLabel>
                                </ListItem>
                            ))}
                            <Divider variant="transparent" />
                        </List>
                    </ControlsItem>
                    <ControlsItem grow>
                        <ScrollView
                            showScrollbars={state.scrollbarsAlwaysShown ? 'always' : 'default'}
                            style={{overflow: 'auto', height: 259}}
                        >
                            <PageContent>
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
                                    Morphological changes in the small airway epithelium are the
                                    first histopathological manifestations of smoking-induced lung
                                    disease. Gene expression profiling using microarrays has
                                    permitted the identification of changes in the small airway
                                    epithelium of chronic cigarette smokers who have normal
                                    pulmonary function.
                                </Typography>
                                <Typography box="paragraph">
                                    The availability of high throughput, massively parallel RNA
                                    sequencing (RNA-Seq) of the entire transcriptome opens the
                                    possibility of a higher sensitivity and more detailed
                                    characterization of the response of the small airway epithelium
                                    to smoking.
                                </Typography>

                                <Typography variant="section" box="paragraph">
                                    Epithelium of Bronchiole Basic information
                                </Typography>
                                <Typography box="paragraph">
                                    Epithelial cells were obtained by fiberoptic bronchoscopy and
                                    brushing of healthy smokers (n=6) and n=5 healthy nonsmokers,
                                    all with normal lung function and chest x-rays. RNA was
                                    extracted and used for massively parallel sequencing of PolyA
                                    selected transcripts using the Illumina Genome Snalyzer II.
                                </Typography>

                                <Typography variant="caption" box="paragraph" quiet>
                                    The availability of high throughput, massively parallel RNA
                                    sequencing (RNA-Seq) of the entire transcriptome opens the
                                    possibility of a higher sensitivity and more detailed
                                    characterization of the response of the small airway epithelium
                                    to smoking.
                                </Typography>
                            </PageContent>
                        </ScrollView>
                    </ControlsItem>
                </Controls>
            </Paper>
        </ControlsItem>
    </Controls>
</>;
```
