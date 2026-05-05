import type { Card } from "../types/card";
import { API_BASE_URL } from "../config/api";
import { getToken } from "../utils/token";

type FetchCardsParams = {
  page?: number;
  limit?: number;
  favorite?: boolean;
  learned?: boolean;
  category?: string;
  search?: string;
};

type CardsResponse = {
  data: Card[];
  page: number;
  pages: number;
};

export async function fetchCards({
  page = 1,
  limit = 9,
  favorite,
  learned,
  category,
  search,
}: FetchCardsParams = {}): Promise<CardsResponse> {
  const token = getToken();

  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  if (favorite !== undefined) {
    params.append("favorite", String(favorite));
  }

  if (learned !== undefined) {
    params.append("learned", String(learned));
  }

  if (category && category !== "All") {
    params.append("category", category);
  }

  if (search) {
    params.append("search", search);
  }

  const response = await fetch(
    `${API_BASE_URL}/api/cards?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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

export async function updateCard(cardId: string, updates: Partial<Card>) {
  const token = getToken();

  const res = await fetch(`${API_BASE_URL}/api/cards/${cardId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) throw new Error("Update failed");

  return res.json();
}

export async function editCard(cardId: string, formData: FormData) {
  const token = getToken();

  const res = await fetch(`${API_BASE_URL}/api/cards/${cardId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Edit failed");

  return res.json();
}

export async function deleteCard(id: string) {
  const token = getToken();

  const res = await fetch(`${API_BASE_URL}/api/cards/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete card");
  }
}