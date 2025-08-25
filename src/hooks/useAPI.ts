import { useState, useEffect } from 'react';
import { Movie } from '../types';
import { API_CONFIG } from '../config/api';

export const useAPI = (endpoint: string, dependencies: unknown[] = []) => {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Se já tem "?" no endpoint, adiciona "&", senão adiciona "?"
        const separator = endpoint.includes("?") ? "&" : "?";

        const response = await fetch(
          `${API_CONFIG.BASE_URL}${endpoint}${separator}api_key=${API_CONFIG.API_KEY}&language=pt-BR`
        );

        if (!response.ok) throw new Error('Erro ao carregar dados');
        const result = await response.json();
        setData(result.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};
