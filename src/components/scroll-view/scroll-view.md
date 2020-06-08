```js
const {DownloadIcon} = require('../../icons/download-icon');
const {HelpIcon} = require('../../icons/help-icon');

const versions = [
    {
        label: 'v74',
        description: 'test postgres',
        author: {
            name: 'Anatoly Nikiforov',
            email: 'anatoly.nikiforov@genestack.com'
        }
    },
    {
        label: 'v. 73',
        description: 'qwerty\ndratutu',
        author: {
            name: 'Anatoly Nikiforov',
            email: 'anatoly.nikiforov@genestack.com'
        }
    },
    {
        label: 'ф',
        description: 'ф',
        author: {
            name: 'Leonid Chistov',
            email: 'leonid.chistov@genestack.com'
        }
    },
    {
        label: 'label_Integration test temp  version 2020-04-06T08:53:19.762Z',
        description: 'description_Integration test temp  version 2020-04-06T08:53:19.762Z',
        author: {
            name: 'DevOps',
            email: 'devops@example.com'
        }
    },
    {
        label: 'test 050320',
        description: 'Lana test',
        author: {
            name: 'Lana Shatunova',
            email: 'svetlana.shatunova@genestack.com'
        }
    },
    {
        label: 'New from 1232',
        description: '123',
        author: {
            name: 'Lana Shatunova',
            email: 'svetlana.shatunova@genestack.com'
        }
    },
    {
        label:
            'Supported features: – Pathway database contents accessible to Knowledge Base query engine – Service interface flexible enough so that other usages of pathway data can be supported without major rework – Based on new Genestack architecture – It is possible',
        description:
            'Supported features: – Pathway database contents accessible to Knowledge Base query engine – Service interface flexible enough so that other usages of pathway data can be supported without major rework – Based on new Genestack architecture – It is possible to extend solution to databases other than Reactome – Support updating pathway databases to newer versions Inital Release. Supported features: – Pathway database contents accessible to Knowledge Base query engine – Service interface flexible enough so that other usages of pathway data can be supported without major rework – Based on new Genestack architecture – It is possible to extend solution to databases other than Reactome – Support updating pathway databases to newer versionsSupported features: – Pathway database contents accessible to Knowledge Base query engine – Service interface flexible enough so that other usages of pathway data can be supported without major rework – Based on new Genestack architecture – It is possible to extend solution to databases other than Reactome – Support updating pathway databases to newer versions Inital Release. Supported features: – Pathway database contents accessible to Knowledge Base query engine – Service interface flexible enough so that other usages of pathway data can be supported without major rework – Based on new Genestack architecture – It is possible to extend solution to databases other than Reactome – Support updating pathway databases to newer versions',
        author: {
            name: 'Gleb Grebennikov',
            email: 'gleb.grebennikov@genestack.com'
        }
    },
    {
        label: 'label_Integration test temp  version 2020-02-09T23:59:52.215Z',
        description: 'description_Integration test temp  version 2020-02-09T23:59:52.215Z',
        author: {
            name: 'DevOps',
            email: 'devops@example.com'
        }
    },
    {
        label: 'label_Integration test temp  version 2020-02-09T23:59:51.215Z',
        description: 'description_Integration test temp  version 2020-02-09T23:59:51.448Z',
        author: {
            name: 'DevOps',
            email: 'devops@example.com'
        }
    },
    {
        label: 'label_Integration test temp  version 2020-02-09T23:59:47.944Z',
        description: 'description_Integration test temp  version 2020-02-09T23:59:47.953Z',
        author: {
            name: 'DevOps',
            email: 'devops@example.com'
        }
    },
    {
        label: 'label_Integration test temp  version 2020-02-09T22:05:03.325Z',
        description: 'description_Integration test temp  version 2020-02-09T22:05:03.325Z',
        author: {
            name: 'DevOps',
            email: 'devops@example.com'
        }
    },
    {
        label: 'label_Integration test temp  version 2020-02-09T22:05:02.197Z',
        description: 'description_Integration test temp  version 2020-02-09T22:05:02.469Z',
        author: {
            name: 'DevOps',
            email: 'devops@example.com'
        }
    },
    {
        label: 'label_Integration test temp  version 2020-02-09T22:04:57.079Z',
        description: 'description_Integration test temp  version 2020-02-09T22:04:57.093Z',
        author: {
            name: 'DevOps',
            email: 'devops@example.com'
        }
    },
    {
        label: 'xxx',
        description: 'xx',
        author: {
            name: 'Leonid Chistov',
            email: 'leonid.chistov@genestack.com'
        }
    },
    {
        label: 'Evning star',
        description: 'Demo',
        author: {
            name: 'Gleb Grebennikov',
            email: 'gleb.grebennikov@genestack.com'
        }
    },
    {
        label: 'Hypocenter',
        description: 'Demonstration – only commit',
        author: {
            name: 'Gleb Grebennikov',
            email: 'gleb.grebennikov@genestack.com'
        }
    },
    {
        label: 'Ground Zero',
        description:
            'Initial and very first global version (not relevant, except for demo purposes)\n\n',
        author: {
            name: 'Gleb Grebennikov',
            email: 'gleb.grebennikov@genestack.com'
        }
    },
    {
        label: 'Test 130120 3',
        description: 'brbre',
        author: {
            name: 'Lana Shatunova',
            email: 'svetlana.shatunova@genestack.com'
        }
    },
    {
        label: 'Test 130120',
        description: '1',
        author: {
            name: 'Lana Shatunova',
            email: 'svetlana.shatunova@genestack.com'
        }
    },
    {
        label: 'Version created as a test after global version creation was broken',
        description: 'Simple test of global versions creation',
        author: {
            name: 'Leonid Chistov',
            email: 'leonid.chistov@genestack.com'
        }
    },
    {
        label:
            'Latinnamesusedinthisindexoriginatefromhistoricliteratureandinmanycasesdonotcorrespondtomodernbotanicalnomenclature.',
        description:
            'Latin names used in this index originate from historic literature and in many cases do not correspond to modern botanical nomenclature.',
        author: {
            name: 'Elena Zimina',
            email: 'elena.zimina@genestack.com'
        }
    },
    {
        label:
            'v. 0.18 Latin names used in this index originate from historic literature and in many cases do not correspond to modern botanical nomenclature.',
        description: 'test',
        author: {
            name: 'Elena Zimina',
            email: 'elena.zimina@genestack.com'
        }
    },
    {
        label: 'v. 0.17 Long name of New Knowledge Base version',
        description: '-',
        author: {
            name: 'Elena Zimina',
            email: 'elena.zimina@genestack.com'
        }
    },
    {
        label: 'v. 0.16 Long name of New Knowledge Base version',
        description: 'Test',
        author: {
            name: 'Elena Zimina',
            email: 'elena.zimina@genestack.com'
        }
    },
    {
        label: 'v. 0.15',
        description: 'Description of the version',
        author: {
            name: 'Elena Zimina',
            email: 'elena.zimina@genestack.com'
        }
    },
    {
        label: 'Test long name of Knowledge Base version',
        description:
            'Support for signal data queries and auto-tests on it. We now have tests covering the response content (both the signal data and their associated metadata fields) for each parameter.',
        author: {
            name: 'Elena Zimina',
            email: 'elena.zimina@genestack.com'
        }
    },
    {
        label: 'v. 0.13',
        description:
            'Supported features: – Pathway database contents accessible to Knowledge Base query engine\n– Service interface flexible enough so that other usages of pathway data can be supported without major rework\n– Based on new Genestack architecture\n– It is possible to extend solution to databases other than Reactome\n– Support updating pathway databases to newer versions\nInital Release. Supported features: – Pathway database contents accessible to Knowledge Base query engine\n– Service interface flexible enough so that other usages of pathway data can be supported without major rework\n– Based on new Genestack architecture\n– It is possible to extend solution to databases other than Reactome\n– Support updating pathway databases to newer versions',
        author: {
            name: 'Elena Zimina',
            email: 'elena.zimina@genestack.com'
        }
    },
    {
        label: 'v. 0.12',
        description:
            'Support for signal data queries and auto-tests on it. We now have tests covering the response content (both the signal data and their associated metadata fields) for each parameter.',
        author: {
            name: 'Elena Zimina',
            email: 'elena.zimina@genestack.com'
        }
    },
    {
        label: 'v. 0.11 test version long name',
        description:
            'Test version AUTO SYNONYM→PREFERRED LABEL REPLACEMENT: For a given metadata field  (e.g. Organism), if a metadata value (e.g. Homo sapiens)is known to be the synonym of a preferred label in the RTS dictionary assigned to the field (e.g. Human), the script will automatically replace the synonym with the preferred label, without having to take in explicit curation rules specify the swap. ',
        author: {
            name: 'Elena Zimina',
            email: 'elena.zimina@genestack.com'
        }
    },
    {
        label: 'v. 1.4117',
        description: 'testing',
        author: {
            name: 'Lana Shatunova',
            email: 'svetlana.shatunova@genestack.com'
        }
    }
];

const ButtonWDialog = () => {
    const [dialogOpened, setDialogOpened] = React.useState(false);

    return (
        <>
            <Button intent="accent" onClick={() => setDialogOpened(true)} style={{width: '100%'}}>
                Open dialog
            </Button>

            <Dialog
                open={dialogOpened}
                onClose={() => setDialogOpened(false)}
                size="large"
                scrollable
            >
                <DialogHeader>
                    <Typography variant="header">Knowledge Base versions</Typography>
                </DialogHeader>
                <DialogBody as={ScrollView}>
                    <WithSeparator separator={<Divider variant="transparent" gap={2} />}>
                        {versions.map((version, i) => (
                            <React.Fragment key={i}>
                                <Typography variant="section" style={{wordWrap: 'break-word'}}>
                                    <strong>{version.label}</strong>
                                </Typography>

                                <Typography>
                                    April 22, 14:53 by{' '}
                                    <i>{version.author.name || version.author.email}</i>
                                </Typography>
                                <Typography
                                    variant="caption"
                                    quiet
                                    style={{wordWrap: 'break-word'}}
                                >
                                    {version.description}
                                </Typography>
                            </React.Fragment>
                        ))}
                    </WithSeparator>
                </DialogBody>
            </Dialog>
        </>
    );
};

<Controls style={{alignItems: 'flex-start'}}>
    <ControlsItem style={{width: 200}}>
        <PageContent as={Paper}>
            <PageFullWidth>
                <List as={ScrollView} style={{overflow: 'auto', height: 150}}>
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
                    <ListItem as="label" interactive prepend={<input type="radio" name="foo" />}>
                        Brain
                    </ListItem>
                    <ListItem as="label" interactive prepend={<input type="radio" name="foo" />}>
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
            <ButtonWDialog />
        </PageContent>
    </ControlsItem>

    <ControlsItem shrink>
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

            <PageFullWidth as={ScrollView} style={{overflow: 'auto', height: 150}}>
                <PageContent>
                    <Typography box="paragraph">
                        Morphological changes in the small airway epithelium are the first
                        histopathological manifestations of smoking-induced lung disease. Gene
                        expression profiling using microarrays has permitted the identification of
                        changes in the small airway epithelium of chronic cigarette smokers who have
                        normal pulmonary function.
                    </Typography>
                    <Typography box="paragraph">
                        The availability of high throughput, massively parallel RNA sequencing
                        (RNA-Seq) of the entire transcriptome opens the possibility of a higher
                        sensitivity and more detailed characterization of the response of the small
                        airway epithelium to smoking.
                    </Typography>

                    <Typography variant="section" box="paragraph">
                        Epithelium of Bronchiole Basic information
                    </Typography>
                    <Typography box="paragraph">
                        Epithelial cells were obtained by fiberoptic bronchoscopy and brushing of
                        healthy smokers (n=6) and n=5 healthy nonsmokers, all with normal lung
                        function and chest x-rays. RNA was extracted and used for massively parallel
                        sequencing of PolyA selected transcripts using the Illumina Genome Snalyzer
                        II.
                    </Typography>
                </PageContent>
            </PageFullWidth>

            <Typography variant="caption" box="paragraph" quiet>
                The availability of high throughput, massively parallel RNA sequencing (RNA-Seq) of
                the entire transcriptome opens the possibility of a higher sensitivity and more
                detailed characterization of the response of the small airway epithelium to smoking.
            </Typography>
        </PageContent>
    </ControlsItem>
</Controls>;
```
