/**
 * 判断是否为空
 */
export function validatenull(val: unknown) {
  if (
    val instanceof Date ||
    typeof val === 'boolean' ||
    typeof val === 'number'
  )
    return false
  if (Array.isArray(val)) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    for (const _ in val) {
      return false
    }
    return true
  } else {
    if (
      val === 'null' ||
      val == null ||
      val === 'undefined' ||
      val === undefined ||
      val === ''
    ) {
      return true
    }
    return false
  }
  return false
}
