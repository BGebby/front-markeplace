import { memo } from "react";

export const Footer = memo(() => {
    const year: number = new Date().getFullYear();
    return (
        <>
          <div className="max-w-7xl mt-4 mx-auto px-4 border border-transparent rounded-md shadow-sm  sm:px-6 lg:px-8 py-12 bg-indigo-200 text-indigo-700">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="font-bold text-xl">Copyright ©  {year}</h1>
                </div>
            </div>
        </>
    );
});
export default Footer;
