const activities = [
  {
    name: "Hiking",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
  },
  {
    name: "Climbing",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400&h=300&fit=crop",
  },
  {
    name: "Cycling",
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&h=300&fit=crop",
  },
  {
    name: "Water sports",
    image: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=400&h=300&fit=crop",
  },
  {
    name: "All activities",
    image: "https://images.unsplash.com/photo-1533692328991-08159ff19fca?w=400&h=300&fit=crop",
  },
];

const ActivityTags = () => {
  return (
    <section className="py-8">
      <div className="container">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {activities.map((activity) => (
            <a
              key={activity.name}
              href="#"
              className="relative flex-shrink-0 w-36 md:w-44 aspect-[4/3] rounded-xl overflow-hidden group"
            >
              <img
                src={activity.image}
                alt={activity.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
              <span className="absolute bottom-3 left-3 text-sm font-semibold text-primary-foreground">
                {activity.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivityTags;
