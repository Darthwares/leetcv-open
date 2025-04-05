function ReusableVideo({ urlId, title }: { urlId: string; title: string }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8">{title}</h2>
        <div className="mt-10 w-full max-w-7xl bg-white rounded-lg shadow-lg p-6 mx-auto">
          <div className="flex justify-center w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed/${urlId}?autoplay=1&mute=1&loop=1&playlist=${urlId}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[12rem] md:h-[42.2rem] rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default ReusableVideo;
