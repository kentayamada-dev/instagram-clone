export type MapObjectPropertyToBoolean<ObjectType> = {
  [PropertyKey in keyof ObjectType]: boolean;
};
