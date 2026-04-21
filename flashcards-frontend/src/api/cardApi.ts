import type { Card } from "../types/card";

type CardsResponse = {
  data: Card[];
  page: number;
  pages: number;
};

export async function fetchCards(
  page = 1,
  limit = 9
): Promise<CardsResponse> {
  const response = await fetch(
    `http://localhost:3000/api/cards?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cards");
  }

  return response.json();
}