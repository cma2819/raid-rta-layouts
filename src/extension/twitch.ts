import axios from 'axios';
import { ApiClient, RefreshableAuthProvider, StaticAuthProvider } from 'twitch';
import { Tokens, Twitch } from '../nodecg/generated/lib';
import { NodeCG } from './nodecg';

const TWITCH_SCOPES = ['user:read:email'];

let apiClient: ApiClient;

export const twitch = async (nodecg: NodeCG): Promise<void> => {
  const logger = new nodecg.Logger('Twitch');

  const twitchTokensRep = nodecg.Replicant('twitchTokens', { defaultValue: null });
  const config = nodecg.bundleConfig.twitch;

  // Validate config
  if (!(config.key && config.secret)) {
    logger.warn('Twitch config is invalid.');
    logger.warn('You cannot call twitch api and receive channel info.');
    return;
  }

  const getTokensWithClientCredentialsFlow = async (clientId: string, secret: string, scopes: Array<string>): Promise<Tokens> => {
    const queryParams = new URLSearchParams({
      'client_id': clientId,
      'client_secret': secret,
      'grant_type': 'client_credentials',
      'scope': scopes.join(' '),
    });
    try {
      const response = await axios.post('https://id.twitch.tv/oauth2/token?' + queryParams.toString());
      return {
        accessToken: response.data.access_token,
        expiryTimestamp: Date.now() + (parseInt(response.data.expires_in) * 1000),
      };
    } catch (e) {
      logger.error('Failed to get access token from Twitch.');
      throw e;
    }
  }

  // Initialize tokens
  if (!twitchTokensRep.value) {
    try {
      const tokens = await getTokensWithClientCredentialsFlow(
        config.key,
        config.secret,
        TWITCH_SCOPES
      );
      logger.debug(JSON.stringify(tokens));
      twitchTokensRep.value = tokens;
    } catch (e) {
      logger.error('Failed to get access token from Twitch.');
      logger.error(e);
    }
  }

  // Initialize api client
  const tokens = twitchTokensRep.value;
  if (!tokens) {
    return;
  }
  const authProvider = new StaticAuthProvider(config.key, tokens.accessToken);
  apiClient = new ApiClient({ authProvider });
}

export const getTwitchDataByNames = async (names: Array<string>): Promise<Array<Twitch>> => {
  return (await apiClient.helix.users.getUsersByNames(names))
    .map(user => ({
      id: user.id,
      login: user.name,
      displayName: user.displayName,
      profileImageUrl: user.profilePictureUrl,
    }));
}