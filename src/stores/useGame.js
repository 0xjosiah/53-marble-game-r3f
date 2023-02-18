import { create } from 'zustand'

export default create((set) => ({
    blocksCount: 3,

    /* Phases */
    phase: 'ready',
    
    start: () => {
        set(() => ({ phase: 'playing' }))
    },

    restart: () => {
        set(() => ({ phase: 'ready' }))
    },

    end: () => {
        console.log('end')
        set(() => ({ phase: 'ended'}))
    }
}))