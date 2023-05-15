export type Cards = 0 | 1 | 2 | 3 | 5 | 8 | 13 | 21 | 34 | 55 | 89 | '?' | '☕'
export type CardsToUpdateRoom = Cards | undefined
export type MyCard = Cards | string | undefined

export interface PlayerNameSubmit {
    name: string
}

export interface RoomData {
    id: string | undefined
    card: Cards | undefined
    playerName: string
}

export interface PlayerData {
    id?: string | undefined
    card?: Cards | undefined
    playerName?: string
}

export interface RoomPlayersDividedInPositions {
    name: 'top' | 'bottom' | 'left' | 'right'
    limit: 0 | 3
    users: PlayerData[]
}
