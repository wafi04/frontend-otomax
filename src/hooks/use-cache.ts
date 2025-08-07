import { create } from 'zustand'

type Cache = Record<string | number, any>;

interface DataStore {
  cache: Cache;

  setCache: <T>(key: string | number, data: T) => void;

  fetchData: <T>(key: string | number, fetcher: () => Promise<T>) => Promise<T>;
}

const useDataStore = create<DataStore>((set, get) => ({
  cache: {},

  setCache: (key, data) => {
    set((state) => ({
      cache: {
        ...state.cache,
        [key]: data,
      },
    }));
  },

  fetchData: async (key, fetcher) => {
    const cached = get().cache[key];
    if (cached !== undefined) return cached;

    const data = await fetcher();
    get().setCache(key, data);
    return data;
  },
}));

export default useDataStore;
