export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type PartOfSpeech = "noun" | "verb" | "adjective" | "adverb" | "phrase";

export interface Meaning {
    partOfSpeech: PartOfSpeech;
    definition: string;
    example: string;
  }
  
  export interface Card {
    _id: string; // Generat de MongoDB
    text: string;
    imageUrl?: string;
    level: CEFRLevel;
    meanings: Meaning[];
    category?: Category;
    createdAt: string;
    updatedAt: string;
  }