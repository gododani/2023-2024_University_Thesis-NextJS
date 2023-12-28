import Image from "next/image";
import Link from "next/link";

const Footer = ({ messages }: any) => {
  // Footer translations
  const { Footer } = messages;

  return (
    <footer className="w-full text-gray-700 bg-gray-100 body-font">
      {/* Top */}
      <div className="flex flex-col lg:flex-row items-center justify-evenly">
        {/* Left Side */}
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg my-8 text-center">
          <Image
            width={500}
            height={500}
            className="mx-auto h-36 sm:h-40 rounded-full w-auto"
            src="https://scontent.fbud5-1.fna.fbcdn.net/v/t39.30808-6/343576513_1551407625390047_8347504228527958171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=EbY8Mj-0FtYAX-H_pMT&_nc_ht=scontent.fbud5-1.fna&oh=00_AfD7hkchn_-RQt0Jc33oTjhGCTXLj-ikLB51EgLeyKHIlA&oe=65912B94"
            alt="Bek Autó-Motor"
          />

          <p className="mt-4 px-4 text-sm">{Footer.aboutUs}</p>
        </div>

        {/* Right Side */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-0 my-8">
          {/* Useful links */}
          <div className="w-full sm:self-start max-w-60 lg:max-w-xs">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
              {Footer.usefulLinks}
            </h2>
            <div className="flex flex-col gap-2 sm:gap-4 items-start justify-center">
              <div className="">
                <Link className="cursor-pointer hover:text-gray-900" href={"/"}>
                  {Footer.home}
                </Link>
              </div>
              <div className="">
                <Link
                  className="cursor-pointer hover:text-gray-900"
                  href={"/products"}
                >
                  {Footer.products}
                </Link>
              </div>
              <div className="">
                <Link
                  className="cursor-pointer hover:text-gray-900"
                  href={"/rent"}
                >
                  {Footer.rent}
                </Link>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="w-full max-w-60 lg:max-w-xs">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase">
              {Footer.contactUs}
            </h2>
            <div className="flex flex-col gap-2 sm:gap-4 items-start justify-center">
              {/* Email */}
              <div className="flex gap-3 items-center justify-center sm:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 512 512"
                >
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
                <p className="hover:text-gray-900">{Footer.email}</p>
              </div>

              {/* Phone */}
              <div className="flex gap-3 items-center justify-center sm:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 512 512"
                >
                  <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                </svg>
                <p className="hover:text-gray-900">{Footer.phone}</p>
              </div>

              {/* Address */}
              <div className="flex gap-3 items-left justify-center sm:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 384 512"
                  className="self-center"
                >
                  <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                </svg>
                <p className="hover:text-gray-900">{Footer.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom*/}
      <div className="bg-gray-300">
        <div className="flex items-center justify-between px-5 py-4">
          {/* Copy right */}
          <p className="text-sm text-gray-700 capitalize text-center">
            &#169; {Footer.copyRight}
          </p>

          {/* Social media links */}
          <div className="flex items-center justify-center">
            {/* Facebook */}
            <Link
              className="text-gray-500 cursor-pointer hover:text-gray-700"
              href={"https://www.facebook.com/bekautomotor"}
              target="_blank"
              aria-label="Facebook Link icon to Bek Autó-Motor Facebook page"
            >
              <svg fill="blue" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </Link>

            {/* Instagram */}
            <Link
              className="ml-3 text-gray-500 cursor-pointer hover:text-gray-700"
              href={
                "https://www.instagram.com/explore/locations/2056191244610896/bek-auto-motor/?next=%2F_charlottegreen%2Ffeed%2F"
              }
              target="_blank"
              aria-label="Instagram Link icon to Bek Autó-Motor Instagram page"
            >
              <svg
                fill="none"
                stroke="#C13584"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </Link>

            {/* Youtube */}
            <Link
              className="ml-3 text-gray-500 cursor-pointer hover:text-gray-700"
              href={"https://www.youtube.com/@bekauto-motor997"}
              target="_blank"
              aria-label="Youtube Link icon to Bek Autó-Motor Youtube page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                color="red"
              >
                <path
                  fill="currentColor"
                  d="M21.57 7.55a2.94 2.94 0 00-2.06-2C17.81 5.2 12 5.2 12 5.2s-5.81 0-7.51.35a2.94 2.94 0 00-2.06 2A30.94 30.94 0 002 12s.01 3.8.03 5.45a2.94 2.94 0 002.06 2c1.7.35 7.51.35 7.51.35s5.81 0 7.51-.35a2.94 2.94 0 002.06-2c.02-1.65.03-5.45.03-5.45s-.01-3.8-.03-5.45zM9.75 15.92V8.08l6.58 3.92-6.58 3.92z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
