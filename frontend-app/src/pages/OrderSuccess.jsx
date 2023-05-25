import React from "react";

const OrderSuccess = () => {
  React.useEffect(() => {
    setTimeout(() => {
      window.location.href = "/orders";
    }, 5000);
  }, []);

  let timeleft = 3;
  const countdown = () => {
    let downloadTimer = setInterval(function () {
      if (timeleft === 0) {
        clearInterval(downloadTimer);
      }
      document.getElementById("countdown").innerHTML = timeleft.toString();
      timeleft -= 1;
    }, 1000);
  };
  countdown();

  return (
    <div className="mt-12 flex w-full flex-col items-center justify-center text-slate-300">
      <div className="rounded-2xl border border-slate-200/20 bg-bkg-2 p-5  ">
        <h1 className="mb-3 text-3xl text-white ">Order</h1>

        <section className="max-h-[400px] space-y-4  bg-bkg-2 p-5  px-7  ">
          Your order was successful!
          <div className="mt-4 ">
            Redirecting to orders in <span id="countdown"></span>...
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderSuccess;
