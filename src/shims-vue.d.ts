/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "vue3-eventbus" {
  const value: any;
  export default value;
}
declare module "*.json" {
  const value: any;
  export default value;
}

declare module "js-cookie" {
  const value: any;
  export default value;
}

declare module "*.js" {
  const value: any;
  export default value;
}
