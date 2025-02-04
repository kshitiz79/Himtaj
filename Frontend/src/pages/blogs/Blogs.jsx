import blogData from "../../data/blogs.json";

export const Blogs = () => {
  const pin = "/pin.webp"; 
  
  const getRandomRotation = () => Math.random() * 15 - 5; 

  return (
    <section className="section__container blog__container px-4 py-8">
      <h2 className="section__header text-center font-bold text-xl md:text-2xl md:mb-10">Testimonials</h2>
      
      <div className="scroll-container flex space-x-4 md:space-x-8 lg:space-x-20 overflow-x-auto p-4">
        {blogData.map((blog) => (
          <div
            key={blog.id}
            style={{
              transform: `rotate(${getRandomRotation()}deg)`,
            }}
            className="relative rounded-lg shadow-md p-4 w-60 sm:w-72 md:w-80 flex-shrink-0 cursor-pointer hover:scale-105 hover:rotate-0 hover:shadow-lg transition-all duration-300"
          >
            {/* Pin/Clip Image */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <img src={pin} alt="clip" className="w-6 h-6 md:w-7 md:h-7 z-10" />
            </div>
            
            {/* Blog Image */}
            <img
              src={blog.imageUrl}
              alt="blog"
              className="rounded-lg h-40 sm:h-48 md:h-60 w-full object-cover mb-4"
            />

            {/* Blog Content */}
            <div className="text-center">
              <h6 className="text-xs sm:text-sm text-gray-400">{blog.subtitle}</h6>
              <h4 className="text-base md:text-lg font-semibold text-gray-800">{blog.title}</h4>
              <p className="text-xs sm:text-sm text-gray-500">{blog.testimonial}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
