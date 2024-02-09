import logo from '/public/img/auth/logo1.png';
import Footer from '../footer/FooterAuthDefault';
function Default(props) {
  const { maincard } = props;
  return (
    <div className="relative flex">
      <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
        <div className="mb-auto flex flex-col pl-5 pr-5 md:pl-12 md:pr-0 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
          {maincard}
          <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
            <div
              // style={{ backgroundImage: authImg ? `url(${authImg})` : '' }}
              className={`absolute flex h-full w-full items-end justify-center bg-gradient-to-br from-brand-400 to-brand-600 bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]`}
            >
              <div className="relative flex h-full w-full justify-center items-center">
                <div
                  style={{ backgroundImage: `url(${logo.src})` }}
                  className="flex h-1/2 w-1/2 bg-contain bg-center bg-no-repeat"
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Default;
