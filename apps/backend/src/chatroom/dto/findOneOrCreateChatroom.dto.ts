import {ArrayMaxSize, ArrayMinSize, IsArray, IsString, IsUUID, Length} from "class-validator";

export default class FindOneOrCreateChatroomDto {

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsUUID('all', { each: true })
  userIds: string[]

}