import { Mail } from "lucide-react"
import Header from "../header"
import SearchBar from "../searchBar"

const MainScreen = () => {
    return (
        <div className="overflow-x-hidden min-h-screen">
            <Header />
            <div className="pr-0 md:pr-2">
                <div className="mx-2 md:mx-10 lg:mx-16 xl:mx-44">
                    <SearchBar />
                </div>

                <div className="flex overflow-x-auto md:grid md:grid-cols-4 lg:grid-cols-8 gap-4 mx-2 md:mx-10 lg:mx-16 xl:mx-44 mt-8 md:mt-12 pl-2 md:pl-4 pb-4 hide-scrollbar">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <div key={item} className="flex flex-col items-center min-w-[130px] md:min-w-0">
                            <div className="overflow-hidden rounded-xl">
                                <img
                                    src={`/assets/categories/_categories_category_${item}.png`}
                                    alt="Category"
                                    className="h-[100px] w-[100px] md:h-[130px] md:w-[131px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                                />
                            </div>
                            <span className="font-medium text-xs md:text-[15px] text-[#4D4D4D] mt-2 text-center">
                                {item === 1 && "Medicine"}
                                {item === 2 && "Women Care"}
                                {item === 3 && "Health & Nutrition"}
                                {item === 4 && "Protein's"}
                                {item === 5 && "Home Essentials"}
                                {item === 6 && "Ayurveda"}
                                {item === 7 && "Personal Care"}
                                {item === 8 && "Offers"}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col md:flex-row gap-4 mx-2 md:mx-10 lg:mx-16 xl:mx-40 mt-8 md:mt-12 pl-0 md:pl-3.5 h-auto md:h-[197px] justify-between">
                    <img src="/assets/services/Free-Delivery.svg" alt="Free Delivery" className="w-full md:w-1/3 h-auto" />
                    <img src="/assets/services/Banner-2.svg" alt="Banner 2" className="w-full md:w-1/3 h-auto" />
                    <img src="/assets/services/Banner-3_1.svg" alt="Banner 3" className="w-full md:w-1/3 h-auto" />
                </div>
                <div className="flex flex-col lg:flex-row mx-2 md:mx-10 lg:mx-16 xl:mx-42 mt-8 md:mt-14 pl-0 md:pl-7 h-auto">
                    <div className="flex w-full rounded-md flex-col lg:flex-row">
                        <span className="flex flex-col md:flex-row w-full lg:w-2/5 bg-[#00435D] items-center rounded-t-md lg:rounded-l-md lg:rounded-tr-none">
                            <div className="flex items-center w-full md:w-5/12 h-full justify-center p-4">
                                <img src="/assets/services/_icons_prescription-icon.png" alt="Prescription" className="w-[100px] h-[120px] md:w-[130px] md:h-[153px]" />
                            </div>
                            <div className="flex flex-col h-full w-full md:w-7/12 justify-center p-4 md:p-0">
                                <div className="h-full my-4 md:my-13">
                                    <div className="text-xl md:text-2xl font-bold text-white">Order with Prescription</div>
                                    <div className="font-semibold text-white text-lg md:text-xl mt-2 md:mt-3">Upload prescription and we will</div>
                                    <div className="font-semibold text-white text-lg md:text-xl mt-0.5">deliver your medicines</div>
                                    <button className="bg-[#ED8818] text-white rounded-md font-medium text-sm md:text-md w-32 md:w-40 h-9 md:h-11 mt-3 md:mt-4">Upload</button>
                                </div>
                            </div>
                        </span>

                        <span className="w-full lg:w-3/5 border rounded-b-md lg:rounded-r-md lg:rounded-bl-none px-4 md:px-8 py-6 md:py-8">
                            <div className="text-xl md:text-2xl font-semibold text-[#535353] mb-4 md:mb-5">
                                How does this work?
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-6 gap-x-4 md:gap-x-10">
                                {[1, 2, 3, 4].map((num) => (
                                    <div key={num} className="flex items-start gap-3">
                                        <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 bg-[#00435D] text-white rounded-full font-bold text-sm md:text-base">
                                            {num}
                                        </div>
                                        <p className="text-sm md:text-base text-black font-medium tracking-wide">
                                            {num === 1 && "Upload a photo of your prescription."}
                                            {num === 2 && "Add delivery address and place the order."}
                                            {num === 3 && "We will call you to confirm the medicines."}
                                            {num === 4 && "Now, sit back! your medicines will get delivered at your doorstep."}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </span>
                    </div>
                </div>
                <div className="flex flex-col mx-2 md:mx-10 lg:mx-16 xl:mx-45 mt-8 md:mt-12 pl-0 md:pl-3.5">
                    <div className="text-xl md:text-2xl font-semibold tracking-wide">New Launches</div>
                    <div className="text-md md:text-lg font-semibold text-[#535353]">New wellness range just for you!</div>
                </div>
                <div className="flex flex-col mx-2 md:mx-10 lg:mx-16 xl:mx-45 mt-6 md:mt-10 pl-0 md:pl-3.5">
                    <div className="text-xl md:text-2xl font-semibold tracking-wide">Trending in your City</div>
                    <div className="text-md md:text-lg font-semibold text-[#535353]">Popular in your city</div>
                </div>
                <div className="flex flex-col mx-2 md:mx-10 lg:mx-16 xl:mx-43 mt-6 md:mt-12 pl-0 md:pl-3.5">
                    <div className="text-xl md:text-2xl font-semibold">Shop by Concern</div>
                    <div className="text-md md:text-lg font-semibold text-[#535353]">Products are handpicked by experts</div>
                </div>
                <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mx-2 md:mx-10 lg:mx-16 xl:mx-42 mt-4 md:mt-8 pl-0 md:pl-2 pb-4 hide-scrollbar">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex flex-col items-center min-w-[180px] md:min-w-0">
                            <div className="rounded-xl bg-[#FFEFDD] w-full">
                                <img
                                    src={`/assets/health/image_${item}.svg`}
                                    alt="Health Category"
                                    className="h-[120px] w-full px-6 py-6 md:px-8 md:py-10 md:h-[167px]"
                                />
                            </div>
                            <span className="font-medium text-sm md:text-[17px] text-[#4D4D4D] mt-1 text-center">
                                {item === 1 && "Skin care"}
                                {item === 2 && "Vitamins"}
                                {item === 3 && "Diabetes Care & Sugar"}
                                {item === 4 && "Cardiac Care"}
                                {item === 5 && "Baby & Mom Care"}
                            </span>
                        </div>
                    ))}
                </div>


                <div className="flex flex-col mx-2 md:mx-10 lg:mx-16 xl:mx-43 mt-6 md:mt-10 pl-0 md:pl-3.5">
                    <div className="text-xl md:text-2xl font-semibold">Featured Brands</div>
                    <div className="text-md md:text-lg font-semibold text-[#535353]">Pick from our favorite brands</div>
                </div>

                {/* Brands Grid */}
                <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 mx-2 md:mx-10 lg:mx-16 xl:mx-43 mt-4 md:mt-10 pl-0 md:pl-2 pb-4 hide-scrollbar">
                    {[1, 2, 5, 6].map((item) => (
                        <div key={item} className="flex flex-col items-center min-w-[250px] md:min-w-0">
                            <div className={`rounded-xl h-[140px] md:h-[160px] w-full flex items-center justify-center
                                ${item === 1 ? 'bg-[#FFD1D0]' : ''}
                                ${item === 2 ? 'bg-[#D8E7FF]' : ''}
                                ${item === 5 ? 'bg-[#FDB9A5]' : ''}
                                ${item === 6 ? 'bg-[#FFE7B3]' : ''}
                            `}>
                                <img
                                    src={`/assets/brands/_feature-brands_product_${item}.png`}
                                    alt="Brand"
                                    className="h-[100px] w-[100px] md:h-[130px] md:w-[131px] mt-6 md:mt-8"
                                />
                            </div>
                            <span className="mt-2 md:mt-3 font-medium text-sm md:text-[17px] text-[#4D4D4D]">
                                {item === 1 && "Dettol"}
                                {item === 2 && "Stayfree"}
                                {item === 5 && "Ensure"}
                                {item === 6 && "Protinex"}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Deals of the Day Section */}
                <div className="flex justify-between mx-2 md:mx-10 lg:mx-16 xl:mx-43 mt-6 md:mt-10 pl-0 md:pl-5">
                    <span className="font-medium text-xl md:text-2xl">Deals of the Day</span>
                    <span className="font-medium text-xl md:text-2xl text-[#ED8818]">View All</span>
                </div>

                {/* Our Bestsellers Section */}
                <div className="flex justify-between mx-2 md:mx-10 lg:mx-16 xl:mx-43 mt-6 md:mt-10 pl-0 md:pl-5">
                    <span className="font-medium text-xl md:text-2xl">Our Bestsellers</span>
                </div>

                {/* Why Choose Us Section */}
                <div className="flex justify-between mx-2 md:mx-10 lg:mx-16 xl:mx-42 mt-6 md:mt-10 pl-0 md:pl-3">
                    <span className="font-medium text-xl md:text-2xl">Why choose us?</span>
                </div>

                {/* Stats Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mx-2 md:mx-10 lg:mx-16 xl:mx-43 mt-4 md:mt-8 bg-[#064B65] p-4 md:p-5 h-auto md:h-[197px] rounded-xl space-y-4 md:space-y-0 md:space-x-3">
                    {[1, 2, 3].map((item) => (
                        <span key={item} className="flex w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white pb-4 md:pb-0 last:border-b-0 last:border-r-0 h-auto md:h-[116.5px] items-center">
                            <span className="flex w-2/5 justify-center">
                                <img src={`/assets/choose/icon_${item}.svg`} alt="Icon" className="h-[80px] w-[80px] md:h-[112px] md:w-[110px]" />
                            </span>
                            <span className="w-3/5 flex flex-col pl-3 md:pl-5 text-white font-semibold tracking-wide">
                                <div className="text-xl md:text-2xl lg:text-3xl">
                                    {item === 1 && "9,500+"}
                                    {item === 2 && "200+"}
                                    {item === 3 && "10,000+"}
                                </div>
                                <div className="text-sm md:text-base lg:text-xl">
                                    {item === 1 && "Unique items sold last 3 months"}
                                    {item === 2 && "Pin codes serviced last 3 months"}
                                    {item === 3 && "Orders on Yoda Pharmacy till date"}
                                </div>
                            </span>
                        </span>
                    ))}
                </div>
                <div className="flex flex-col mx-2 md:mx-10 lg:mx-16 xl:mx-43 mt-6 md:mt-10">
                    <div className="text-xl md:text-2xl font-semibold text-[#00435D] tracking-wide">Effortless Online Medicine Orders At Yoda Pharmacy</div>
                    <div className="text-md md:text-xl font-normal text-[#535353] mt-3 md:mt-3.5 tracking-normal">Because ordering medicines online need not be complicated but rather a cakewalk. And at Yoda Pharmacy we ensure that. All you need to do is:</div>
                    <ul className="list-disc pl-5">
                        <li className="text-md md:text-xl font-normal text-[#535353] mt-2 md:mt-3.5 tracking-normal">Browse through our wide variety of products</li>
                        <li className="text-md md:text-xl font-normal text-[#535353] mt-1 tracking-normal">Add products to your cart and complete the payment. Voila!</li>
                        <li className="text-md md:text-xl font-normal text-[#535353] mt-1 tracking-normal">Your order will be on its way to you.</li>
                    </ul>
                    <div className="text-md md:text-xl font-normal text-[#535353] mt-3 md:mt-3.5 tracking-normal">Yoda Pharmacy is your go-to online pharmacy store for all your medicine needs. We also have a range of products in the personal care, baby care, health and nutrition, wellness, and lifestyle categories. Come explore 'everything under the sun' related to healthcare at Yoda Pharmacy.</div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row flex-wrap mt-8 md:mt-12 h-auto md:h-[356px] justify-between bg-[#00435D] text-white px-4 md:px-10 lg:px-16 xl:px-44 pt-8 md:pt-11.5 pb-8 md:pb-0">
                <div className="flex flex-col md:flex-row w-full md:w-auto">
                    <div className="flex flex-col max-w-xs mb-6 md:mb-0">
                        <img src="/assets/footer/company-logo-white.svg" alt="Logo" className="w-[200px] h-[60px] md:w-[255px] md:h-[80px]" />
                        <span className="mt-2 text-sm md:text-[16px] leading-5 md:leading-6.5 tracking-wide">
                            A unique enterprise that functions with the sole objective of prescription honoring,
                            where availability of medicines takes precedence.
                        </span>
                        <div className="flex space-x-3 mt-4 md:mt-5.5">
                            <img src="/assets/footer/instagram.svg" alt="Instagram" className="w-5 h-5 md:w-[24px] md:h-[24px]" />
                            <img src="/assets/footer/facebook.svg" alt="Facebook" className="w-5 h-5 md:w-[24px] md:h-[24px]" />
                            <img src="/assets/footer/linkedin.svg" alt="LinkedIn" className="w-5 h-5 md:w-[24px] md:h-[24px]" />
                            <img src="/assets/footer/twitter.svg" alt="Twitter" className="w-5 h-5 md:w-[24px] md:h-[24px]" />
                            <img src="/assets/footer/youtube.svg" alt="YouTube" className="w-5 h-5 md:w-[24px] md:h-[24px]" />
                        </div>
                    </div>
                    <div className="flex flex-col mb-6 md:mb-0 md:ml-6 lg:ml-10 mt-0 md:mt-7 items-start">
                        <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Pages</h3>
                        <span className="text-md md:text-lg font-medium space-y-2 md:space-y-4">
                            <div> &gt; Home</div>
                            <div> &gt; About us </div>
                            <div> &gt; Shop</div>
                            <div> &gt; Contact</div>
                        </span>
                    </div>
                </div>

                <div className="flex flex-col mb-6 md:mb-0 mt-0 md:mt-7 pl-0 md:pl-10 lg:pl-26.5">
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Information</h3>
                    <span className="text-md md:text-lg font-medium space-y-2 md:space-y-4">
                        <div> &gt; Privacy Policy</div>
                        <div> &gt; Refund Policy </div>
                        <div> &gt; Terms & Conditions</div>
                        <div> &gt; Shipping & Delivery Policy</div>
                    </span>
                </div>

                <div className="flex flex-col mt-0 md:mt-7">
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Contact Us</h3>
                    <span className="text-md md:text-lg font-medium">
                        <div className="flex space-x-3">
                            <Mail className="text-white h-5 w-5 mt-0.5" />
                            <div className="font-normal mb-3 md:mb-4">info@yodapharmacy.com</div>
                        </div>
                        <div className="font-normal">Door No: 6-3-666/B/6, </div>
                        <div className="font-normal">Gokul Towers, Opp. Model House,</div>
                        <div className="font-normal">Panjagutta, Hyderabad,</div>
                        <div className="font-normal">Telangana - 500082</div>
                    </span>
                </div>
            </div>
        </div>
    )
}


export default MainScreen
