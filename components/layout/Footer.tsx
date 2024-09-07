import { Separator } from "../ui/separator";

export const Footer = () => {
  return (
    <footer className="bg-slate-100 text-slate-900 pb-8">
      <Separator className="max-w-4xl m-auto mb-20" />

      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo or Brand Name */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold">RSS</h2>
          </div>

          {/* Navigation Links */}
          <div className="mb-4 md:mb-0">
            <ul className="flex space-x-6">
              <li>
                <a href="/tos" className="hover:text-blue-600">
                  Terms of service
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-blue-600">
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@simple-rss.com"
                  className="hover:text-blue-600"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="hover:text-blue-600"
              aria-label="Follow us on Twitter"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.564-2.005.973-3.127 1.195-.897-.959-2.178-1.559-3.594-1.559-2.727 0-4.938 2.213-4.938 4.938 0 .387.043.763.127 1.124C7.69 8.094 4.066 6.13 1.64 3.161c-.427.733-.666 1.584-.666 2.475 0 1.709.869 3.213 2.188 4.099-.807-.026-1.566-.248-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.828-.413.111-.848.171-1.296.171-.315 0-.624-.03-.927-.086.626 1.956 2.444 3.379 4.597 3.42-1.683 1.321-3.808 2.105-6.102 2.105-.397 0-.788-.023-1.175-.068 2.179 1.396 4.768 2.209 7.548 2.209 9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.634.961-.695 1.8-1.56 2.462-2.548l-.047-.02z" />
              </svg>
            </a>
            <a
              href="#"
              className="hover:text-blue-600"
              aria-label="Follow us on GitHub"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.385.599.111.82-.26.82-.577v-2.1c-3.338.724-4.033-1.418-4.033-1.418-.546-1.389-1.333-1.759-1.333-1.759-1.089-.744.083-.729.083-.729 1.204.084 1.838 1.236 1.838 1.236 1.07 1.834 2.808 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.467-2.382 1.235-3.221-.124-.303-.535-1.526.117-3.179 0 0 1.008-.322 3.3 1.23a11.452 11.452 0 013.003-.404c1.018.004 2.045.137 3.003.404 2.291-1.552 3.298-1.23 3.298-1.23.653 1.653.242 2.876.118 3.179.769.839 1.235 1.911 1.235 3.221 0 4.608-2.804 5.622-5.476 5.921.43.372.823 1.104.823 2.224v3.293c0 .319.22.693.824.576C20.565 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-sm text-slate-600 mt-8">
          <p>
            © {new Date().getFullYear()} Minimal RSS Reader. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
