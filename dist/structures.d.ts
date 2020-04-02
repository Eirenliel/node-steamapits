export declare class Achievement {
    api: any;
    name: any;
    description: any;
    achieved: boolean;
    unlockTime: number;
    constructor(achievement: any);
    /**
     * @type {Date} Date when this achievement was unlocked at.
     * @readonly
     */
    unlockedAt(): Date;
}
export declare class Badge {
    appID: string;
    badgeID: any;
    badgeColor: any;
    borderColor: any;
    communityItemID: any;
    completionTime: number;
    level: any;
    scarcity: any;
    xp: any;
    constructor(badge: any);
    /**
     * @type {Date} Date when this badge was completed.
     * @readonly
     */
    completedAt(): Date;
}
export declare class Player {
    steamID: string;
    /**
     * @type {string} The permalink to this players profile.
     * @readonly
     */
    profileURL(): string;
}
export declare class PlayerAchievements extends Player {
    gameName: string;
    achievements: Achievement[];
    constructor(player: any);
}
export declare class PlayerBadges {
    badges: Badge[];
    playerXP: number;
    playerLevel: number;
    playerNextLevelXP: number;
    playerCurrentLevelXP: number;
    constructor(player: any);
}
export declare class PlayerBans extends Player {
    communityBanned: boolean;
    vacBanned: boolean;
    daysSinceLastBan: number;
    economyBan: boolean;
    vacBans: number;
    gameBans: number;
    constructor(player: any);
    /**
     * @type {Date} Date when the last ban occurred.
     * @readonly
     */
    lastBan(): Date;
}
export declare class PlayerServers extends Player {
    banned: boolean;
    expires: number;
    lastActionTime: number;
    servers: GameServer[];
    constructor(player: any, hide: boolean);
    /**
     * @type {Date} Date when this expires.
     * @readonly
     */
    expiresAt(): Date;
    /**
     * @type {Date} Date when the last action was executed.
     * @readonly
     */
    lastActionAt(): Date;
}
export declare class Friend extends Player {
    relationship: any;
    friendSince: number;
    constructor(friend: any);
    /**
     * @type {Date} Date when this person was friended.
     * @readonly
     */
    friendedAt(): Date;
}
export declare class Game {
    name: string;
    appID: string;
    playTime: any;
    playTime2: any;
    logoURL: string;
    iconURL: string;
    constructor(game: any);
}
export declare class GameServer {
    appID: string;
    actor: any;
    memo: any;
    token: any;
    deleted: boolean;
    expired: boolean;
    lastLoginTime: number;
    constructor(server: any);
    /**
     * @type {boolean} Whether or not this token is usable.
     * @readonly
     */
    usable(): boolean;
    /**
     * @type {Date} Date the last time this token was used.
     * @readonly
     */
    lastLoginAt(): Date;
}
export declare class PlayerStats extends Player {
    game: string;
    stats: object;
    achievements: object;
    constructor(player: any);
}
export declare class PlayerSummary extends Player {
    avatar: {
        small: string;
        medium: string;
        large: string;
    };
    url: string;
    created: number;
    lastLogOff: number;
    nickname: string;
    realName: string;
    primaryGroupID: string;
    personaState: number;
    personaStateFlags: number;
    commentPermission: number;
    visibilityState: number;
    countryCode: string;
    stateCode: string;
    cityID: string;
    gameServerIP: string;
    gameServerSteamID: any;
    gameExtraInfo: any;
    gameID: number;
    constructor(player: any);
    /**
     * @type {Date} Date when this player's account was created.
     * @readonly
     */
    createdAt(): Date;
    /**
     * @type {Date} Date when this player last logged off.
     * @readonly
     */
    lastLogOffAt(): Date;
}
export declare class RecentGame extends Game {
    constructor(game: any);
}
export declare class Server {
    address: any;
    appID: string;
    game: any;
    gmsindex: any;
    lan: any;
    port: number;
    region: any;
    secure: any;
    specPort: number;
    constructor(server: any);
}
/**
 * @typedef {App}
 * @property {string} appid The app's ID
 * @property {string} name The app's name
 */
export declare class App {
    appid: string;
    name: string;
    constructor(appid: string, name: string);
}
export declare class PlayerAuth {
    result: string;
    steamID: string;
    ownerSteamID: string;
    vacBanned: boolean;
    publisherBanned: boolean;
    constructor(auth: any);
}
