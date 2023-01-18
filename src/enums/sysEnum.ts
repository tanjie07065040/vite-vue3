// 专项标识，与配置文件中的 VITE_GLOB_SYS 对应用做路由筛选
export enum SysEnum {
  // 交通专项
  TRAFFIC = "traffic",
  // 防汛专项
  FLOOD = "flood",
  // 森火专项
  FOREST = "forest",
  // 地灾专项
  GEODISASTER = "geodisaster",
  // 危化
  CHEMICAL = "chemical",
  // 尾矿库
  TAILINGSPOND = "tailingspond",
  // 工贸
  INDUSTRIAL = "industrial",
  // 电梯
  ELEVATOR = "elevator",
  // 消防
  FIRECONTROL = "firecontrol",
  // 人密
  POPULATIONDENSITY = "populationdensity",
  // 综合
  COMPOSITE = "composite",
}
