import { Item } from "../types/Item";

const getApiUrl = () => {
  // Trim trailing slash if present
  let url = process.env.NEXT_PUBLIC_API_URL || "";
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  return url;
};

export async function listItems(): Promise<Item[]> {
  const url = getApiUrl();
  if (!url) {
    console.warn("NEXT_PUBLIC_API_URL is not configured.");
    return [];
  }
  const response = await fetch(`${url}/items`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Failed to list items: ${response.statusText}`);
  }
  return response.json();
}

export async function createItem(data: Partial<Item>): Promise<Item> {
  const url = getApiUrl();
  if (!url) throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  const response = await fetch(`${url}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to create item: ${response.statusText}`);
  }
  return response.json();
}

export async function getItem(id: string): Promise<Item> {
  const url = getApiUrl();
  if (!url) throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  const response = await fetch(`${url}/items/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Failed to get item: ${response.statusText}`);
  }
  return response.json();
}

export async function toggleItem(id: string, completed: boolean): Promise<Item> {
  const url = getApiUrl();
  if (!url) throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  const response = await fetch(`${url}/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  if (!response.ok) {
    throw new Error(`Failed to toggle item: ${response.statusText}`);
  }
  return response.json();
}
