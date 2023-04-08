
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
        // see Game.cpp Game::getGameState()
        name: string
        team: number
        ping: number

        reloadTime: number // goes from 0 up to reloadInterval
        reloadInterval: number
        alive: boolean
        timeSinceHit: number // elapsed time since player took damage

        health: number
        air: number //breath under water
        points: number //score
        kills: number // kills (adds to score)
        deaths: number // subtracts from score
        roundKills: number

        bonus: string
        bonusRemainingTime: number

        ammo: number
        weapon: Weapon
    }
}