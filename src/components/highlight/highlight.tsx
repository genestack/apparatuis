/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {escapeRegExp} from '../../utils/escape-reg-exp';

interface MarkProps {
    key: number;
    children: string;
}

/** Highlight public properties */
export interface Props {
    /** Word or words to mark */
    words: string | string[];
    /** Custom mark renderer */
    renderMark?: (props: MarkProps) => React.ReactNode;
    children: string;
}

const DEFAULT_RENDER_MARK = (props: MarkProps) => <mark {...props} />;

/** Highlights words in children string */
export const Highlight = (props: Props) => {
    const {renderMark = DEFAULT_RENDER_MARK} = props;

    const words = (typeof props.words === 'string' ? [props.words] : props.words)
        .map((word) => word.trim())
        .filter(Boolean);

    // nothing to mark
    if (!words.length) {
        return <React.Fragment>{props.children}</React.Fragment>;
    }

    const wordsReg = new RegExp(`(${words.map(escapeRegExp).join('|')})`, 'ig');
    const parts = props.children.split(wordsReg);

    return (
        <React.Fragment>
            {parts.map((part, index) => {
                const matchedWord = words.find(
                    (word) => word.toLocaleLowerCase() === part.toLocaleLowerCase()
                );

                if (matchedWord) {
                    return renderMark({key: index, children: part});
                }

                return part;
            })}
        </React.Fragment>
    );
};