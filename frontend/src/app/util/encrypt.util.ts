export class Encrypt {

  public static encode(raw: string): string {
    return btoa(raw);
  }

  public static decode(encodedString: string): string {
    return atob(encodedString);
  }
}
