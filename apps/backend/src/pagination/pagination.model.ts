/* eslint-disable max-classes-per-file */
import { Field, ObjectType } from "@nestjs/graphql";
import type { Type } from "@nestjs/common";

interface PageInfo {
  endCursor: string | undefined;
  hasNextPage: boolean;
}

export interface Edge<T> {
  cursor: string;
  node: T;
}

export interface Connection<T> {
  edges: Edge<T>[];
  nodes: T[];
  pageInfo: PageInfo;
  totalCount: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/prefer-readonly-parameter-types
export function Paginated<T>(classRef: Type<T>): Type<Connection<T>> {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field({ description: "Cursor" })
    public readonly cursor!: string;

    @Field(() => classRef, { description: "Node" })
    public readonly node!: T;
  }

  @ObjectType(`${classRef.name}PageInfo`)
  abstract class PageInfoType {
    @Field({ description: "Boolean value of whether next page exists" })
    public readonly hasNextPage!: boolean;

    @Field(() => String, { description: "End Cursor", nullable: true })
    public readonly endCursor!: string;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements Connection<T> {
    @Field(() => [EdgeType], {
      description: "Edges"
    })
    public readonly edges!: EdgeType[];

    @Field(() => [classRef], {
      description: "Nodes"
    })
    public readonly nodes!: T[];

    @Field({
      description: "Page Info"
    })
    public readonly pageInfo!: PageInfoType;

    @Field({
      description: "Total Count"
    })
    public readonly totalCount!: number;
  }

  return PaginatedType as Type<Connection<T>>;
}

/* eslint-enable max-classes-per-file */
