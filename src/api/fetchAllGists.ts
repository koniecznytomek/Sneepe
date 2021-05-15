import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addGists } from '../slices/gists/gistsSlice';
import { gql, useQuery } from '@apollo/client';
import { addCollections } from '../slices/collections/collectionsSlice';

const FetchAllGists = () => {
  const [all, setAll] = useState<any>();
  const [gists, setGists] = useState<any>([]);

  const { data, fetchMore } = useQuery(ALL_GISTS);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!all && data) {
      setAll(data);
      setGists(data.viewer.gists.nodes);
    }

    if (all && all.viewer.gists.pageInfo.hasNextPage) {
      fetchMore({
        variables: { cursor: all.viewer.gists.pageInfo.endCursor },
      }).then(res => {
        setGists([...gists, ...res.data.viewer.gists.nodes]);
        all && setAll({ ...res.data });
      });
    }
  }, [setAll, data, fetchMore, all, gists]);

  useEffect(() => {
    const counter = all && all.viewer.gists.totalCount;

    if (gists.length === counter) {
      dispatch(addGists(gists));

      // Setup collections
      const config = gists.find((gist: any) =>
        gist.files.some((file: any) => file.name === 'sneepe.collections.json')
      );

      const collectionsConfigFile = config.files.find(
        (file: any) => file.name === 'sneepe.collections.json'
      );

      const json = JSON.parse(collectionsConfigFile.text);
      dispatch(addCollections(json));
    }
  }, [gists, all, dispatch]);

  return null;
};

export default FetchAllGists;

const ALL_GISTS = gql`
  query allGists($cursor: String) {
    viewer {
      gists(
        orderBy: { field: CREATED_AT, direction: DESC }
        first: 100
        privacy: ALL
        after: $cursor
      ) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          name
          description
          url
          createdAt
          updatedAt
          pushedAt
          isPublic
          isFork
          viewerHasStarred
          stargazerCount
          owner {
            id
            login
            avatarUrl
            url
          }
          files {
            name
            text
            extension
            size
            language {
              name
              color
            }
          }
        }
      }
    }
  }
`;
