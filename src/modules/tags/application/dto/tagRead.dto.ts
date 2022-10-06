import { AutoMap } from "@automapper/classes"

export class TagReadDto {
  @AutoMap()
  id: string
  
  @AutoMap()
  label: string
  
  @AutoMap()
  value: string
  
  @AutoMap()
  description: string
  
  @AutoMap()
  avatarId: string
  
  @AutoMap()
  color: string
  
  @AutoMap()
  type: string
  
  @AutoMap()
  createdAt: Date
  
  @AutoMap()
  updatedAt: Date
}