/**
 * API client with env-based base URL, auth attachment, and basic 401 retry stub.
 * Inputs are sanitized at call sites; this client focuses on transport and error handling.
 */
const API_BASE = process.env.REACT_APP_API_BASE_URL || '';

/**
 * PUBLIC_INTERFACE
 * Perform a typed API request with proper headers and optional auth token.
 */
export async function apiRequest(path, { method = 'GET', body, token } = {}) {
  /** This is a public function. */
  const url = `${API_BASE}${path}`;
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  const options = {
    method,
    headers,
    credentials: 'include',
  };
  if (body !== undefined && body !== null) {
    options.body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(url, options);
  } catch (err) {
    // Network or CORS error
    throw new Error('Network error. Please check your connection.');
  }

  // Attempt token refresh on 401 once (stubbed; backend integration can replace)
  if (response.status === 401 && token) {
    try {
      const refreshed = await tryRefreshToken();
      if (refreshed) {
        headers.set('Authorization', `Bearer ${refreshed}`);
        const retry = await fetch(url, { ...options, headers });
        return await parseJsonSafe(retry);
      }
    } catch {
      // fall through to original 401 handling
    }
  }

  return parseJsonSafe(response);
}

async function parseJsonSafe(response) {
  const contentType = response.headers.get('content-type') || '';
  let data = null;
  if (contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    try {
      data = await response.text();
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const message = data?.detail || data?.message || `Request failed with ${response.status}`;
    const error = new Error(typeof message === 'string' ? message : 'Request failed');
    error.status = response.status;
    error.payload = data;
    throw error;
  }
  return data;
}

async function tryRefreshToken() {
  // Placeholder: call refresh endpoint if backend supports it.
  // For now, return null so that callers can handle logout on 401.
  return null;
}

/**
 * PUBLIC_INTERFACE
 * Convenience wrappers for CRUD.
 */
export const http = {
  /** This is a public function. */
  get: (path, opts) => apiRequest(path, { ...opts, method: 'GET' }),
  /** This is a public function. */
  post: (path, body, opts) => apiRequest(path, { ...opts, method: 'POST', body }),
  /** This is a public function. */
  put: (path, body, opts) => apiRequest(path, { ...opts, method: 'PUT', body }),
  /** This is a public function. */
  patch: (path, body, opts) => apiRequest(path, { ...opts, method: 'PATCH', body }),
  /** This is a public function. */
  del: (path, opts) => apiRequest(path, { ...opts, method: 'DELETE' }),
};
