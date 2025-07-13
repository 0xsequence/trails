import { DEMOS_URL, DOCS_URL } from "@/config"

export const SiteHeader = () => {
  return (
    <header className="flex max-sm:flex-col items-center justify-between min-h-[3.75rem] border-b border-slate-300 sticky top-0 bg-white/90 backdrop-blur-lg z-50 isolate">
      <div className="flex items-center gap-12 mx-auto max-w-screen-xl w-full px-5 py-3">
        <a href="/" data-discover="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 88 32"
            role="img"
            width="88"
            height="36"
            className="text-black"
            aria-label="Trails"
          >
            <path
              fill="currentColor"
              d="M38.645 28q-1.63 0-2.978-.59-1.332-.605-2.113-1.753-.782-1.148-.782-2.804 0-2.694 2.163-4.144t6.787-1.466l1.747-.016v-.845q0-.972-.582-1.45-.565-.494-1.78-.478a4.6 4.6 0 0 0-1.747.399q-.882.365-1.248 1.37h-4.641q.1-1.864 1.148-3.044t2.794-1.737q1.764-.558 3.943-.558 2.828 0 4.475.654 1.647.638 2.346 1.8.716 1.149.716 2.71V27.68h-4.709l-.482-2.725q-.814 1.737-2.046 2.39-1.231.654-3.011.654Zm1.946-3.49q.566 0 1.081-.191.517-.192.915-.526.4-.351.633-.765t.25-.892v-2.248l-1.398.016q-.865 0-1.797.224-.915.223-1.547.748-.632.51-.632 1.419 0 1.035.748 1.625.75.59 1.747.59m-21.079 3.171V11.203h5.456v4.223q.4-1.29 1.148-2.31a5.5 5.5 0 0 1 1.88-1.626q1.115-.606 2.579-.606.183 0 .316.016.15 0 .183.032v5.148a1 1 0 0 0-.216-.048 2 2 0 0 0-.25-.016q-1.63-.159-2.695.048-1.048.207-1.664.67-.6.461-.848 1.099a4 4 0 0 0-.233 1.386v8.462zm-8.166.207q-2.478 0-3.843-.59-1.347-.605-1.88-1.64-.516-1.052-.516-2.375v-8.367H2.312v-3.713h2.995l1.447-5.052h4.01v5.02h3.776v3.745h-3.776l.016 8.128q0 .494.15.733.166.239.45.319.282.08.681.08h2.512v3.266q-.349.144-1.08.287-.733.16-2.147.16ZM66.568 28q-2.145 0-3.377-.462-1.215-.463-1.78-1.195a3.7 3.7 0 0 1-.716-1.658 12.4 12.4 0 0 1-.133-1.8V4h5.54v18.183c0 .5.077 1.103.321 1.475q.366.542 1.58.685l.75.048.044 3.163q-.532.176-1.098.303a4.6 4.6 0 0 1-1.131.143m-14.584-.319V11.203h5.39v16.478zm-.017-18.326V4.637h5.44v4.718z"
            />
            <path fill="currentColor" d="M66.188 24.375h9.546V28h-9.546z" />
            <path
              fill="currentColor"
              d="M76.3 10.885q3.361 0 5.341 1.402 1.98 1.403 1.996 3.872H78.98a1.86 1.86 0 0 0-.948-1.274q-.749-.447-1.797-.447-1.065 0-1.797.351-.715.335-.715 1.02 0 .526.632.844.633.32 2.013.575l2.513.493q1.547.367 2.511.988.966.606 1.48 1.323.534.717.717 1.434.2.701.199 1.243 0 1.706-.982 2.885-.965 1.179-2.678 1.8-1.697.606-3.86.606-1.796 0-3.51-.573a7.17 7.17 0 0 1-2.928-1.833 5.4 5.4 0 0 1-.88-1.219h7.283c.82 0 1.488-.12 1.998-.343q.766-.335.766-1.02 0-.574-.483-.893-.466-.335-1.647-.525l-2.778-.494q-2.38-.431-3.826-1.579-1.448-1.162-1.464-3.282a4.5 4.5 0 0 1 .848-2.725q.865-1.212 2.545-1.912 1.68-.718 4.11-.717Zm-63.987.295H22.5v3.742H12.312V11.18Z"
            />
          </svg>
        </a>

        <nav
          aria-label="Site"
          className="hidden sm:flex gap-6 items-center text-sm font-medium"
        >
          <a
            rel="noopener noreferrer"
            href={DEMOS_URL}
            target="_blank"
            className="text-black hover:text-gray-600 transition-colors"
          >
            Demo
          </a>
          <a
            rel="noopener noreferrer"
            href={DOCS_URL}
            target="_blank"
            className="text-black hover:text-gray-600 transition-colors"
          >
            Docs
          </a>
        </nav>

        <div className="ml-auto mr-0 flex items-center gap-4">
          <a
            rel="noopener noreferrer"
            data-variant="normal small"
            data-component="button"
            href={DOCS_URL}
            target="_blank"
            className="px-4 py-1.5 border border-gray-400 text-black font-medium rounded-full transition-colors text-sm hover:border-gray-500"
          >
            Start building
          </a>
        </div>
      </div>

      <nav
        aria-label="Site"
        className="flex sm:hidden gap-6 items-center text-sm font-medium w-full py-2 border-t-1 border-slate-300 justify-center"
      >
        <a
          rel="noopener noreferrer"
          href={DEMOS_URL}
          target="_blank"
          className="text-black hover:text-gray-600 transition-colors"
        >
          Demo
        </a>
        <a
          rel="noopener noreferrer"
          href={DOCS_URL}
          target="_blank"
          className="text-black hover:text-gray-600 transition-colors"
        >
          Docs
        </a>
      </nav>
    </header>
  )
}
