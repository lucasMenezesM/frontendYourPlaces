import { useState, useEffect } from "react";

import axios from "axios";

export function useHttpClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  async function sendRequest(url, method = "get", body = null) {
    let response;
    try {
      if (method === "post") {
        response = await axios.get(url, body);
      } else {
        response = await axios.post(url);
      }
      const result = response.data;
    } catch (err) {
      setError(err.message);
    }
  }
}
