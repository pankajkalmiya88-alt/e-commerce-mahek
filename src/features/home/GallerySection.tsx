import Image from "next/image";
import Link from "next/link";

export const GallerySection = () => {
  return (
    <section className="bg-white py-10 md:py-14 lg:py-18" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid gap-4 md:gap-5 grid-cols-1 md:grid-cols-3">
        <Link
          href="#"
          className="group relative h-[500px] overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <Image
            src="/images/gallery-section/cate1.png"
            alt="Banarasi Saree"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors duration-300"></div>

          <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-3">
            <h3 className="font-playfair text-2xl text-white">Banarasi Saree</h3>
            <span className="text-xs text-white underline underline-offset-4 font-poppins">
              Shop Now
            </span>
          </div>
        </Link>

        <div className="flex flex-col gap-5">
          <Link
            href="#"
            className="group relative h-[200px] overflow-hidden border border-slate-200 bg-slate-100 md:h-[320px]"
          >
            <Image
              src="/images/gallery-section/cate2.png"
              alt="Sarees"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors duration-300"></div>

            <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-3">
              <h3 className="font-playfair text-2xl text-white">Sarees</h3>
              <span className="text-xs text-white underline underline-offset-4 font-poppins">
                Shop Now
              </span>
            </div>
          </Link>

          <Link
            href="#"
            className="group relative h-[200px] overflow-hidden border border-slate-200 bg-slate-100 md:h-[280px]"
          >
            <Image
              src="/images/gallery-section/cate3.png"
              alt="Rajputi Poshak"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors duration-300"></div>

            <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-3">
              <h3 className="font-playfair text-2xl text-white">Rajputi Poshak</h3>
              <span className="text-xs text-white underline underline-offset-4 font-poppins">
                Shop Now
              </span>
            </div>
          </Link>
        </div>

        <div className="flex flex-col gap-5">
          <Link
            href="#"
            className="group relative h-[200px] overflow-hidden border border-slate-200 bg-slate-100 md:h-[280px]"
          >
            <Image
              src="/images/gallery-section/cate4.png"
              alt="Lehenga"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors duration-300"></div>

            <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-3">
              <h3 className="font-playfair text-2xl text-white">Lehenga</h3>
              <span className="text-xs text-white underline underline-offset-4 font-poppins">
                Shop Now
              </span>
            </div>
          </Link>

          <Link
            href="#"
            className="group relative h-[200px] overflow-hidden border border-slate-200 bg-slate-100 md:h-[280px]"
          >
            <Image
              src="/images/gallery-section/cate5.png"
              alt="Bridal Lehanga"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors duration-300"></div>

            <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-3">
              <h3 className="font-playfair text-2xl text-white">Bridal Lehanga</h3>
              <span className="text-xs text-white underline underline-offset-4 font-poppins">
                Shop Now
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link href="#" className="text-sm font-semibold underline underline-offset-4 font-poppins">
          View All Products
        </Link>
      </div>
      </div>
    </section>
  );
};
