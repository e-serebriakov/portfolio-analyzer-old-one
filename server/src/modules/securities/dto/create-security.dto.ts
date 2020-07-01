import { SecurityTypeEnum } from "../schemas/security.schema";

export class CreateSecurityDto {
  readonly symbol!: string;
  readonly currency!: string;
  readonly type!: SecurityTypeEnum;
}
