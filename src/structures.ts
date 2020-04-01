const cdn = 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps';
import objectify from './utils/objectify';

export class Achievement {
    api: any;
    name: any;
    description: any;
    achieved: boolean;
    unlockTime: number;

	constructor(achievement: any) {
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
	unlockedAt(): Date {
		return new Date(this.unlockTime * 1000);
	}
}

export class Badge {
    appID: string;
    badgeID: any;
    badgeColor: any;
    borderColor: any;
    communityItemID: any;
    completionTime: number;
    level: any;
    scarcity: any;
    xp: any;

	constructor(badge: any) {
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
	completedAt(): Date {
		return new Date(this.completionTime * 1000);
	}
}

export class Player {

    steamID: string;

	/**
	 * @type {string} The permalink to this players profile.
	 * @readonly
	 */
	profileURL(): string {
		return `https://steamcommunity.com/profiles/${this.steamID}`;
	}
}

export class PlayerAchievements extends Player {

    gameName: string;
    achievements: Achievement[];

	constructor(player: any) {
		super();
		this.steamID = player.steamID;
		this.gameName = player.gameName;
		this.achievements = player.achievements.map(achievement => new Achievement(achievement));
	}
}

export class PlayerBadges {

    badges: Badge[];
    playerXP: number;
    playerLevel: number;
    playerNextLevelXP: number;
    playerCurrentLevelXP: number;

	constructor(player: any) {
		this.badges = player.badges.map(badge => new Badge(badge));
		this.playerXP = player.player_xp;
		this.playerLevel = player.player_level;
		this.playerNextLevelXP = player.player_xp_needed_to_level_up;
		this.playerCurrentLevelXP = player.player_xp_needed_current_level;
	}
}

export class PlayerBans extends Player {

    communityBanned: boolean;
    vacBanned: boolean;
    daysSinceLastBan: number;
    economyBan: boolean;
    vacBans: number;
    gameBans: number;

	constructor(player: any) {
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

export class PlayerServers extends Player {

    banned: boolean;
    expires: number;
    lastActionTime: number;
    servers: GameServer[];

	constructor(player: any, hide: boolean) {
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

export class Friend extends Player {

    relationship: any;
    friendSince: number;

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

export class Game {
    name: string;
    appID: string;
    playTime: any;
    playTime2: any;
    logoURL: string;
    iconURL: string;

	constructor(game) {
		this.name = game.name;
		this.appID = game.appid;
		this.playTime = game.playtime_forever;
		this.playTime2 = game.playtime_2weeks || 0;
		this.logoURL = `${cdn}/${game.appid}/${game.img_logo_url}.jpg`;
		this.iconURL = `${cdn}/${game.appid}/${game.img_icon_url}.jpg`;
	}
}

export class GameServer {

    appID: string;
    actor: any;
    memo: any;
    token: any;
    deleted: boolean;
    expired: boolean;
    lastLoginTime: number;

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

export class PlayerStats extends Player {

    game: string;
    stats: object;
    achievements: object;

	constructor(player) {
		super();
		this.steamID = player.steamID;
		this.game = player.gameName;
		if (player.stats)
			this.stats = objectify(player.stats);
		if (player.achievements)
			this.achievements = objectify(player.achievements, 'achieved');
	}
}

export class PlayerSummary extends Player {

    avatar: {small: string, medium: string, large: string};
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

	constructor(player: any) {
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

export class RecentGame extends Game {
	constructor(game) {
		super(game);
		this.name = game.name;
		this.logoURL = `${cdn}/${game.appid}/${game.img_logo_url}.jpg`;
		this.iconURL = `${cdn}/${game.appid}/${game.img_icon_url}.jpg`;
	}
}

export class Server {

    address: any;
    appID: string;
    game: any;
    gmsindex: any;
    lan: any;
    port: number;
    region: any;
    secure: any;
    specPort: number;

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

/**
 * @typedef {App}
 * @property {string} appid The app's ID
 * @property {string} name The app's name
 */
export class App {
	constructor(public appid: string, public name: string) {
    }
}