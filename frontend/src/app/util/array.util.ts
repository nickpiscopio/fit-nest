export class ArrayUtil {
  public static getArrayFromStringEnum(enumeration: object): String[] {
    return Object.values(enumeration);
  }

  public static getArrayFromNumEnum(enumeration: object): Number[] {
    return Object.keys(enumeration)
      .filter(ArrayUtil.isAString)
      .map(key => enumeration[key]);
  }

  public static isAString(value: any): boolean {
    return isNaN(Number(value));
  }
}
