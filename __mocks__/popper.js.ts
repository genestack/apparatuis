/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
/** React Popper (c), MIT Licensed @see https://git.io/fhAG1 */

// tslint:disable-next-line
import PopperJs from 'popper.js';

// tslint:disable-next-line
export default class Popper {
    public static placements = PopperJs.placements;

    public state = {
        isDestroyed: false
    };

    constructor(reference: any, popper: any, options: any = {}) {
        const modifiers = Object.keys(options.modifiers)
            .map((name: any) => ({
                name,
                ...options.modifiers[name]
            }))
            .sort((a, b) => a.order - b.order);

        const update = () => {
            const data = {
                placement: options.placement,
                arrowStyles: {},
                offsets: {
                    popper: {
                        position: 'absolute'
                    },
                    reference: {}
                }
            };
            modifiers.forEach((m) => {
                if (m.enabled && m.fn) {
                    m.fn(data, m);
                }
            });
        };
        update();

        return {
            reference,
            popper,
            options: {...PopperJs.Defaults, ...options},
            state: this.state,
            destroy: () => (this.state.isDestroyed = true),
            scheduleUpdate: () => {
                update();
            }
        } as any;
    }
}
