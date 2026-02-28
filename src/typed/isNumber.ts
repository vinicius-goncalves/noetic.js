import isType from "./isType";

export default function isNumber(target: unknown): target is Number {
  return isType(target, 'number')
}