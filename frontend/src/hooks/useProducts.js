import { useState, useEffect, useCallback } from 'react';
import { getProducts, getFeaturedProducts } from '../utils/api';

export const useProducts = (initialParams = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  const fetchProducts = useCallback(async (params = initialParams) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await getProducts(params);
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchProducts(initialParams);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { products, loading, error, pagination, refetch: fetchProducts };
};

export const useFeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getFeaturedProducts();
        setProducts(data.products);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load featured products');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { products, loading, error };
};
