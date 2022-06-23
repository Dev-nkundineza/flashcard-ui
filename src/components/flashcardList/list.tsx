import * as React from 'react';
import { FlashcardsQuery } from '../../generated/graphql';
import './styles.css';

export interface OwnProps {
  handleIdChange: (newId: number) => void;
}

interface Props extends OwnProps {
  data: FlashcardsQuery;
}

const className = 'LaunchList';

const LaunchList: React.FC<Props> = ({ data, handleIdChange }) => (
  <div className={className}>
    <h3>Flash Cards</h3>
    <ol className={`${className}__list`}>
      {!!data.flashcards.flashcards &&
        data.flashcards.flashcards.map(
          (flashcard, i) =>
            !!flashcard && (
              <li
                key={i}
                className={`${className}__item`}
                onClick={() => handleIdChange(flashcard.id!)}
              >
                {flashcard.question} ({flashcard.answer})
              </li>
            ),
        )}
    </ol>
  </div>
);

export default LaunchList;