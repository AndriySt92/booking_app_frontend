const Footer = () => {
    return (
      <div className="bg-blue-800 py-10">
        <div className="container flex mx-auto items-center justify-between">
          <span className="text-3xl text-white font-bold tracking-tight">
            Booking.com
          </span>
          <span className="text-white font-bold tracking-tight flex flex-col gap-4">
            <p className="cursor-pointer">Privacy Policy</p>
            <p className="cursor-pointer">Terms of Service</p>
          </span>
        </div>
      </div>
    );
  };

  export default Footer
  