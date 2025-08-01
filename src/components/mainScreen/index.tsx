import { Mail } from "lucide-react"
import Header from "../header"
import SearchBar from "../searchBar"
const MainScreen = () => {
    return (
        <div className=" overflow-x-hidden  h-screen ">
            <Header />
            <div className="pr-2">


                <div className=" mx-44">
                    <SearchBar />
                </div>
                <div className="flex mx-43 mt-12  pl-4">
                    <span className="flex w-full justify-between">

                        <div className="flex flex-col items-center ">
                            <div className="overflow-hidden rounded-xl">
                                <img
                                    src="/public/assets/categories/_categories_category_1.png"
                                    alt="Medicine"
                                    className="h-[130px] w-[131px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                                />
                            </div>
                            <span className="font-medium text-[15px] text-[#4D4D4D] mt-2 ">Medicine</span>



                        </div>
                        <div className="flex flex-col items-center">
                            <div className="overflow-hidden rounded-xl">
                                <img
                                    src="/public/assets/categories/_categories_category_1.png"
                                    alt="Medicine"
                                    className="h-[130px] w-[131px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                                />
                            </div>
                            <span className="font-medium text-[15px] text-[#4D4D4D] mt-2 ">Women Care</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="overflow-hidden rounded-xl">
                                <img
                                    src="/public/assets/categories/_categories_category_1.png"
                                    alt="Medicine"
                                    className="h-[130px] w-[131px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                                />
                            </div>
                            <span className="font-medium text-[15px] text-[#4D4D4D]  mt-2 ">Health &  Nutrition</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="overflow-hidden rounded-xl">
                                <img
                                    src="/public/assets/categories/_categories_category_1.png"
                                    alt="Medicine"
                                    className="h-[130px] w-[131px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                                />
                            </div>
                            <span className="font-medium text-[15px] text-[#4D4D4D] mt-2  ">Protein's</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="overflow-hidden rounded-xl">
                                <img
                                    src="/public/assets/categories/_categories_category_1.png"
                                    alt="Medicine"
                                    className="h-[130px] w-[131px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                                />
                            </div>
                            <span className="font-medium text-[15px] text-[#4D4D4D] mt-2 ">Home Essentails</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="overflow-hidden rounded-xl">
                                <img
                                    src="/public/assets/categories/_categories_category_1.png"
                                    alt="Medicine"
                                    className="h-[130px] w-[131px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                                />
                            </div>
                            <span className="font-medium text-[15px] text-[#4D4D4D] mt-2  ">Ayurveda</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="overflow-hidden rounded-xl">
                                <img
                                    src="/public/assets/categories/_categories_category_1.png"
                                    alt="Medicine"
                                    className="h-[130px] w-[131px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                                />
                            </div>
                            <span className="font-medium text-[15px] text-[#4D4D4D]  mt-2 ">Personal Care</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="overflow-hidden rounded-xl">
                                <img
                                    src="/public/assets/categories/_categories_category_1.png"
                                    alt="Medicine"
                                    className="h-[130px] w-[131px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                                />
                            </div>
                            <span className="font-medium text-[15px] text-[#4D4D4D]  mt-2 ">Offers</span>
                        </div>
                    </span>
                </div>
                <div className="flex mx-40 mt-12  pl-3.5 h-[197px]  justify-between ">
                    <img src="/public/assets/services/Free-Delivery.svg" alt="Medicine" className="h-full w-1/3" />
                    <img src="/public/assets/services/Banner-2.svg" alt="Medicine" className="h-full w-1/3" />
                    <img src="/public/assets/services/Banner-3_1.svg" alt="Medicine" className="h-full w-1/3" />

                </div>
                <div className="flex mx-42 mt-14.5  pl-7 h-[235px]  ">
                    <div className="flex w-full  rounded-md  ">
                        <span className="flex w-4/10 bg-[#00435D] items-center rounded-l-md ">
                            <div className="flex items-center w-5/12 h-full justify-center  "><img src="/public/assets/services/_icons_prescription-icon.png" alt="Medicine" className="w-[130px] h-[153px]  pl-4 " /></div>
                            <div className="flex  flex-col h-full w-8/12   justify-center ">
                                <div className="h-full my-13" >
                                    <div className="text-2xl font-bold text-white">Order with Prescription</div>
                                    <div className="font-semibold text-white text-xl mt-3">Upload prescription and we will</div>
                                    <div className="font-semibold text-white text-xl mt-0.5">deliver your medicines</div>
                                    <button className="bg-[#ED8818] text-white rounded-md font-medium text-md w-40 h-11 mt-4">Upload</button>
                                </div>
                            </div>
                        </span>

                        <span className="w-6/10 border rounded-r-md px-11 py-8">

                            <div className="text-2xl font-semibold text-[#535353] mb-5">
                                How does this work?
                            </div>


                            <div className="grid grid-cols-2 gap-y-6 gap-x-10 ">
                                <div className="flex items-start gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 bg-[#00435D] text-white rounded-full font-bold">
                                        1
                                    </div>
                                    <p className="text-base text-black font-medium tracking-wide">
                                        Upload a photo of your prescription.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex items-center justify-center w-9 h-8 bg-[#00435D] text-white rounded-full font-bold">
                                        2
                                    </div>
                                    <p className="text-base text-black font-medium tracking-wide">
                                        Add delivery address and place the order.
                                    </p>
                                </div>


                                <div className="flex items-start gap-3">
                                    <div className="flex items-center justify-center w-9 h-8 bg-[#00435D] text-white rounded-full font-bold">
                                        3
                                    </div>
                                    <p className="text-base text-black font-medium tracking-wide">
                                        We will call you to confirm the medicines.
                                    </p>
                                </div>


                                <div className="flex items-start gap-3">
                                    <div className="flex items-center justify-center w-14 h-8 bg-[#00435D] text-white rounded-full font-bold">
                                        4
                                    </div>
                                    <p className="text-base text-black font-medium tracking-wide">
                                        Now, sit back! your medicines will get delivered at your doorstep.
                                    </p>
                                </div>
                            </div>
                        </span>


                    </div>


                </div >
                <div className="flex flex-col mx-45 mt-5  pl-3.5 ">
                    <div className="text-2xl font-semibold tracking-wide ">New Launches</div>
                    <div className="text-lg font-semibold text-[#535353]">New wellness range just for you!</div>
                </div>
                <div className="flex flex-col mx-45 mt-5  pl-3.5 mt-1">
                    <div className="text-2xl font-semibold tracking-wide ">Trending in your City</div>
                    <div className="text-lg font-semibold text-[#535353]">Popular in your city</div>
                </div>
                <div className="flex flex-col mx-43 mt-5  pl-3.5 mt-13">
                    <div className="text-2xl font-semibold ">Shop by Concern</div>
                    <div className="text-lg font-semibold text-[#535353]">Products are handpicked by experts</div>
                </div>

                <div className="flex mx-42 mt-8  pl-2">
                    <span className="flex w-full justify-start space-x-3">

                        <div className="flex flex-col items-center ">
                            <div className="rounded-xl bg-[#FFEFDD]">
                                <img
                                    src="/public/assets/health/image_1.svg"
                                    alt="Medicine"
                                    className="h-[167px] w-[195px] px-8 py-10"
                                />
                            </div>
                            <span className="font-medium text-[17px] text-[#4D4D4D] mt-1 ">Skin care</span>



                        </div>

                        <div className="flex flex-col items-center ">
                            <div className="rounded-xl bg-[#FFEFDD]">
                                <img
                                    src="/public/assets/health/image_2.svg"
                                    alt="Medicine"
                                    className="h-[167px] w-[195px] px-8 py-10"
                                />
                            </div>
                            <span className="font-medium text-[17px] text-[#4D4D4D] mt-1 ">Vitamins</span>



                        </div>
                        <div className="flex flex-col items-center ">
                            <div className="rounded-xl bg-[#FFEFDD]">
                                <img
                                    src="/public/assets/health/image_3.svg"
                                    alt="Medicine"
                                    className="h-[167px] w-[195px] px-8 py-10"
                                />
                            </div>
                            <span className="font-medium text-[17px] text-[#4D4D4D] mt-1 ">Diabetes Care & Sugar</span>



                        </div>
                        <div className="flex flex-col items-center ">
                            <div className="rounded-xl bg-[#FFEFDD]">
                                <img
                                    src="/public/assets/health/image_4.svg"
                                    alt="Medicine"
                                    className="h-[167px] w-[195px] px-8 py-10"
                                />
                            </div>
                            <span className="font-medium text-[17px] text-[#4D4D4D] mt-1 ">Cardiac Care</span>



                        </div>
                        <div className="flex flex-col items-center ">
                            <div className="rounded-xl bg-[#FFEFDD]">
                                <img
                                    src="/public/assets/health/image_5.svg"
                                    alt="Medicine"
                                    className="h-[167px] w-[195px] px-8 py-10"
                                />
                            </div>
                            <span className="font-medium text-[17px] text-[#4D4D4D] mt-1 ">Baby & Mom Care</span>



                        </div>
                    </span>
                </div>
                <div className="flex flex-col mx-43 mt-3  pl-3.5">
                    <div className="text-2xl font-semibold ">Featured Brands</div>
                    <div className="text-lg font-semibold text-[#535353]">Pick from our favorite brands</div>
                </div>


                <div className="flex mx-43 mt-10  pl-2">
                    <span className="flex w-full justify-between">

                        <div className="flex flex-col items-center">
                            <div className="rounded-xl bg-[#FFD1D0] h-[160px] w-[290px] flex items-center justify-center">

                                <img
                                    src="/public/assets/brands/_feature-brands_product_1.png"
                                    alt="Dettol"
                                    className="h-[130px] w-[131px] mt-8"
                                />

                            </div>

                            <span className="mt-3 font-medium text-[17px] text-[#4D4D4D]">
                                Dettol
                            </span>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="rounded-xl bg-[#D8E7FF] h-[160px] w-[290px] flex items-center justify-center">
                                <img
                                    src="/public/assets/brands/_feature-brands_product_2.png"
                                    alt="Dettol"
                                    className="h-[130px] w-[131px] mt-8"
                                />
                            </div>

                            <span className="mt-3 font-medium text-[17px] text-[#4D4D4D]">
                                Stayfree
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="rounded-xl bg-[#FDB9A5] h-[160px] w-[290px] flex items-center justify-center">
                                <img
                                    src="/public/assets/brands/_feature-brands_product_5.png"
                                    alt="Dettol"
                                    className="h-[134px] w-[131px] mt-8"
                                />
                            </div>

                            <span className="mt-3 font-medium text-[17px] text-[#4D4D4D]">
                                Ensure
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="rounded-xl bg-[#FFE7B3] h-[160px] w-[290px] flex items-center justify-center">
                                <img
                                    src="/public/assets/brands/_feature-brands_product_6.png"
                                    alt="Dettol"
                                    className="h-[130px] w-[131px] mt-8 "
                                />
                            </div>

                            <span className="mt-3 font-medium text-[17px] text-[#4D4D4D]">
                                Protinex
                            </span>
                        </div>

                    </span>
                </div>

                <div className="flex justify-between  mx-43 mt-10 bg-red-20 pl-5 ">
                    <span className="font-medium text-2xl  ">Deals of the Day</span>
                    <span className="font-medium text-2xl   text-[#ED8818]">View All</span>
                </div>
                <div className="flex justify-between  mx-43 mt-10 bg-red-20 pl-5 ">
                    <span className="font-medium text-2xl  ">Our Bestsellers</span>

                </div>
                <div className="flex justify-between  mx-42 mt-10 pl-3 ">
                    <span className="font-medium text-2xl  ">Why choose us?</span>

                </div>
                <div className="flex justify-between  items-center mx-43 mt-8.5 bg-[#064B65] pl-5 h-[197px] rounded-xl space-x-3 ">
                    <span className="flex w-1/3 border-r-1 border-white h-[116.5px] items-center ">
                        <span className="flex  w-2/5  justify-center"><img src="/public/assets/choose/icon_1.svg" alt="Dettol" className="h-[112px] w-[110px] " /></span>
                        <span className=" w-3/5 flex flex-col pl-5 text-white font-semibold tracking-wide">
                            <div className="text-3xl">9,500+</div>
                            <div className="text-xl  mr-10">Unique items sold last 3 months</div>
                        </span>
                    </span>
                    <span className="flex w-1/3 border-r-1 border-white h-[116.5px] items-center ">
                        <span className="flex  w-2/5  justify-center"><img src="/public/assets/choose/icon_2.svg" alt="Dettol" className="h-[112px] w-[110px] " /></span>
                        <span className=" w-3/5 flex flex-col pl-5 text-white font-semibold tracking-wide">
                            <div className="text-3xl">200+</div>
                            <div className="text-xl  mr-10">Pin codes serviced last 3 months</div>
                        </span>
                    </span>
                    <span className="flex w-1/3 border-r-1 border-white h-[116.5px] items-center ">
                        <span className="flex  w-2/5  justify-center"><img src="/public/assets/choose/icon_3.svg" alt="Dettol" className="h-[112px] w-[110px] " /></span>
                        <span className=" w-3/5 flex flex-col pl-5 text-white font-semibold tracking-wide">
                            <div className="text-3xl">10,000+</div>
                            <div className="text-xl  mr-10">Orders on Yoda Pharmacy till date</div>
                        </span>
                    </span>



                </div>
                <div className="flex  flex-col justify-between  mx-43 mt-10">
                    <div className="text-2xl font-semibold text-[#00435D] tracking-wide">Effortless Online Medicine Orders At Yoda Pharmacy</div>
                    <div className="text-xl font-normal text-[#535353] mt-3.5 tracking-normal">Because ordering medicines online need not be complicated but rather a cakewalk. And at Yoda Pharmacy we ensure that. All you need to do is:</div>
                    <ul className="list-disc  pl-5">
                        <li className="text-xl font-normal text-[#535353] mt-3.5 tracking-normal">Browse through our wide variety of products</li>
                        <li className="text-xl font-normal text-[#535353] mt-1 tracking-normal">Add products to your cart and complete the payment. Voila!</li>
                        <li className="text-xl font-normal text-[#535353] mt-1 tracking-normal">Your order will be on its way to you.</li>
                    </ul>
                    <div className="text-xl font-normal text-[#535353] mt-3.5 tracking-normal">Yoda Pharmacy is your go-to online pharmacy store for all your medicine needs. We also have a range of products in the personal care, baby care, health and nutrition, wellness, and lifestyle categories. Come explore ‘everything under the sun’ related to healthcare at Yoda Pharmacy.</div>
                </div>
            </div>


            <div className="flex mt-12 h-[356px] justify-between bg-[#00435D] text-white px-44 pt-11.5">
                <div className="flex">

                    <div className="flex flex-col max-w-xs">
                        <img src="/public/assets/footer/company-logo-white.svg" alt="Logo" className="w-[255px] h-[80px]" />
                        <span className="-mt-2 text-lg pr-5 text-[16px] leading-6.5 tracking-wide">
                            A unique enterprise that functions with the sole objective of prescription honoring,
                            where availability of medicines takes precedence.
                        </span>
                        <div className="flex space-x-3 mt-5.5">
                            <img src="/public/assets/footer/instagram.svg" alt="Logo" className="w-[24px] h-[24px]" />
                            <img src="/public/assets/footer/facebook.svg" alt="Logo" className="w-[24px] h-[24px]" />
                            <img src="/public/assets/footer/linkedin.svg" alt="Logo" className="w-[24px] h-[24px]" />
                            <img src="/public/assets/footer/twitter.svg" alt="Logo" className="w-[24px] h-[24px]" />
                            <img src="/public/assets/footer/youtube.svg" alt="Logo" className="w-[24px] h-[24px]" />
                        </div>
                    </div>
                    <div className="flex flex-col  ml-10 mt-7 items-start">
                        <h3 className="text-2xl font-semibold mb-4">Pages</h3>
                        <span className="text-lg font-medium mb-2 space-y-4">
                            <div> &gt; Home</div>
                            <div> &gt; About us </div>
                            <div> &gt; Shop</div>
                            <div> &gt; Contact</div>
                        </span>
                    </div>

                </div>
                <div className="flex flex-col  mt-7 pl-26.5">
                    <h3 className="text-2xl font-semibold mb-4">Information</h3>
                    <span className="text-lg font-medium mb-2 space-y-4">
                        <div> &gt; Privacy Policy</div>
                        <div> &gt; Refund Policy </div>
                        <div> &gt; Terms & Conditions</div>
                        <div> &gt; Shipping & Delivery Policy</div>
                    </span>


                </div>

                <div className="flex flex-col mt-7">
                    <h3 className="text-2xl font-semibold mb-4 ">Contact Us</h3>
                    <span className="text-lg font-medium mb-2 ">
                        <div className="flex  space-x-3">

                            <Mail className="flex text-white h-5 w-5 mt-1" />
                            <div className="flex font-normal mb-4  items-start"> info@yodapharmacy.com</div>
                        </div>
                        <div className="font-normal">  Door No: 6-3-666/B/6, </div>
                        <div className="font-normal"> Gokul Towers, Opp. Model House,</div>
                        <div className="font-normal">Panjagutta, Hyderabad,</div>
                        <div className="font-normal">Telangana - 500082</div>
                    </span>


                </div>
            </div>



        </div >
    )
}

export default MainScreen