import React from 'react';
import Main from '../layouts/Main';
import Table from '../components/Stats/Table';

import Cell from '../components/mres/Cell';
import data from '../data/mres';

const Mres = () => (
  <Main
    title="MRE Apps"
    description="Learn about Luminosity's MRE APPs"
  >
    <article className="post" id="mres">
      <h3>Table of Contents</h3>
      <Table data={data.map((mre, i) => ({
        key: `${i}th`,
        label: mre.title,
        value: mre.subtitle,
        link: mre.link,
      }))}
      />
      <h3>Details</h3>
      {data.map((mre) => (
        <Cell
          data={mre}
          key={mre.title}
        />
      ))}
    </article>
  </Main>
);

export default Mres;
