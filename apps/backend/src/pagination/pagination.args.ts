import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class PaginationArgs {
  @Field({ description: "Number of data to be fetched" })
  public readonly first!: number;

  @Field({
    description: "Cursor at the starting point from which to retrieve data",
    nullable: true
  })
  public readonly after?: string;
}
