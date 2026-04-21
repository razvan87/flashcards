// --- Enum-uri și Tipuri Union ---

export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type PartOfSpeech = "noun" | "verb" | "adjective" | "adverb" | "phrase";

export type UserRole = "ADMIN" | "USER";

export type Category = 

  | "All" | "Academic" | "Animals" | "Business" | "Career" | "Clothes" 
  | "Colors" | "Communication" | "Critical Thinking" | "Emotions" 
  | "Environment" | "Food" | "General" | "Language" | "Lifestyle" 
  | "Nature" | "Transport" | "People" | "Personal Development" 
  | "Philosophy" | "Psychology" | "House" | "Work" | "School" 
  | "Sports" | "Technology" | "Weather" | "Health" | "Travel" 
  | "Education" | "Entertainment" | "Other" | "Personal Growth";

// --- Interfețe pentru Date ---

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

export interface User {
  _id: string;
  username: string;
  role: UserRole;
  createdAt: string;
}

// --- Tipuri pentru API Responses (Paginare) ---

export interface PaginatedCards {
  cards: Card[];
  totalCards: number;
  totalPages: number;
  currentPage: number;
}
