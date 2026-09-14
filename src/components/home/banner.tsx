import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative pb-c-30">
      <div className="content-container pt-c-9 grid gap-c-15 justify-center items-center lg:flex lg:justify-between lg:gap-0">
        <div className="grid gap-c-10 place-items-center lg:place-items-start text-center lg:text-start ">
          <div className="grid place-items-center lg:place-items-start lg:gap-c-10">
            <div className="flex items-center gap-c-2">
              <div className="bg-purple-700 w-c-16 h-c-1 hidden lg:block" />
              <h2 className="font-berkshire-swash text-c-10 leading-c-10">
                Welcome to The
              </h2>
            </div>
            <h1 className="title-text text-c-28! leading-c-28!">
              Discover <span>Sweet</span> Delights!
            </h1>
          </div>
          <h3 className="text-c-5">
            Relish the timeless taste of handcrafted ice cream, made with
            passion and the finest ingredients.
          </h3>
          <Button variant={"secondary"} className="text-white">
            Browse Our Classic Flavors <ArrowRight className="size-c-5" />
          </Button>
        </div>
        <div className="grid place-items-center">
          <div className="grid place-items-center bg-gray-gradient rounded-full size-c-152 relative">
            <Image
              src="/home/banner/banner-image.png"
              alt="Banner"
              width={1000}
              height={1000}
              className="object-contain absolute left-c-10 top-c-5 w-c-167-5"
              loading="eager"
            />
          </div>
        </div>
      </div>
      <Image
        src="/home/banner/banner-leftopimage.png"
        alt="Banner"
        width={1000}
        height={1000}
        className="object-contain absolute left-0 top-[5%] w-c-61"
        loading="eager"
      />
      <div className="bg-[url('/home/banner/WaveEffects.svg')] dark:bg-[url('/home/banner/WaveEffectsDark.svg')] bg-repeat h-c-25 w-full absolute bottom-0 text-black fill-black" />
    </div>
  );
}
