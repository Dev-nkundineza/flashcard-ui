import * as React from 'react';
import { useFlashcardsQuery } from '../generated/graphql';
import LaunchList, { OwnProps } from './flashcardList/list';

const LaunchListContainer: React.FC<OwnProps> = (props) => {
  const { data, error, loading } = useFlashcardsQuery ();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  return <LaunchList data={data} {...props} />;
};

export default LaunchListContainer;