"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cdn = 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps';
const objectify_1 = __importDefault(require("./utils/objectify"));
class Achievement {
    constructor(achievement) {
        this.api = achievement.apiname;
        this.name = achievement.name;
        this.description = achievement.description;
        this.achieved = Boolean(achievement.achieved);
        this.unlockTime = achievement.unlocktime;
    }
    /**
     * @type {Date} Date when this achievement was unlocked at.
     * @readonly
     */
    unlockedAt() {
        return new Date(this.unlockTime * 1000);
    }
}
exports.Achievement = Achievement;
class Badge {
    constructor(badge) {
        this.appID = badge.appid;
        this.badgeID = badge.badgeid;
        this.borderColor = badge.border_color;
        this.communityItemID = badge.communityitemid;
        this.completionTime = badge.completion_time;
        this.level = badge.level;
        this.scarcity = badge.scarcity;
        this.xp = badge.xp;
    }
    /**
     * @type {Date} Date when this badge was completed.
     * @readonly
     */
    completedAt() {
        return new Date(this.completionTime * 1000);
    }
}
exports.Badge = Badge;
class Player {
    /**
     * @type {string} The permalink to this players profile.
     * @readonly
     */
    profileURL() {
        return `https://steamcommunity.com/profiles/${this.steamID}`;
    }
}
exports.Player = Player;
class PlayerAchievements extends Player {
    constructor(player) {
        super();
        this.steamID = player.steamID;
        this.gameName = player.gameName;
        this.achievements = player.achievements.map(achievement => new Achievement(achievement));
    }
}
exports.PlayerAchievements = PlayerAchievements;
class PlayerBadges {
    constructor(player) {
        this.badges = player.badges.map(badge => new Badge(badge));
        this.playerXP = player.player_xp;
        this.playerLevel = player.player_level;
        this.playerNextLevelXP = player.player_xp_needed_to_level_up;
        this.playerCurrentLevelXP = player.player_xp_needed_current_level;
    }
}
exports.PlayerBadges = PlayerBadges;
class PlayerBans extends Player {
    constructor(player) {
        super();
        this.steamID = player.SteamId;
        this.communityBanned = player.CommunityBanned;
        this.vacBanned = player.VACBanned;
        this.daysSinceLastBan = player.DaysSinceLastBan;
        this.economyBan = player.EconomyBan;
        this.vacBans = player.NumberOfVACBans;
        this.gameBans = player.NumberOfGameBans;
    }
    /**
     * @type {Date} Date when the last ban occurred.
     * @readonly
     */
    lastBan() {
        return new Date(Date.now() - (1000 * 60 * 60 * 24 * this.daysSinceLastBan));
    }
}
exports.PlayerBans = PlayerBans;
class PlayerServers extends Player {
    constructor(player, hide) {
        super();
        this.steamID = player.actor;
        this.banned = player.is_banned;
        this.expires = player.expires;
        this.lastActionTime = player.last_action_time;
        this.servers = player.servers
            ? player.servers
                .filter(server => !hide || !(server.is_deleted || server.is_expired))
                .map(server => new GameServer(server))
            : [];
    }
    /**
     * @type {Date} Date when this expires.
     * @readonly
     */
    expiresAt() {
        return new Date(this.expires * 1000);
    }
    /**
     * @type {Date} Date when the last action was executed.
     * @readonly
     */
    lastActionAt() {
        return new Date(this.lastActionTime * 1000);
    }
}
exports.PlayerServers = PlayerServers;
class Friend extends Player {
    constructor(friend) {
        super();
        this.steamID = friend.steamid;
        this.relationship = friend.relationship;
        this.friendSince = friend.friend_since;
    }
    /**
     * @type {Date} Date when this person was friended.
     * @readonly
     */
    friendedAt() {
        return new Date(this.friendSince * 1000);
    }
}
exports.Friend = Friend;
class Game {
    constructor(game) {
        this.name = game.name;
        this.appID = game.appid;
        this.playTime = game.playtime_forever;
        this.playTime2 = game.playtime_2weeks || 0;
        this.logoURL = `${cdn}/${game.appid}/${game.img_logo_url}.jpg`;
        this.iconURL = `${cdn}/${game.appid}/${game.img_icon_url}.jpg`;
    }
}
exports.Game = Game;
class GameServer {
    constructor(server) {
        this.appID = server.appid;
        this.actor = server.actor;
        this.memo = server.memo;
        this.token = server.login_token;
        this.deleted = server.is_deleted;
        this.expired = server.is_expired;
        this.lastLoginTime = server.rt_last_logon;
    }
    /**
     * @type {boolean} Whether or not this token is usable.
     * @readonly
     */
    usable() {
        return !this.deleted && !this.expired;
    }
    /**
     * @type {Date} Date the last time this token was used.
     * @readonly
     */
    lastLoginAt() {
        return new Date(this.lastLoginTime * 1000);
    }
}
exports.GameServer = GameServer;
class PlayerStats extends Player {
    constructor(player) {
        super();
        this.steamID = player.steamID;
        this.game = player.gameName;
        if (player.stats)
            this.stats = objectify_1.default(player.stats);
        if (player.achievements)
            this.achievements = objectify_1.default(player.achievements, 'achieved');
    }
}
exports.PlayerStats = PlayerStats;
class PlayerSummary extends Player {
    constructor(player) {
        super();
        this.avatar = {
            small: player.avatar,
            medium: player.avatarmedium,
            large: player.avatarfull,
        };
        this.steamID = player.steamid;
        this.url = player.profileurl;
        this.created = player.timecreated;
        this.lastLogOff = player.lastlogoff;
        this.nickname = player.personaname;
        this.realName = player.realname;
        this.primaryGroupID = player.primaryclanid;
        this.personaState = player.personastate;
        this.personaStateFlags = player.personastateflags;
        this.commentPermission = player.commentpermission;
        this.visibilityState = player.communityvisibilitystate;
        this.countryCode = player.loccountrycode;
        this.stateCode = player.locstatecode;
        this.cityID = player.loccityid;
        this.gameServerIP = player.gameserverip;
        this.gameServerSteamID = player.gameserversteamid;
        this.gameExtraInfo = player.gameextrainfo;
        this.gameID = player.gameid;
    }
    /**
     * @type {Date} Date when this player's account was created.
     * @readonly
     */
    createdAt() {
        return new Date(this.created * 1000);
    }
    /**
     * @type {Date} Date when this player last logged off.
     * @readonly
     */
    lastLogOffAt() {
        return new Date(this.lastLogOff * 1000);
    }
}
exports.PlayerSummary = PlayerSummary;
class RecentGame extends Game {
    constructor(game) {
        super(game);
        this.name = game.name;
        this.logoURL = `${cdn}/${game.appid}/${game.img_logo_url}.jpg`;
        this.iconURL = `${cdn}/${game.appid}/${game.img_icon_url}.jpg`;
    }
}
exports.RecentGame = RecentGame;
class Server {
    constructor(server) {
        this.address = server.addr;
        this.appID = server.appid;
        this.game = server.gamedir;
        this.gmsindex = server.gmsindex;
        this.lan = server.lan;
        this.port = server.gameport;
        this.region = server.region;
        this.secure = server.secure;
        this.specPort = server.specport;
    }
}
exports.Server = Server;
/**
 * @typedef {App}
 * @property {number} appid The app's ID
 * @property {string} name The app's name
 */
class App {
    constructor(appid, name) {
        this.appid = appid;
        this.name = name;
    }
}
exports.App = App;
