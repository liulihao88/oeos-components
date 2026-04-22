import { computed, inject, type ComputedRef } from 'vue'

export const GLOBAL_COMPONENT_CONFIG_KEY = 'GLOBAL_COMPONENT_CONFIG'

type GlobalComponentConfig = Record<string, Record<string, any>>

const useGlobalComponentConfig = <T extends Record<string, any>>(componentKey: string, props: T) => {
  const globalConfig = inject<GlobalComponentConfig>(GLOBAL_COMPONENT_CONFIG_KEY, {})

  return computed(() => {
    return {
      ...props,
      ...globalConfig?.[componentKey],
    }
  }) as ComputedRef<T & Record<string, any>>
}

export default useGlobalComponentConfig
