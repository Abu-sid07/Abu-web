"use client"

import React, { useEffect, useState } from "react"

type DynamicBlogModule = {
  default?: React.ComponentType
  ModernDevBlog?: React.ComponentType
}

export default function BlogLoader() {
  const [Module, setModule] = useState<React.ComponentType | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    // Try to dynamically import the user's blog component at a conventional path.
    // Ask the user to place their downloaded file at this value is correct `my-app/components/ModernDevBlog.tsx`.
    // Use a variable import path so TypeScript doesn't try to resolve the module at compile time.
    const modulePath = "./ModernDevBlog"

    import(modulePath)
      .then((mod: DynamicBlogModule) => {
        if (!mounted) return
        const LoadedComponent = (mod.default ?? mod.ModernDevBlog ?? null) as React.ComponentType | null
        setModule(() => LoadedComponent)
      })
      .catch((err) => {
        if (!mounted) return
        console.warn("Could not load ModernDevBlog component:", err)
        setError(
          "Blog component not found. Please copy your file into `my-app/components/ModernDevBlog.tsx` and export the component (default or named ModernDevBlog)."
        )
      })
   

    return () => {
      mounted = false
    }
  }, [])

  if (Module) {
    const Comp = Module
    return <Comp />
  }

  return (
    <div className="prose mx-auto p-6">
      {error ? (
        <>
          <h2>Blog not installed</h2>
          <p>
            I couldn&apos;t find the blog component. To install it, copy your file
            <code>ModernDevBlog.tsx</code> into <code>my-app/components/</code>
            and export it as the default export or named export <code>ModernDevBlog</code>.
          </p>
          <p>
            After adding the file, refresh this page. If you want, I can help
            move the file into the project if you paste its contents here.
          </p>
        </>
      ) : (
        <div className="text-center">Loading blog…</div>
      )}
    </div>
  )
}
