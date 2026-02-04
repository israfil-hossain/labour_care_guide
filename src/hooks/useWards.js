import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { wardsApi } from '../api/wards';
import useAuthStore from '../stores/useAuthStore';

/**
 * Hook for getting all wards with pagination
 */
export const useWards = (params = {}, options = {}) => {
  const { getToken } = useAuthStore();

  return useQuery({
    queryKey: ['wards', params],
    queryFn: () => {
      const token = getToken();
      return wardsApi.getAll(params, token);
    },
    ...options,
  });
};

/**
 * Hook for infinite scroll wards list
 */
export const useInfiniteWards = (params = {}, options = {}) => {
  const { getToken } = useAuthStore();

  return useInfiniteQuery({
    queryKey: ['wards', 'infinite', params],
    queryFn: ({ pageParam = 1 }) => {
      const token = getToken();
      return wardsApi.getAll({ ...params, page: pageParam }, token);
    },
    getNextPageParam: (lastPage) => {
      const meta = lastPage?.data?.meta;
      if (meta && meta.page < meta.totalPages) {
        return meta.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    ...options,
  });
};

/**
 * Hook for searching wards
 */
export const useSearchWards = (searchQuery, options = {}) => {
  const { getToken } = useAuthStore();

  return useQuery({
    queryKey: ['wards', 'search', searchQuery],
    queryFn: () => {
      const token = getToken();
      return wardsApi.getAll({ search: searchQuery }, token);
    },
    enabled: !!searchQuery, // Only fetch if search query exists
    ...options,
  });
};

/**
 * Hook for getting a single ward
 */
export const useWard = (id, options = {}) => {
  const { getToken } = useAuthStore();

  return useQuery({
    queryKey: ['ward', id],
    queryFn: () => {
      const token = getToken();
      return wardsApi.getById(id, token);
    },
    enabled: !!id, // Only fetch if ID exists
    ...options,
  });
};

/**
 * Hook for creating a ward
 */
export const useCreateWard = () => {
  const { getToken } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      const token = getToken();
      return wardsApi.create(data, token);
    },
    onSuccess: () => {
      console.log('=== CREATE WARD SUCCESS ===');
      // Invalidate wards queries to refetch the list
      queryClient.invalidateQueries({ queryKey: ['wards'] });
    },
    onError: (error) => {
      console.error('=== CREATE WARD ERROR ===');
      console.error('Error:', error);
    },
  });
};

/**
 * Hook for updating a ward
 */
export const useUpdateWard = () => {
  const { getToken } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => {
      const token = getToken();
      return wardsApi.update(id, data, token);
    },
    onSuccess: (data, variables) => {
      console.log('=== UPDATE WARD SUCCESS ===');
      // Invalidate specific ward and wards list
      queryClient.invalidateQueries({ queryKey: ['ward', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['wards'] });
    },
    onError: (error) => {
      console.error('=== UPDATE WARD ERROR ===');
      console.error('Error:', error);
    },
  });
};

/**
 * Hook for deleting a ward
 */
export const useDeleteWard = () => {
  const { getToken } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => {
      const token = getToken();
      return wardsApi.delete(id, token);
    },
    onSuccess: (data, id) => {
      console.log('=== DELETE WARD SUCCESS ===');
      // Remove ward from cache and invalidate wards list
      queryClient.removeQueries({ queryKey: ['ward', id] });
      queryClient.invalidateQueries({ queryKey: ['wards'] });
    },
    onError: (error) => {
      console.error('=== DELETE WARD ERROR ===');
      console.error('Error:', error);
    },
  });
};
