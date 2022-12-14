
declare namespace DuelGSI {

    type EmptyState = Record<string, unknown>

    type MenuState = {
        state: 'MENU'
    }
    type GameState = {
        state: 'GAME'

        round: number
        maxRounds: number
        roundLimit: boolean
        waterRising: boolean
        players: PlayerRecord[]
    }

    type DuelState = EmptyState | MenuState | GameState

    type Weapon = '' 
    | 'unarmed' 
    | 'pistol'
    | 'bazooka'
    | 'lightning'
    | 'shotgun'
    | 'plasma'
    | 'laser'
    | 'machine gun'
    | 'triton'
    | 'uzi'
    | 'bow'
    | 'slime'
    | 'double laser'
    | 'kiss of death'
    | 'spray'
    | 'sling'
    | 'stopper gun'
    | 'shit thrower'

    type PlayerRecord = {
        alive: boolean
        name: string
        bonus: string
        health: number
        air: number //breath under water

        team: number

        ammo: number
        weapon: Weapon

        points: number //score
        kills: number // kills (adds to score)
        deaths: number // subtracts from score
        roundKills: number
        ping: number
        
        bonusRemainingTime: number 
        reloadTime: number // goes from 0 up to reloadInterval
        reloadInterval: number
        timeSinceHit: number // elapsed time since player took damage
    }
}