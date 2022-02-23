export const sourceMapperDeserializer = {
  beforeDeserialize: function (
    callback: (arg0: null, arg1: any) => void,
    jsonValue: any,
    jsonParentValue: { [x: string]: { [x: string]: any; }; },
    propNameOrIndex: string | number,
    context: any,
    propDef: any
  ) {
    callback(null, jsonParentValue["sourceAsMap"][propNameOrIndex]);
  }
};
