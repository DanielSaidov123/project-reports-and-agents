import axios from "axios";
import { useState } from "react";

export function useRequest<T>() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const request = async (fn: () => Promise<T>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await fn();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1000);
      return result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data?.massege || "error";
        setError(serverError);
      } else {
        setError("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };
  return { request, loading, error, success };
}
