import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  searched: string
  setSearched: (value: string) => void
  recentSearches: string[]
  updateRecentSearches: (value: string, actionType: 'add' | 'remove') => void
}

export const useSearch = create<State>()(
  persist(
    set => ({
      searched: '',
      setSearched: value => set(() => ({ searched: value })),
      updateRecentSearches: (value, actionType) => {
        set(state => {
          if (actionType === 'add') {
            const index = state.recentSearches.findIndex(item => item === value)
            if (index > -1) {
              state.recentSearches.splice(index, 1)
            }
            return { recentSearches: [value, ...state.recentSearches] }
          }
          return { recentSearches: state.recentSearches.filter(item => item !== value) }
        })
      },
      recentSearches: [],
    }),
    { name: 'search', partialize: state => ({ recentSearches: state.recentSearches }) },
  ),
)
