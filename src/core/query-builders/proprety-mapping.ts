import { MetadataExtractor } from "../metadata/metadata-extractor";
import { LilORMType } from "../types";
import { TypesHelper } from "../types-helper";

export interface PropertyMapping<T> {
  entityProperty: string;
  columnName: string;
  columnType: LilORMType;
}

export function getPropertyMappings<T>(
  entityClass: new () => T extends object ? T : any
): PropertyMapping<T>[] {
  const propertyMappings: PropertyMapping<T>[] = [];

  for (const propertyName of Object.keys(new entityClass())) {
    const columnMetadata = MetadataExtractor.getColumnMetadata(
      new entityClass(),
      propertyName
    );

    if (columnMetadata) {
      const columnName = columnMetadata.name || propertyName;
      const columnType = columnMetadata?.type;
      propertyMappings.push({
        entityProperty: propertyName,
        columnName,
        columnType,
      });
    }
  }

  return propertyMappings;
}

export function valueQueryFormatter(value: any): string {
  if (value === null) return `NULL`;
  if (TypesHelper.isString(value)) return `${value}`; // Assuming you have an escape function
  if (TypesHelper.isDate(value)) return `'${value.toISOString()}'`; // Convert to ISO string
  if (TypesHelper.isBoolean(value)) return value ? "true" : "false";
  if (TypesHelper.isNumber(value)) return value.toString();
  if (TypesHelper.isJSONObject(value)) return `'${JSON.stringify(value)}'`;
  throw new Error("Not supported type");
}
