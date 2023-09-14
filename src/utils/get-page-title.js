/*
 * @Author: ZhangYeLei
 * @Date: 2021-07-05 14:54:42
 * @LastEditTime: 2022-05-27 16:22:38
 * @LastEditors: ZhangYeLei
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Admin Template'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
