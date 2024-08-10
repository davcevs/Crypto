const Footer = () => {
  return (
    <footer className="m-auto bg-gray-900 text-white py-8 w-4/6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center items-center">
        <div>
          <h4 className="text-xl font-bold mb-4">Quick Links</h4>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold mb-4">Follow Us</h4>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold mb-4">Contact Us</h4>
          <p>Email: contact@crypto.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Crypto St, Blockchain City, BTC 00000</p>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>&copy; 2024 Crypto Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
