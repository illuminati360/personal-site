import React from 'react';
import Main from '../layouts/Main';

import Cell from '../components/mres/Cell';
import data from '../data/worlds';

const Worlds = () => (
  <Main
    title="Worlds"
    description="Learn about Luminosity's Worlds"
  >
    <article className="post" id="mres">
      <h3>Some of my worlds</h3>
      {data.map((mre) => (
        <Cell
          data={mre}
          key={mre.title}
        />
      ))}
    </article>
  </Main>
);

export default Worlds;
