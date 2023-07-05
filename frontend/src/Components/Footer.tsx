import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <footer className=" text-gray-800 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="md:gap-4  flex md:flex-row flex-col items-center justify-center">
          <a href="/about" className="hover:underline">
            About Us
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <a href="/shipping" className="hover:underline">
            Shipping
          </a>
          <a href="/returns" className="hover:underline">
            Returns
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
        </div>
        <div className="flex mt-4 md:mt-0 gap-2">
          <FacebookIcon/>
          <TwitterIcon/>
          <InstagramIcon/>
        </div>
      </div>
      <p className="text-center mt-4">&copy; {new Date().getFullYear()} Clother. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
