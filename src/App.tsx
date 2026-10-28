import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <input type="checkbox" id="nav-toggle" className="peer sr-only" />

      <header className="border-b border-gray-100">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-2 text-emerald-700">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.75"
              stroke="currentColor"
              className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 20l7-15 4 9 3-6 4 12H3Z" />
            </svg>
            <span className="text-sm font-semibold tracking-tight text-gray-900">Fernweg Supply</span>
          </a>

          <input type="text"className='border rounded ' />

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              className="rounded-md p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            >
              <span className="sr-only">Search</span>
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>

            <a
              href="#"
              className="relative rounded-md p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            >
              <span className="sr-only">Cart, 2 items</span>
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <span
                className="absolute top-0.5 right-0.5 flex size-4 items-center justify-center rounded-full bg-emerald-700 text-[10px] font-medium text-white"
              >
                2
              </span>
            </a>

            <label
              htmlFor="nav-toggle"
              id="nav-toggle-label"
              aria-expanded="false"
              aria-controls="mobile-nav"
              className="cursor-pointer rounded-md p-2 text-gray-600 transition peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-700 peer-focus-visible:ring-offset-2 hover:bg-gray-100 md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </label>
          </div>
        </div>

        <nav
          id="mobile-nav"
          aria-label="Global Mobile"
          className="hidden border-t border-gray-100 peer-checked:block md:hidden"
        >
          <ul className="space-y-1 px-4 py-4 text-sm">
            <li>
              <a href="#" className="block rounded-lg bg-gray-100 px-3 py-2 font-medium text-gray-900">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="block rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50">Guides</a>
            </li>
            <li>
              <a href="#" className="block rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50">About</a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-xs text-gray-500">
            <li><a href="#" className="hover:text-gray-800">Home</a></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-gray-800">Tents &amp; shelters</li>
          </ol>
        </nav>

        <div className="mt-4 sm:flex sm:items-end sm:justify-between">
          <div className="max-w-lg">
            <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Tents &amp; shelters</h1>
            <p className="mt-2 text-sm text-gray-600">
              Four-season and three-season shelters, tested above the treeline before they reach the
              shop floor.
            </p>
          </div>

          <p className="mt-4 text-sm text-gray-500 sm:mt-0">18 results</p>
        </div>

        <div className="mt-6 block lg:hidden">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            Filters &amp; sorting
          </button>
        </div>

        <div className="mt-6 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
          <div className="hidden space-y-6 lg:block">
            <div>
              <label htmlFor="SortBy" className="block text-xs font-medium text-gray-700">Sort by</label>
              <select
                id="SortBy"
                className="mt-1 w-full rounded-md border-gray-300 text-sm focus:border-emerald-600 focus:ring-emerald-600"
              >
                <option>Most popular</option>
                <option>Price, low to high</option>
                <option>Price, high to low</option>
                <option>Newest</option>
              </select>
            </div>

            <fieldset className="border-t border-gray-200 pt-6">
              <legend className="text-xs font-medium text-gray-700">Season rating</legend>
              <div className="mt-3 space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="size-4 rounded-sm border-gray-300 text-emerald-700 focus:ring-emerald-600"
                  />
                  <span className="text-sm text-gray-700">3-season (11)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="size-4 rounded-sm border-gray-300 text-emerald-700 focus:ring-emerald-600"
                  />
                  <span className="text-sm text-gray-700">4-season (7)</span>
                </label>
              </div>
            </fieldset>

            <fieldset className="border-t border-gray-200 pt-6">
              <legend className="text-xs font-medium text-gray-700">Capacity</legend>
              <div className="mt-3 space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="size-4 rounded-sm border-gray-300 text-emerald-700 focus:ring-emerald-600"
                  />
                  <span className="text-sm text-gray-700">1 person (4)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="size-4 rounded-sm border-gray-300 text-emerald-700 focus:ring-emerald-600"
                  />
                  <span className="text-sm text-gray-700">2 person (9)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="size-4 rounded-sm border-gray-300 text-emerald-700 focus:ring-emerald-600"
                  />
                  <span className="text-sm text-gray-700">3+ person (5)</span>
                </label>
              </div>
            </fieldset>

            <fieldset className="border-t border-gray-200 pt-6">
              <legend className="text-xs font-medium text-gray-700">Price</legend>
              <div className="mt-3 flex items-center gap-3">
                <label className="flex items-center gap-1">
                  <span className="text-sm text-gray-500">$</span>
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full rounded-md border-gray-300 text-sm focus:border-emerald-600 focus:ring-emerald-600"
                  />
                </label>
                <span className="text-gray-400">&ndash;</span>
                <label className="flex items-center gap-1">
                  <span className="text-sm text-gray-500">$</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full rounded-md border-gray-300 text-sm focus:border-emerald-600 focus:ring-emerald-600"
                  />
                </label>
              </div>
            </fieldset>
          </div>

          <div className="mt-6 lg:col-span-3 lg:mt-0">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
              <li>
                <a href="#" className="group block">
                  <div className="relative overflow-hidden rounded-lg bg-gray-100">
                    <span
                      className="absolute top-2 left-2 z-10 rounded-full bg-white px-2 py-1 text-[10px] font-medium text-gray-900"
                    >
                      New
                    </span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800"
                      className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-3 text-sm font-medium text-gray-900">Kestrel 2P Ultralight</h3>
                  <p className="mt-1 text-xs text-gray-500">3-season &middot; 1.4kg</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">$389</p>
                </a>
              </li>

              <li>
                <a href="#" className="group block">
                  <div className="relative overflow-hidden rounded-lg bg-gray-100">
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&q=80&w=800"
                      className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-3 text-sm font-medium text-gray-900">Cairn 1P Solo</h3>
                  <p className="mt-1 text-xs text-gray-500">3-season &middot; 0.9kg</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">$329</p>
                </a>
              </li>

              <li>
                <a href="#" className="group block">
                  <div className="relative overflow-hidden rounded-lg bg-gray-100">
                    <span
                      className="absolute top-2 left-2 z-10 rounded-full bg-amber-400 px-2 py-1 text-[10px] font-medium text-gray-900"
                    >
                      3 left
                    </span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=800"
                      className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-3 text-sm font-medium text-gray-900">Basecamp 4P Expedition</h3>
                  <p className="mt-1 text-xs text-gray-500">4-season &middot; 4.1kg</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">$649</p>
                </a>
              </li>

              <li>
                <a href="#" className="group block">
                  <div className="relative overflow-hidden rounded-lg bg-gray-100">
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&q=80&w=800"
                      className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-3 text-sm font-medium text-gray-900">Ridgeline 3P Family</h3>
                  <p className="mt-1 text-xs text-gray-500">3-season &middot; 2.6kg</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">$419</p>
                </a>
              </li>

              <li>
                <a href="#" className="group block">
                  <div className="relative overflow-hidden rounded-lg bg-gray-100">
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1445308394109-4ec2920981b1?auto=format&fit=crop&q=80&w=800"
                      className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-3 text-sm font-medium text-gray-900">Summit 2P Storm</h3>
                  <p className="mt-1 text-xs text-gray-500">4-season &middot; 2.2kg</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">$589</p>
                </a>
              </li>

              <li>
                <a href="#" className="group block">
                  <div className="relative overflow-hidden rounded-lg bg-gray-100">
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&q=80&w=800"
                      className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-3 text-sm font-medium text-gray-900">Hollow 1P Bivy</h3>
                  <p className="mt-1 text-xs text-gray-500">3-season &middot; 0.6kg</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">$219</p>
                </a>
              </li>
            </ul>

            <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-1">
              <a
                href="#"
                className="inline-flex size-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 rtl:rotate-180"
              >
                <span className="sr-only">Previous</span>
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <a
                href="#"
                className="inline-flex size-8 items-center justify-center rounded-md bg-emerald-700 text-sm font-medium text-white"
              >
                1
              </a>
              <a
                href="#"
                className="inline-flex size-8 items-center justify-center rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                2
              </a>
              <a
                href="#"
                className="inline-flex size-8 items-center justify-center rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                3
              </a>

              <a
                href="#"
                className="inline-flex size-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 rtl:rotate-180"
              >
                <span className="sr-only">Next</span>
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
