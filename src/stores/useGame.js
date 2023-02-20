import { create } from 'zustand'

export default create((set) => ({
    blocksCount: 3,

    /* Phases */
    phase: 'ready',
    
    start: () => {
        set((state) => {
            // if phase is already playing, don't want to update anything; this prevents start from firing over and over
            if(state.phase === 'ready')
                return { phase: 'playing' }
            // must return something from this fn    
            return {}
        })
    },

    restart: () => {
        set((state) => {
            if(state.phase === 'playing' || state.phase === 'ended') {
                return { phase: 'ready' }
            }
            return {}
        })
    },

    end: () => {
        set((state) => {
            if(state.phase === 'playing') {
                return { phase: 'ended'}
            }
            return {}
        })
    }
}))