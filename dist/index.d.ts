import { PlayerAchievements, PlayerBadges, PlayerBans, PlayerServers, PlayerStats, PlayerSummary, Friend, Game, RecentGame, Server, App, PlayerAuth } from './structures';
export declare class SteamAPI {
    key: string;
    appid: string;
    partnerAPI: string;
    baseAPI: string;
    baseStore: string;
    api: string;
    headers: {
        'User-Agent': string;
    };
    options: {
        enabled: boolean;
        expires: number;
        disableWarnings: boolean;
        partnerApi: boolean;
    };
    resolveCache: Map<any, any>;
    cache: Map<any, any>;
    /**
     * Sets Steam key for future use.
     * @param {string} key Steam key
     * @param {any} [options={}] Optional options for caching and warnings `getGameDetails()`
     * @param {boolean} [options.enabled=true] Whether caching is enabled
     * @param {number} [options.expires=86400000] How long cache should last for in ms (1 day by default)
     * @param {boolean} [options.disableWarnings=false] Whether to suppress warnings
     * @param {string} appid AppID if using it
     */
    constructor(key: string, { enabled, expires, disableWarnings, partnerApi }?: {
        enabled?: boolean;
        expires?: number;
        disableWarnings?: boolean;
        partnerApi?: boolean;
    }, appid?: string);
    /**
     * Prints a warning
     * @param {...any} args Message
     * @returns {void}
     * @private
     */
    _warn(...args: any[]): void;
    /**
     * Get custom path that isn't in SteamAPI.
     * @param {string} path Path to request e.g '/IPlayerService/GetOwnedGames/v1?steamid=76561198378422474'
     * @param {string} [base=this.api] Base URL
     * @param {string} [key=this.key] The key to use
     * @returns {Promise<any>} JSON Response
     */
    get(path: string, base?: string, key?: string): Promise<any>;
    /**
     * Resolve info based on id, profile, or url.
     * Rejects promise if a profile couldn't be resolved.
     * @param {string} info Something to resolve e.g 'https://steamcommunity.com/id/xDim'
     * @returns {Promise<string>} Profile ID
     */
    resolve(info: string): Promise<string>;
    /**
     * Get every single app on steam.
     * @returns {Promise<App[]>} Array of apps
     */
    getAppList(): Promise<App[]>;
    /**
     * Get featured categories on the steam store.
     * @returns {Promise<any[]>} Featured categories
     */
    getFeaturedCategories(): Promise<any[]>;
    /**
     * Get featured games on the steam store
     * @returns {Promise<any>} Featured games
     */
    getFeaturedGames(): Promise<any>;
    /**
     * Get achievements for app id.
     * @param {string} app App ID
     * @returns {Promise<any>} App achievements for ID
     */
    getGameAchievements(app: string): Promise<any>;
    /**
     * Get details for app id.
     * <warn>Requests for this endpoint are limited to 200 every 5 minutes</warn>
     * @param {string} app App ID
     * @param {boolean} [force=false] Overwrite cache
     * @returns {Promise<any>} App details for ID
     */
    getGameDetails(app: string, force?: boolean): Promise<any>;
    /**
     * Get news for app id.
     * @param {string} app App ID
     * @returns {Promise<any[]>} App news for ID
     */
    getGameNews(app: string): Promise<any[]>;
    /**
     * Get number of current players for app id.
     * @param {string} app App ID
     * @returns {Promise<number>} Number of players
     */
    getGamePlayers(app: string): Promise<number>;
    /**
     * Get schema for app id.
     * @param {string} app App ID
     * @returns {Promise<any>} Schema
     */
    getGameSchema(app: string): Promise<any>;
    /**
     * Get every server associated with host.
     * @param {string} host Host to request
     * @returns {Promise<Server[]>} Server info
     */
    getServers(host: string): Promise<Server[]>;
    /**
     * Get users achievements for app id.
     * @param {string} id User ID
     * @param {string} app App ID
     * @returns {Promise<PlayerAchievements>} Achievements
     */
    getUserAchievements(id: string, app: string): Promise<PlayerAchievements>;
    /**
     * Get users badges.
     * @param {string} id User ID
     * @returns {Promise<PlayerBadges>} Badges
     */
    getUserBadges(id: string): Promise<PlayerBadges>;
    /**
     * Get users bans.
     * @param {string|string[]} id User ID(s)
     * @returns {Promise<PlayerBans|PlayerBans[]>} Ban info
     */
    getUserBans(id: string | string[]): Promise<PlayerBans | PlayerBans[]>;
    /**
     * Get users friends.
     * @param {string} id User ID
     * @returns {Promise<Friend[]>} Friends
     */
    getUserFriends(id: string): Promise<Friend[]>;
    /**
     * Get users groups.
     * @param {string} id User ID
     * @returns {Promise<string[]>} Groups
     */
    getUserGroups(id: string): Promise<string[]>;
    /**
     * Get users level.
     * @param {string} id User ID
     * @returns {Promise<number>} Level
     */
    getUserLevel(id: string): Promise<number>;
    /**
     * Get users owned games.
     * @param {string} id User ID
     * @returns {Promise<Game[]>} Owned games
     */
    getUserOwnedGames(id: string): Promise<Game[]>;
    /**
     * Get users recent games.
     * @param {string} id User ID
     * @returns {Promise<RecentGame[]>} Recent games
     */
    getUserRecentGames(id: string): Promise<RecentGame[]>;
    /**
     * Gets servers on steamcommunity.com/dev/managegameservers using your key or provided key.
     * @param {boolean} [hide=false] Hide deleted/expired servers
     * @param {string} [key=this.key] Key
     * @returns {Promise<PlayerServers>} Servers
     */
    getUserServers(hide?: boolean, key?: string): Promise<PlayerServers>;
    /**
     * Get users stats for app id.
     * @param {string} id User ID
     * @param {string} app App ID
     * @returns {Promise<PlayerStats>} Stats for app id
     */
    getUserStats(id: string, app: string): Promise<PlayerStats>;
    /**
     * Get users summary.
     * @param {string} id User ID
     * @returns {Promise<PlayerSummary>} Summary
     */
    getUserSummary(id: string | string[]): Promise<PlayerSummary>;
    /**
     * Checks user authentication by ticket. See https://partner.steamgames.com/doc/features/auth#4
     *
     * @param ticket - user ticket
     * @param app - app to check if user owns it, can user current app id
     * @param key - can provide custom key or use current key
     */
    checkUserTicket(ticket: string, app?: string, key?: string): Promise<PlayerAuth>;
}
export default SteamAPI;
