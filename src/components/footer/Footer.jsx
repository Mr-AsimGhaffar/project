const Footer = () => {
  return (
    <footer className="dark:bg-black">
      <div className="px-4 md:px-44">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-40 py-10 lg:py-20">
          <div className="text-center lg:text-left">
            <div className="flex flex-col lg:flex-row items-center gap-4 py-5 lg:py-10">
              <div>
                <img src="/img/website_logo.svg" alt="logo" width={40} />
              </div>
              <div>
                <h1 className="font-bold text-3xl lg:text-5xl text-[#0071BC] font-robotoSlab tracking-widest">
                  attaq
                </h1>
              </div>
            </div>
            <div>
              <h1 className="font-montserrat font-bold text-xl lg:text-2xl tracking-widest opacity-60 py-5">
                Making Realty Dreams <br /> a Reality
              </h1>
            </div>
            <div className="flex justify-center lg:justify-start items-center gap-4 py-6 lg:py-12">
              <a
                href="https://www.linkedin.com/company/ali-square"
                target="blank"
              >
                <img
                  src="/img/linkedin.svg"
                  alt="linkedin"
                  className="dark:invert dark:sepia dark:saturate-200 dark:hue-rotate-180"
                />
              </a>
            </div>
          </div>
          <div className="text-center lg:text-left">
            <div>
              <h1 className="font-montserrat font-bold text-lg tracking-widest text-[#0071BC] dark:text-white py-6 lg:py-12">
                GET IN TOUCH
              </h1>
            </div>
            <div className="font-montserrat font-medium text-base tracking-wider">
              <div className="flex flex-col lg:flex-row items-center lg:items-center gap-4 py-5">
                <div>
                  <img
                    src="/img/location.svg"
                    alt="location"
                    className="dark:invert dark:sepia dark:saturate-200 dark:hue-rotate-180"
                  />
                </div>
                <div className="opacity-60">
                  <h1 className="text-center lg:text-left">
                    Interlace Plaza 4th floor, Twinhub <br /> I8 Markaz,
                    Islamabad, Pakistan
                  </h1>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center lg:items-center gap-4 py-5">
                <div>
                  <img
                    src="/img/call.svg"
                    alt="call"
                    className="dark:invert dark:sepia dark:saturate-200 dark:hue-rotate-180"
                  />
                </div>
                <div className="opacity-60">
                  <h1 className="text-center lg:text-left">
                    (+39) 349 794 9275
                  </h1>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center lg:items-center gap-4 py-5">
                <div>
                  <img
                    src="/img/email.svg"
                    alt="email"
                    className="dark:invert dark:sepia dark:saturate-200 dark:hue-rotate-180"
                  />
                </div>
                <div className="opacity-60">
                  <h1 className="text-center lg:text-left">
                    support@alisquare.com
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center lg:text-left font-montserrat font-bold text-lg tracking-widest text-[#0071BC] dark:text-white">
            <div>
              <h1 className="py-6 lg:py-12">Explore</h1>
            </div>
            <div>
              <div>
                <h1 className="border-b-2 border-[#0071BC] dark:border-gray-800 py-5">
                  Buy
                </h1>
              </div>
              <div>
                <h1 className="border-b-2 border-[#0071BC] dark:border-gray-800 py-5">
                  Rent
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-10">
        <img src="img/footer_img.svg" alt="footer_img" className="w-full" />
      </div>
    </footer>
  );
};

export default Footer;
