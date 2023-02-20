import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) => ({
    blocksCount: 3,

    /* Time */
    startTime: 0,
    endTime: 0,

    /* Phases */
    phase: 'ready',
    
    start: () => {
        set((state) => {
            // if phase is already playing, don't want to update anything; this prevents start from firing over and over
            if(state.phase === 'ready') {
                return {
                    phase: 'playing',
                    startTime: Date.now()
                }
            }
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
                return {
                    phase: 'ended',
                    endTime: Date.now()
                }
            }
            return {}
        })
    }
})))