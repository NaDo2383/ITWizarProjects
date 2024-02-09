import _ from "lodash";

/**
 * Object utility
 */
class ObjectUtil {
  /**
   * Check value is object
   * @param {object} object
   * @return {boolean}
   */
  static isObject = (value) => {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  };

  /**
   * Get nested property value from object
   * @param {object} object
   * @param {string} key For example: foo.bar.baz
   * @return {any}
   */
  static getValue = (object, key) => {
    return typeof key === "string" ? _.property(key.split("."))(object) : null;
  };

  /**
   * Set value of object's nested property
   * @param {object} object
   * @param {string} key For example: foo.bar.baz
   * @param {any} value
   */
  static setValue = (object, key, value) => {
    _.set(object, key, value);
  };

  /**
   * Safe JSON parse
   * @param {string} object
   * @return {object}
   */
  static safeJsonParse = (value) => {
    let valid = false;
    let json = {};
    try {
      json = JSON.parse(value);
      valid = true && json !== "null";
    } catch (e) {
      console.log(e);
    }

    return valid && json ? json : null;
  };

  /**
   * Safe JSON parse
   * @param {string} object
   * @return {object}
   */
  static safeJsonStringify = (value) => {
    let valid = false;
    let string = "";
    try {
      string = JSON.stringify(value);
      valid = true;
    } catch (e) {
      console.log(e);
    }

    return valid && string ? string : null;
  };

  /**
   * Form data to json
   * @param {FormData} object
   * @return {object}
   */
  static formDataToJson = (formData) => {
    var data = {};

    try {
      formData.forEach((value, key) => (data[key] = value.trim()));
    } catch (e) {
      console.log(e);
    }

    return data;
  };

  /**
   * Json to form date
   * @param {json} object
   * @return {FormData}
   */
  static jsonToFormData = (json) => {
    let formData = new FormData();

    for (let key in json) {
      formData.append(key, json[key]);
    }

    return formData;
  };
}

export default ObjectUtil;
