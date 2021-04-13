import { AggregatedWord } from './response.types';

type GameResults = {
  goodAnswers: AggregatedWord[];
  badAnswers: AggregatedWord[];
};

export default GameResults;
