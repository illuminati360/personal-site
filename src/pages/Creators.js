import React from 'react';
import Main from '../layouts/Main';

import Cell from '../components/mres/Cell';
import data from '../data/creators';

const Creators = () => (
  <Main
    title="Creators in Altspace"
    description="Learn about Creators in Altspace"
  >
    <article className="post" id="creators">
      {data.map((creator) => (
        <Cell
          data={creator}
          key={creator.title}
        />
      ))}
    </article>
  </Main>
);

export default Creators;
