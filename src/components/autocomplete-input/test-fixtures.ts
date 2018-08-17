/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */


const data = [
  'Don Perry',
  'Olivia Nguyen',
  'Donald Edwards',
  'Jeremiah Phelps',
  'Virgie Jefferson',
  'Mitchell Schultz',
  'Aiden Dunn',
  'Rhoda Martin',
  'William Burns',
  'Brett Haynes',
  'Steve Lyons',
  'Chase Lynch',
  'Troy Walsh',
  'Adrian Fox',
  'Aiden Dixon',
  'Tony George',
  'Mabelle Martinez',
  'Dollie Cunningham',
  'Melvin Williams',
  'Harriet Carroll'
].sort((a, b) => a.localeCompare(b));

const fetchFromSomewhere = (value) => new Promise((resolve, reject) => {
    const timeout = 200;
    const items = data.filter(item => item.includes(value)).splice(0, 5);
    setTimeout(
        () =>
            Math.random() > 0.9 ?
            reject() :
            resolve(items),
        timeout
    );
});

export default fetchFromSomewhere;
