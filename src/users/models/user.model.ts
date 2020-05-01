import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Field, ObjectType, HideField } from "@nestjs/graphql";
import { Role } from "./role.enum";

@Entity()
@ObjectType()
export class User {

    @Field() @PrimaryGeneratedColumn("uuid")
    id:string;

    @Field()
    @Column()
    name:string;

    @Field()@Column()
    email:string;

    @Column()
    @Field(type =>Role)
    role:Role;

    @HideField()@Column()
    password:string;

}