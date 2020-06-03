/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createIcon} from '../components/icon';

const bookmarkPath = `
M6 5.99999C6 5.57707 6.10539 5.35171 6.22855 5.22855C6.35171 5.10539 6.57707 5 6.99999 5V4C6.42292 4 5.89828 4.14461 5.52144 4.52144C5.14461 4.89828 5 5.42292 5 5.99999H6ZM6.99999 5H13V4H6.99999V5ZM13 5C13.4229 5 13.6483 5.10539 13.7714 5.22855C13.8946 5.35171 14 5.57707 14 6H15C15 5.42293 14.8554 4.89829 14.4786 4.52145C14.1017 4.14461 13.5771 4 13 4V5ZM6 14.5V5.99999H5V14.5H6ZM15 14.5V6H14V14.5H15ZM5 14.5C5 14.9716 4.9944 15.5643 5.15066 16.0331C5.23355 16.2818 5.37313 16.5348 5.6149 16.7228C5.861 16.9142 6.16354 17 6.5 17V16C6.33646 16 6.264 15.9608 6.22885 15.9334C6.18937 15.9027 6.14145 15.8432 6.09934 15.7169C6.0056 15.4357 6 15.0284 6 14.5H5ZM6.5 17C6.74794 17 6.97025 16.9084 7.15105 16.8014C7.33444 16.693 7.50952 16.5481 7.672 16.3942C7.99467 16.0885 8.32723 15.6884 8.63411 15.3201C8.95223 14.9384 9.24467 14.5885 9.51575 14.3317C9.65015 14.2044 9.76413 14.1148 9.85808 14.0592C9.95463 14.0021 9.99794 14 10 14V13C9.75206 13 9.52975 13.0916 9.34895 13.1986C9.16556 13.307 8.99048 13.4519 8.828 13.6058C8.50533 13.9115 8.17277 14.3116 7.86589 14.6799C7.54777 15.0616 7.25533 15.4115 6.98425 15.6683C6.84985 15.7956 6.73587 15.8852 6.64192 15.9408C6.54537 15.9979 6.50206 16 6.5 16V17ZM10 14C10.0021 14 10.0454 14.0021 10.1419 14.0592C10.2359 14.1148 10.3499 14.2044 10.4843 14.3317C10.7553 14.5885 11.0478 14.9384 11.3659 15.3201C11.6728 15.6884 12.0053 16.0885 12.328 16.3942C12.4905 16.5481 12.6656 16.693 12.8489 16.8014C13.0297 16.9084 13.2521 17 13.5 17V16C13.4979 16 13.4546 15.9979 13.3581 15.9408C13.2641 15.8852 13.1501 15.7956 13.0157 15.6683C12.7447 15.4115 12.4522 15.0616 12.1341 14.6799C11.8272 14.3116 11.4947 13.9115 11.172 13.6058C11.0095 13.4519 10.8344 13.307 10.6511 13.1986C10.4703 13.0916 10.2479 13 10 13V14ZM13.5 17C13.8365 17 14.139 16.9142 14.3851 16.7228C14.6269 16.5348 14.7665 16.2818 14.8493 16.0331C15.0056 15.5643 15 14.9716 15 14.5H14C14 15.0284 13.9944 15.4357 13.9007 15.7169C13.8585 15.8432 13.8106 15.9027 13.7712 15.9334C13.736 15.9608 13.6635 16 13.5 16V17Z
`;

/**
 * Bordered bookmark icon
 */
export const BookmarkBorderedIcon = createIcon(
    <svg viewBox="0 0 20 20">
        <path d={bookmarkPath} className="gs-svg-icon-fill" />
    </svg>
);
