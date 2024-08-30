import * as React from 'react';

import * as styles from './button.module.css';

// I use svg here instead of css so that I can apply so very convenient gs-svg-icon-fill class
export function SubmenuIndicator() {
    return (
        <svg
            width="4"
            height="4"
            viewBox="0 0 4 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.submenuIndicator}
        >
            <path d="M4 4V0L0 4H4Z" className="gs-svg-icon-fill" />
        </svg>
    );
}
