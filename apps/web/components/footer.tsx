import { Code2 } from "lucide-react";
import Link from "next/link";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t bg-black my-0 border-gray-200 dark:border-gray-800">
      <div className="mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-11 gap-y-6 sm:gap-y-0 sm:grid-cols-12">
          <div className="ml-4 col-span-9 sm:mx-5 sm:col-span-5 md:col-span-6 lg:col-span-6">
            <Link
              href={"/"}
              className="flex items-center space-x-2.5 ml-1"
              style={{ cursor: "pointer" }}
            >
              <div className="flex relative rounded-lg p-2 bg-gradient-to-br from-blue-500 to-purple-600">
                <Code2 className="-scale-90 text-white" />
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                <h1 className="text-[20px] font-semibold">CodeBooth</h1>
              </span>
            </Link>
          </div>
          <div className="ml-5 sm:-ml-3 mt-3 sm:-mt-1 col-span-9 sm:col-span-4 md:col-span-3 lg:col-span-4">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 duration-300 hover:text-purple-700 dark:hover:text-purple-500"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 duration-300 hover:text-purple-700 dark:hover:text-purple-600"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-6 ml-5 sm:ml-10 sm:-mt-1 col-span-3 mr-10 sm:col-span-3 md:col-span-3 lg:col-span-2">
            <h3 className="font-semibold min-w-48 text-gray-800 dark:text-gray-200 mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-600 duration-300 hover:text-purple-700 dark:text-gray-400 dark:hover:text-purple-600"
              >
                <FaDiscord className="w-6 h-6" />
                <span className="sr-only">Discord</span>
              </Link>
              <Link
                href="https://github.com/Pritam12F/"
                className="text-gray-600 duration-300 hover:text-blue-700 dark:text-gray-400 dark:hover:text-purple-600"
              >
                <FaGithub className="w-6 h-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://x.com/pritam121f"
                className="text-gray-600 duration-300 hover:text-blue-700 dark:text-gray-400 dark:hover:text-purple-600"
              >
                <FaTwitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            © 2025 CodeBooth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
