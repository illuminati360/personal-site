import React from 'react';
import Main from '../layouts/Main';

import Cell from '../components/mres/Cell';
import data from '../data/kits';

const Kits = () => (
  <Main
    title="Kits"
    description="Learn about Luminosity's Kits"
  >
    <article className="post" id="mres">
      <h3>Some of my kits</h3>
      {data.map((mre) => (
        <Cell
          data={mre}
          key={mre.title}
        />
      ))}
    </article>
  </Main>
);

export default Kits;
