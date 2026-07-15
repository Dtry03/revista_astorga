export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body?: string;
  category: string;
  cover_image: string;
  status: string;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

const API_BASE = import.meta.env.VITE_API_URL || "";

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}`);
  }

  const json = (await response.json()) as ApiResponse<T>;

  if (!json.success) {
    throw new Error(json.message || "Error al cargar datos");
  }

  return json.data;
}

export async function getArticles(params?: {
  limit?: number;
  category?: string;
}) {
  const searchParams = new URLSearchParams();

  if (params?.limit) {
    searchParams.set("limit", String(params.limit));
  }

  if (params?.category) {
    searchParams.set("category", params.category);
  }

  const query = searchParams.toString();

  return apiGet<Article[]>(`/api/articles${query ? `?${query}` : ""}`);
}

export async function getArticleBySlug(slug: string) {
  return apiGet<Article>(`/api/articles/${slug}`);
}
