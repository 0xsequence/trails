import { useEffect, useState } from "react"

export function useQueryParams() {
  const [queryParams, setQueryParams] = useState<URLSearchParams>(
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams(),
  )

  useEffect(() => {
    const updateQueryParams = () => {
      setQueryParams(new URLSearchParams(window.location.search))
    }

    // Check on popstate (back/forward navigation)
    window.addEventListener("popstate", updateQueryParams)

    // Check on pushState/replaceState
    const originalPushState = window.history.pushState
    const originalReplaceState = window.history.replaceState

    window.history.pushState = function () {
      // biome-ignore lint/complexity/noArguments: TODO: To fix
      originalPushState.apply(this, arguments as any)
      updateQueryParams()
    }

    window.history.replaceState = function () {
      // biome-ignore lint/complexity/noArguments: TODO: To fix
      originalReplaceState.apply(this, arguments as any)
      updateQueryParams()
    }

    return () => {
      window.removeEventListener("popstate", updateQueryParams)
      window.history.pushState = originalPushState
      window.history.replaceState = originalReplaceState
    }
  }, [])

  const getParam = (key: string): string | null => {
    return queryParams.get(key)
  }

  const hasParam = (key: string, value?: string): boolean => {
    if (value) {
      return queryParams.get(key) === value
    }
    return queryParams.has(key)
  }

  const setParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(queryParams)
    newParams.set(key, value)
    const url = new URL(window.location.href)
    url.search = newParams.toString()
    window.history.pushState({}, "", url.toString())
    setQueryParams(newParams)
  }

  const removeParam = (key: string) => {
    const newParams = new URLSearchParams(queryParams)
    newParams.delete(key)
    const url = new URL(window.location.href)
    url.search = newParams.toString()
    window.history.pushState({}, "", url.toString())
    setQueryParams(newParams)
  }

  return {
    queryParams,
    getParam,
    hasParam,
    setParam,
    removeParam,
  }
}
