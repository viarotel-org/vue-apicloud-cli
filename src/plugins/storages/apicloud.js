/**
 * @desc 设置偏好数据，存储与本地文件系统。
 * @param key 索引名
 * @param value 数据
 */
export function setStorages(key, value) {
  api.setPrefs({
    key: key,
    value: JSON.stringify(value),
  });
}

/**
 * @desc 获取偏好数据
 * @param key 索引名
 * @returns {object} 布尔类型
 */
export function getStorages(key) {
  var value = api.getPrefs({
    sync: true,
    key: key,
  });
  if (value) {
    value = JSON.parse(value);
  }
  return value;
}

/**
 * @desc 移除偏好数据
 * @param key 索引名
 */
export function removeStorages(key) {
  api.removePrefs({
    key: key,
  });
}
