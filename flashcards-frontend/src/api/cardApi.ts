import type { Card } from "../types/card";
import { API_BASE_URL } from "../config/api";
import { getToken } from "../utils/token";

type CardsResponse = {
  data: Card[];
  page: number;
  pages: number;
};

export async function fetchCards(
  page = 1,
  limit = 9
): Promise<CardsResponse> {
  const token = getToken();

  const response = await fetch(
    `http://localhost:3000/api/cards?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cards");
  }

  return response.json();
}

export async function fetchCategories(): Promise<string[]> {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/api/cards/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load categories");
  }

  return response.json();
}

export async function createCard(
  formData: FormData
): Promise<Card> {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/api/cards`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to create card");
  }

  return response.json();
}