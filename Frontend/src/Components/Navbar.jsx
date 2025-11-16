

import { Fragment, useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../features/auth";
import { fetchallcat, fetchproductbycat } from "../features/categoryslice";

function Navbar() {
  const { user, token } = useSelector((store) => store.auth);
  const { Categories, loading } = useSelector((s) => s.category);
  const item = useSelector((store) => store.cart);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchallcat());
  }, [dispatch]);

  const handlelogout = async (e) => {
    e.preventDefault();
    await dispatch(logout()).unwrap();
    navigate("/login");
  };

  const handlecat = async (maincatid, subCategory) => {
    const data=await dispatch(fetchproductbycat({maincatid,subCategory}))
    console.log(data)
    navigate("/products");
    setOpen(false);
  };

  return (
    <div className="bg-white">
      {/* ---------------- MOBILE MENU ---------------- */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <Link
                  to="/"
                  className="-m-2 block p-2 font-medium text-gray-900"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  to="/"
                  className="-m-2 block p-2 font-medium text-gray-900"
                  onClick={() => setOpen(false)}
                >
                  About
                </Link>
              </div>
            </div>

            {/* ✅ Dynamic Category Tabs */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {Categories?.map((category) => (
                    <Tab
                      key={category._id}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {Categories?.map((category) => (
                  <TabPanel
                    key={category._id}
                    className="space-y-10 px-4 pt-10 pb-8"
                  >
                    {category.subCategories?.map((section) => (
                      <div key={section.name}>
                        <p className="font-medium text-gray-900">
                          {section.name}
                        </p>
                        <ul className="mt-6 flex flex-col space-y-6">
                          {section.items?.map((item) => (
                            <li key={item} className="flow-root">
                              <button
                                onClick={() =>
                                  handlecat(category._id, item)
                                }
                                className="-m-2 block p-2 text-gray-500"
                              >
                                {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            {/* Auth Buttons for Mobile */}
            {user && token ? (
              <div className="border-t border-gray-200 px-4 py-6">
                <button
                  onClick={handlelogout}
                  className="-m-2 block p-2 font-medium text-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 px-4 py-6 space-y-4">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Create account
                </Link>
              </div>
            )}
          </DialogPanel>
        </div>
      </Dialog>

      {/* ---------------- DESKTOP NAVBAR ---------------- */}
      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white">
          Get free delivery on orders over $100
        </p>

        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <img
                    alt="Logo"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </Link>
              </div>

              {/* ✅ Dynamic Categories */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {Categories?.map((category) => (
                    <Popover key={category._id} className="flex">
                      <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-800 data-open:text-indigo-600">
                        {category.name}
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 -bottom-px h-0.5 transition group-data-open:bg-indigo-600"
                        />
                      </PopoverButton>
                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full z-20 w-full bg-white text-sm text-gray-500"
                      >
                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-3 gap-x-8 gap-y-10 py-16">
                              {category.subCategories?.map((section) => (
                                <div key={section.name}>
                                  <p className="font-medium text-gray-900">
                                    {section.name}
                                  </p>
                                  <ul className="mt-6 space-y-6">
                                    {section.items?.map((item) => (
                                      <li key={item}>
                                        <button
                                          onClick={() =>
                                            handlecat(category._id, item)
                                          }
                                          className="hover:text-gray-800"
                                        >
                                          {item}
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}

                  <Link
                    to="/"
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Home
                  </Link>
                  <Link
                    to="/"
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    About
                  </Link>
                </div>
              </PopoverGroup>

              {/* Right side */}
              <div className="ml-auto flex items-center">
                {user && token ? (
                  <button
                    onClick={handlelogout}
                    className="text-sm font-medium text-gray-700 hover:text-red-800"
                  >
                    Logout
                  </button>
                ) : (
                  <div className="flex items-center space-x-6">
                    <Link
                      to="/login"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/signup"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Create account
                    </Link>
                  </div>
                )}

                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                  </a>
                </div>

                <div className="ml-4 flow-root lg:ml-6">
                  <Link to="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {item.length}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
