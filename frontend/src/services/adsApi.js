const API_BASE = "";

async function apiGet(path) {
  const response = await fetch(`${API_BASE}${path}`);

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}`);
  }

  const json = await response.json();

  if (!json.success) {
    throw new Error(json.message || "Error al cargar publicidad");
  }

  return json.data;
}

export async function getAds(params = {}) {
  const searchParams = new URLSearchParams();

  if (params.placement) {
    searchParams.set("placement", params.placement);
  }

  const query = searchParams.toString();

  return apiGet(`/api/ads${query ? `?${query}` : ""}`);
}

export async function getAdByPlacement(placement) {
  return apiGet(`/api/ads/${placement}`);
}