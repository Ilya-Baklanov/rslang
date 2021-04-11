interface Word {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

type Words = Word[];

interface UserWord {
  difficulty: string;
  optional: Record<string, any>;
}

type UserWords = UserWord[];

interface AggregatedWord extends Word {
  _id: string;
  userWord: UserWord;
}

interface AggregatedWords {
  paginatedResults: AggregatedWord[];
  totalCount: [
    {
      count: number;
    }
  ];
}

interface Statistic {
  learnedWords: number;
  optional: {
    audioCallStats: any;
    audioReplyStats: any;
    sprintStats: any;
    savannahStats: any;
    allStats: Record<string, number>;
  };
}

interface UserSettings {
  wordsPerDay: number;
  optional: {
    wordTranslate: boolean;
    textTranslate: boolean;
    hardButton: boolean;
    repeatButton: boolean;
    deleteButton: boolean;
  };
}

export {
  Word,
  Words,
  UserWord,
  UserWords,
  Statistic,
  AggregatedWord,
  AggregatedWords,
  UserSettings,
};
