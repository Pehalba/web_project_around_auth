const AUTH_BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

// Nome da chave onde o token fica guardado no navegador
export const AUTH_TOKEN_KEY = "token";

export function getStoredToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setStoredToken(token) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearStoredToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

// Trata resposta Json
function handleAuthResponse(res) {
  return res.json().then((data) => {
    if (res.ok) {
      return data;
    }
    const message =
      (data && (data.message || data.error)) || `Erro: ${res.status}`;
    return Promise.reject(new Error(message));
  });
}

// Criar conta na API Tripleten
export function signup({ email, password }) {
  return fetch(`${AUTH_BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, email }),
  }).then(handleAuthResponse);
}

// Login: a API devolve um token (JWT) para usar nas próximas requisições
export function signin({ email, password }) {
  return fetch(`${AUTH_BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, email }),
  }).then(handleAuthResponse);
}

// Confere se o token ainda é válido e busca o e-mail do usuário
export function getMe() {
  const token = getStoredToken();
  if (!token) {
    return Promise.reject(new Error("Token não encontrado."));
  }
  return fetch(`${AUTH_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleAuthResponse)
    .then((body) => {
      const inner = body && body.data ? body.data : body;
      return {
        email: inner.email,
        _id: inner._id,
      };
    });
}

// O token pode vir direto no JSON ou dentro de `data` (depende da resposta)
export function getTokenFromResponse(data) {
  if (!data || typeof data !== "object") {
    return null;
  }
  if (data.token) {
    return data.token;
  }
  if (data.data && data.data.token) {
    return data.data.token;
  }
  return null;
}
