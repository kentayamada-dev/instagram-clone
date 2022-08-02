import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class PaginationArgs {
  @Field(() => Number, { description: "Number of data to be fetched", nullable: true })
  public readonly first?: number;

  @Field({
    description: "Cursor at the starting point from which to retrieve data",
    nullable: true
  })
  public readonly after?: string;
}
