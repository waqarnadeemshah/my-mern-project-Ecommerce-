import { Fragment, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { fetchallcat, fetchproductbycat, searchProducts } from "../features/categoryslice";

function Navbar() {
  const { user, token } = useSelector((store) => store.auth);
  const { Categories } = useSelector((s) => s.category);
  const item = useSelector((store) => store.cart);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchallcat());
  }, [dispatch]);

  const handlelogout = async (e) => {
    try {
      e.preventDefault();
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (error) {
      toast.error("please login again");
    }
  };

  const handlecat = async (maincatid, subCategory) => {
    await dispatch(fetchproductbycat({ maincatid, subCategory }));
    navigate("/products");
    setOpen(false);
  };

  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   if (searchValue.trim()) {
  //     navigate(`/search?query=${searchValue}`);
  //     setSearchValue("");
  //   }
  // };

  const handleSearchSubmit = (e) => {
  e.preventDefault();
  dispatch(searchProducts(searchValue));
  navigate("/products");
};

  return (
    <div className="bg-white">
      {/* ---------------- MOBILE MENU ---------------- */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/25" />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Search bar for mobile */}
            <div className="px-4 py-2">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </form>
            </div>

            {/* Links */}
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <Link to="/" className="block p-2 font-medium text-gray-900" onClick={() => setOpen(false)}>
                Home
              </Link>
              <Link to="/" className="block p-2 font-medium text-gray-900" onClick={() => setOpen(false)}>
                About
              </Link>
            </div>

            {/* Dynamic Categories */}
            <TabGroup className="mt-2">
              <TabList className="-mb-px flex space-x-8 px-4">
                {Categories?.map((category) => (
                  <Tab key={category._id} className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600">
                    {category.name}
                  </Tab>
                ))}
              </TabList>
              <TabPanels as={Fragment}>
                {Categories?.map((category) => (
                  <TabPanel key={category._id} className="space-y-10 px-4 pt-10 pb-8">
                    {category.subCategories?.map((section) => (
                      <div key={section.name}>
                        <p className="font-medium text-gray-900">{section.name}</p>
                        <ul className="mt-6 flex flex-col space-y-6">
                          {section.items?.map((item) => (
                            <li key={item} className="flow-root">
                              <button onClick={() => handlecat(category._id, item)} className="-m-2 block p-2 text-gray-500">
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
                <button onClick={handlelogout} className="-m-2 block p-2 font-medium text-red-600">
                  Logout
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 px-4 py-6 space-y-4">
                <Link to="/login" onClick={() => setOpen(false)} className="-m-2 block p-2 font-medium text-gray-900">
                  Sign in
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="-m-2 block p-2 font-medium text-gray-900">
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
              <button type="button" onClick={() => setOpen(true)} className="rounded-md p-2 text-gray-400 lg:hidden">
                <Bars3Icon className="h-6 w-6" />
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

              {/* Categories */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {Categories?.map((category) => (
                    <Popover key={category._id} className="flex">
                      <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-800 data-open:text-indigo-600">
                        {category.name}
                        <span className="absolute inset-x-0 -bottom-px h-0.5 transition group-data-open:bg-indigo-600" />
                      </PopoverButton>
                      <PopoverPanel className="absolute inset-x-0 top-full z-20 w-full bg-white text-sm text-gray-500">
                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-3 gap-x-8 gap-y-10 py-16">
                              {category.subCategories?.map((section) => (
                                <div key={section.name}>
                                  <p className="font-medium text-gray-900">{section.name}</p>
                                  <ul className="mt-6 space-y-6">
                                    {section.items?.map((item) => (
                                      <li key={item}>
                                        <button onClick={() => handlecat(category._id, item)} className="hover:text-gray-800">
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
                  <Link to="/" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                    Home
                  </Link>
                  <Link to="/" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                    About
                  </Link>
                </div>
              </PopoverGroup>

              {/* Search bar for desktop */}
              <div className="hidden lg:block lg:ml-6">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </form>
              </div>

              {/* Right side */}
              <div className="ml-auto flex items-center space-x-4">
                {user && token ? (
                  <button onClick={handlelogout} className="text-sm font-medium text-gray-700 hover:text-red-800">
                    Logout
                  </button>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      Sign in
                    </Link>
                    <Link to="/signup" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      Create account
                    </Link>
                  </div>
                )}
                <Link to="/cart" className="ml-4 flex items-center">
                  <ShoppingBagIcon className="h-6 w-6 text-gray-400" />
                  <span className="ml-2 text-sm font-medium text-gray-700">{item.length}</span>
                </Link>
              </div>
              <ToastContainer position="top-right" autoClose={3000} />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
