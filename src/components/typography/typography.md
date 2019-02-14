```js
const {Typography} = require('.');

class CustomComponent extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <b>Label: </b>
                {this.props.children}
            </div>
        );
    }
}

<React.Fragment>
    <Typography variant="headline" accent="primary" box="paragraph">
        Typography Headline{' '}
        <Typography variant="body" box="inline" accent="secondary">
            (with some helper)
        </Typography>
    </Typography>

    <Typography variant="title" box="paragraph">
        Title{' '}
        <Typography variant="body" box="inline" accent="primary">
            (with loud text)
        </Typography>
    </Typography>

    <div style={{background: 'rgba(0,0,0,0.8)', overflow: 'hidden'}}>
        <Typography variant="subtitle" box="paragraph" inversed>
            Fear is the path to the dark side.{' '}
            <Typography variant="caption" box="inline" accent="secondary" inversed>
                (Yoda)
            </Typography>
        </Typography>
    </div>

    <Typography variant="caption" box="paragraph">
        Typography caption
    </Typography>

    <Typography box="paragraph">
        I am a body text with some{' '}
        <Typography box="inline" accent="primary">
            primary
        </Typography>{' '}
        and{' '}
        <Typography box="inline" accent="secondary">
            secondary
        </Typography>{' '}
        words.
    </Typography>

    <Typography box="paragraph">
        Also I can be{' '}
        <Typography as="button" variant="title" box="inline">
            a button
        </Typography>
        {' or '}
        <Typography as="a" href="/#typography" variant="subtitle" box="inline" accent="secondary">
            an anchor
        </Typography>
    </Typography>

    <Typography box="paragraph" accent="secondary" as={CustomComponent}>
        Custom Component Example
    </Typography>

    <Typography box="paragraph" as={(props) => <a href="." {...props} />}>
        Render Prop Example
    </Typography>
</React.Fragment>;
```
