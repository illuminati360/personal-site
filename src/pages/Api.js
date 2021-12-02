import React from 'react';
import Main from '../layouts/Main';
import Table from '../components/Stats/Table';

import Cell from '../components/Api/Cell';
import data from '../data/mres';

const Apis = () => (
  <Main
    title="Apis"
    description="Api"
  >
    <article className="post" id="Apis">
      <h3>Table of Contents</h3>
      <Table data={data.map((api, i) => ({
        key: `${i}th`,
        label: api.title,
        value: api.subtitle,
        link: api.link,
      }))}
      />
      <h3>Details</h3>
      {data.map((api) => (
        <Cell
          data={api}
          key={api.title}
        />
      ))}
    </article>
  </Main>
);

export default Apis;
