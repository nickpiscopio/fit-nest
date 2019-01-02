export class Route {
  // Website Parameters.
  public static readonly PARAM_ERROR = 'error';

  // Website Routes.
  public static readonly ROOT = '/';
  public static readonly LOGIN = 'login';
  public static readonly LOGIN_ERROR = Route.LOGIN + '?' + Route.PARAM_ERROR + '=true';
  public static readonly CHALLENGE = 'challenge';
  public static readonly PARAM_CHALLENGE_ID = 'id';
  public static readonly CHALLENGE_USER_EDIT = Route.CHALLENGE + '/:' + Route.PARAM_CHALLENGE_ID;
  public static readonly SETTINGS = 'settings';

  // API Routes.
  public static readonly API_USER = '/user';
  public static readonly API_USER_AUTHORIZE = Route.API_USER + '/authorize';
  public static readonly API_USER_AUTHORIZE_VERIFY = Route.API_USER_AUTHORIZE + '/verify';
  public static readonly API_CHALLENGE = '/challenge';
  public static readonly API_SETTINGS = '/settings';
}
