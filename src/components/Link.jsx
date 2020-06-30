import React from 'react';
import { AUTH_TOKEN } from '../constant';
import { timeDifferenceForDate } from '../utils';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const Link = ({link, index, updateStoreAfterVote}) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const VOTE_MUTATION = gql`
    mutation VoteMutation($linkId: ID!){
      vote(linkId: $linkId){
        id
        link {
          id
          votes {
            id
            user {
              id
            }
          }
        }
        user {
          id
        }
      }
    }
  `;

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index +1}.</span>
        {authToken && (
          <Mutation 
            mutation={VOTE_MUTATION} 
            variables={{linkId: link.id}}
            update={(store, {data: {vote}}) => updateStoreAfterVote(store, vote, link.id)}
            >
            {voteMutation => (
              <div className="ml1 gray fl1" onClick={voteMutation}>
              ▲
            </div>
            )}
          </Mutation>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        <div className="f6 lhcopy gray">
          {link.votes.length} votes | by{''}
          {link.postedBy
           ? link.postedBy.name
           : 'Unknown'}{' '}
           {timeDifferenceForDate(link.createdAt)}
        </div>
      </div>
    </div>
  );
}

export default Link;