/**
 * @typedef {import('./client/account/accountDetail')} AccountDetail
 */
/**
 *  @typedef {import('./client/account/updatePassword')} updatePassword - Define update password function
 */
/**
 *  @typedef {import('./client/account/updateEmail')} updateEmail - Define update password function
 */
/**
 *  @typedef {import('./client/utils/serverList')} listServer - Define update password function
 */
/**
 *  @typedef {import('./client/utils/resourceUsage')} resourceServerUsage - Define update password function
 */
/**
 *  @typedef {import('./client/utils/sendConsoleCommand')} sendConsoleCommand - Define update password function
 */
/**
 *  @typedef {import('./client/utils/sendSignal')} sendSignal - Update signal to server
 */
/**
 *  @typedef {import('./client/account/listUsers')} ListUsers - Update signal to server
 */
/**
 *  @typedef {import('./client/features/nodeStatus')} NodeStatus - Check status node ON/OFF
 */
/**
 *  @typedef {import('./client/features/request')} Request - Request to server
 */
/**
 *  @typedef {import('./client/utils/logs')} LogsConsole - Get logs from server
 */
/**
 * @typedef {Object} ClientManager
 * @property {Object} utils - The utils function manager
 * @property {listServer} utils.serverList - List servers from 
 * @property {resourceServerUsage} utils.resourceUsage - Get resource usage from server
 * @property {sendConsoleCommand} utils.sendConsoleCommand - Send console command to server
 * @property {sendSignal} utils.sendSignal - Send signal to server
 * @property {ListUsers} utils.listUsers - List users from server
 * @property {LogsConsole} utils.logs - Logs from the server
 * @property {Object} account - The Account manager
 * @property {updatePassword} account.updatePassword - Update password function
 * @property {AccountDetail} account.accountDetail - Account detail function
 * @property {updateEmail} account.updateEmail - Update email
 * @property {Object} features
 * @property {NodeStatus} features.nodeStatus - Check status node ON/OFF
 * @property {Request} features.request - Request to server
 */
/**
 * @type {ClientManager}
 */
 let init_client = require(`./client/packages.js`);
 module.exports.client = init_client
/**
 *  @typedef {import('./application/app/createServer')} CreateServer - Create server
 */
/**
 *  @typedef {import('./application/app/suspendServer')} SuspendServer - Suspend server
 */
/**
 *  @typedef {import('./application/app/listUsers')} ListUsersAdmin - List all users from panel
 */
/**
 *  @typedef {import('./application/app/createUser')} CreateUser - Create user
 */
/**
 *  @typedef {import('./application/app/updateUser')} UpdateUser - Update user
 */
/**
 *  @typedef {import('./application/app/serverList')} ServerListAdmin - List all servers from panel
 */
/**
 *  @typedef {import('./application/app/listNode')} ListNode - List all nodes from panel
 */
/**
 * @typedef {Object} ApplicationManager
 * @property {CreateServer} createServer - Create server
 * @property {CreateServer} createServer - Create server
 * @property {SuspendServer} suspend - The suspend function manager
 * @property {ListUsersAdmin} listUsers - List users from server
 * @property {CreateUser} createUser - Create user
 * @property {UpdateUser} updateUser - Update user
 * @property {ServerListAdmin} serverList - List all servers from panel
 * @property {ListNode} listNode - List all nodes from panel
 */
/**
 * @type {ApplicationManager}
 */

let init_application = require(`./application/packages.js`);
module.exports.application = init_application