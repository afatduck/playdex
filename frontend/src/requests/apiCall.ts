type ApiResult<T> = {
  success: true,
  data: T
} | {
  success: false,
  detail: string 
};

async function apiCall<T>(url: string, options: RequestInit = {}): Promise<ApiResult<T>> {
  const token = localStorage.getItem('jwt');
  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  
  const response = await fetch(url, { ...options, headers });
  
  if (response.status === 401) {
    localStorage.removeItem('jwt');
    window.location.href = '/login';
  }
  
  return new Promise(
    async (resolve) => {
      let json = await response.json()
      if (json.detail) {
        resolve({
          success: false,
          detail: json.detail
        })
      }
      resolve({
        success: true,
        data: json
      })
    },
  );
};

export default apiCall