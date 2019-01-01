import { GroupTypes } from '../enums/user-group.enum';
import { ArrayUtil } from '../util/array.util';

export class UserGroup {
  public static readonly GROUPS = ArrayUtil.getArrayFromStringEnum(GroupTypes);
}
