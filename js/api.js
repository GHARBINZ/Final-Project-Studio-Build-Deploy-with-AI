/**
 * Deezer API client using JSONP (required for browser CORS compatibility).
 * @see https://developers.deezer.com/api
 */
const DeezerAPI = (() => {
  const BASE_URL = "https://api.deezer.com";
  let callbackCounter = 0;

  function jsonp(endpoint) {
    return new Promise((resolve, reject) => {
      const callbackName = `deezerJsonp_${Date.now()}_${callbackCounter++}`;
      const script = document.createElement("script");
      const url = `${BASE_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}callback=${callbackName}`;

      const cleanup = () => {
        delete window[callbackName];
        script.remove();
      };

      window[callbackName] = (data) => {
        cleanup();
        if (data.error) {
          reject(new Error(data.error.message || "Deezer API error"));
        } else {
          resolve(data);
        }
      };

      script.onerror = () => {
        cleanup();
        reject(new Error("Failed to reach Deezer API"));
      };

      script.src = url;
      document.head.appendChild(script);

      setTimeout(() => {
        if (window[callbackName]) {
          cleanup();
          reject(new Error("Request timed out"));
        }
      }, 15000);
    });
  }

  function searchTracks(query, limit = 25) {
    const encoded = encodeURIComponent(query.trim());
    return jsonp(`/search?q=${encoded}&limit=${limit}`);
  }

  function getChartTracks(limit = 25) {
    return jsonp(`/chart/0/tracks?limit=${limit}`);
  }

  return { searchTracks, getChartTracks };
})();
