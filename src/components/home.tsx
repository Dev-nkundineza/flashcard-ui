import * as React from 'react';
import { useQueryQuery } from '../generated/graphql';
import LaunchList, { OwnProps } from './flashcardList/flashCardsDashboard';

const LaunchListContainer: React.FC<OwnProps> = (props) => {
  const { data, error, loading } = useQueryQuery ();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  return <LaunchList data={data} {...props} />;
};

export default LaunchListContainer;