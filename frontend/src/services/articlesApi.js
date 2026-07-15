const API_BASE = "";

async function apiGet(path) {
  const response = await fetch(`${API_BASE}${path}`);

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}`);
  }

  const json = await response.json();

  if (!json.success) {
    throw new Error(json.message || "Error al cargar datos");
  }

  return json.data;
}

export async function getArticles(params = {}) {
  const searchParams = new URLSearchParams();

  if (params.limit) {
    searchParams.set("limit", String(params.limit));
  }

  if (params.category) {
    searchParams.set("category", params.category);
  }

  const query = searchParams.toString();

  return apiGet(`/api/articles${query ? `?${query}` : ""}`);
}

export async function getArticleBySlug(slug) {
  return apiGet(`/api/articles/${slug}`);
}
