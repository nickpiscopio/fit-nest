export class PerformedActivityDatabaseColumns {
  public static readonly ID = 'id';
  public static readonly DATE = 'date';
  public static readonly USER_EMAIL = 'user_email';
  public static readonly ACTIVITY = 'activity';
  public static readonly CHALLENGE_ID = 'challenge_id';
  public static readonly POINTS = 'earned_points';
  // This is not in the performed_activity table in the database.
  // This is a generated name from the SQL.
  public static readonly PARTNERS = 'partners';
}
