declare const _default: {
    format: (template: string, json: {
        [key: string]: any;
    }) => string;
    encodeUTF8: (str: string) => string;
    decodeUTF8: (str: string) => string;
    decodeHTML: (html: string) => string;
    encodeHTML: (text: string) => string;
    util_format: (...params: any[]) => string;
    camelCase: (text: string) => string;
    base64URIDecode: (data: string) => string;
    base64URIEncode: (data: string) => string;
};
export default _default;
