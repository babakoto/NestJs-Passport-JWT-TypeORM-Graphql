import { registerEnumType } from "@nestjs/graphql";

export enum Role {
    ADMIN="ADMIN",
    CLIENT="CLIENT"
}

registerEnumType(Role, {
    name: 'Role',
  });