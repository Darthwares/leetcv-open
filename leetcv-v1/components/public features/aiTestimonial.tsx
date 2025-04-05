const testimonials = [
  {
    body: "LeetCV's AI-powered resume builder transformed my job search experience. My new resume stands out and gets noticed!",
    author: {
      name: "Emily Johnson",
      position: "Marketing Manager",
      imageUrl:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
  },
  {
    body: "Creating a polished cover letter has never been easier. The AI suggestions were spot on and saved me so much time.",
    author: {
      name: "Michael Smith",
      position: "Sales Executive",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
  },
  {
    body: "The skill gap analysis feature is amazing! It helped me identify areas for improvement and focus on the right skills.",
    author: {
      name: "Samantha Lee",
      position: "Data Analyst",
      imageUrl:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
  },
  {
    body: "LeetCV's portfolio builder allowed me to showcase my projects effectively. Recruiters love the professional layout.",
    author: {
      name: "David Brown",
      position: "Software Developer",
      imageUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
  },
  {
    body: "I used the auto-apply feature and it was a game changer. Applying to jobs has never been this efficient and easy.",
    author: {
      name: "Jessica Wilson",
      position: "Product Manager",
      imageUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
  },
  {
    body: "LeetCV's review process gave me the confidence I needed. The feedback was invaluable and my resume has improved significantly.",
    author: {
      name: "Rahul Kumar",
      position: "HR Specialist",
      imageUrl:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
  },
];

export default function AiTestimonial() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            {`Don't just take our word for it`}
          </h2>
          <p className="mt-2 text-lg text-gray-900">
            See what our happy users have to say!
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {testimonials.map((testimonial, id) => (
              <div key={id} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                <figure className="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
                  <blockquote className="text-gray-900 text-base">
                    <p>{`“${testimonial.body}”`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img
                      alt="leetCV testimonial"
                      src={testimonial.author.imageUrl}
                      className="h-10 w-10 rounded-full bg-gray-50"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.author.name}
                      </div>
                      <div className="text-gray-600">
                        {testimonial.author.position}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
