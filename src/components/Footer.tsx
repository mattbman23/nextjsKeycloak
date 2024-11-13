export const Footer = ({ className }: { className?: string }) => {
  const footerLinks = ["About", "Privacy Policy", "Licensing", "Contact"];
  return (
    <footer
      className={`${className} bg-white rounded-lg shadow m-4 dark:bg-gray-800`}
    >
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="#" className="hover:underline">
            Template™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          {footerLinks.map((link, idx) => (
            <li key={idx}>
              <a href="#" className="hover:underline me-4 md:me-6">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
