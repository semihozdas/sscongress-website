import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 font-serif">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full sm:w-10/12 md:w-8/12 text-center">
            <div
              className="bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] h-[250px] sm:h-[350px] md:h-[400px] bg-center bg-no-repeat bg-contain"
              aria-hidden="true"
            >
              <h1 className="text-center text-gray-900 dark:text-white text-6xl sm:text-7xl md:text-8xl pt-6 sm:pt-8 font-bold">
                404
              </h1>
            </div>

            <div className="mt-[-50px]">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Aradığınız sayfa bulunamadı
              </h3>
              <p className="mb-6 sm:mb-5 text-gray-600 dark:text-gray-400">
                Ulaşmaya çalıştığınız sayfa mevcut değil veya taşınmış olabilir.
              </p>

              <Link
                to="/"
                className="relative inline-flex items-center justify-center px-10 py-4 text-white font-semibold text-base rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-700 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Ana Sayfaya Dön</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
