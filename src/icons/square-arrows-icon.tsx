/*
 * Copyright (c) 2011-2022 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import * as React from "react";

import { createIcon } from "../components/icon";

// tslint:disable max-line-length

/**
 * Simple bottom arrow and a line below It
 */
export const SquareArrowsIcon = createIcon(
  <svg viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 7v6.6c0 .84 0 1.26.163 1.58a1.5 1.5 0 0 0 .656.656c.32.164.74.164 1.581.164H9a1 1 0 0 0 0-2H6.8c-.28 0-.42 0-.527-.055a.5.5 0 0 1-.219-.218C6 13.62 6 13.48 6 13.2V7l.999 1c.623.623 1.35.271 1.54.08.192-.191.632-.905-.078-1.615L5 3.495l-3.55 3.033c-.482.482-.288 1.219 0 1.508.29.289 1.01.49 1.536-.036L4 7Zm12.006 5.995V6.4c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656C14.867 4 14.447 4 13.607 4h-2.6a1 1 0 1 0 0 2h2.2c.28 0 .42 0 .526.054a.5.5 0 0 1 .219.219c.054.107.054.247.054.527v6.195L13.013 12a1.113 1.113 0 0 0-1.541-.08c-.191.191-.632.905.078 1.615l3.457 2.965 3.516-3c.483-.482.29-1.219 0-1.508-.289-.29-1.01-.49-1.535.036l-.982.967Z"
      className="gs-svg-icon-fill"
    />
  </svg>
);
