import type { Ref, InjectionKey } from 'vue'
export type NameType = string | number

export interface CollapseProps {
  modelValue: NameType[];
  accordion?: boolean;
}
export interface CollapseItemProps {
  name: NameType;
  title?: string;
  disabled?: boolean;
}

export interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleItemClick: (name: NameType) => void;
}


export interface CollapseEmits {
  (e: 'update:modelValue', values: NameType[]): void;
  (e: 'change', values: NameType[]): void;
}


// InjectionKey<T> 实际上是 Vue 对 Symbol 的一个类型扩展 
/** 
provide(collapseContextKey, {
  activeNames,
  handleItemClick
}) 
  这个provive必须传入一个对象，这个对象的属性值是activeNames和handleItemClick
*/
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')