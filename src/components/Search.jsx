import React, {useState} from 'react';
import {withApollo} from 'react-apollo';
import gql from 'graphql-tag';
import Link from './Link';

const Search = props => {

  const [links, setLinks] = useState([]);
  const [filter, setFilter] = useState('');

  const _executeSearch = async () => {

  }

  return (
    <div>
      <div>
        Search
        <input type='text' onChange={(e) => setFilter(e.currentTarget.value)} />
        <button onClick={() => _executeSearch()}>OK</button>
      </div>
      {links.map((link, index) => <Link key={link.id} link={link} index={index} />)}
    </div>
  );

}

export default withApollo(Search);