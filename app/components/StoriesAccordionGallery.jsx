import Image from "next/image";
import Link from "next/link";

const items = [
  { image: "/stories/anwita-ashish/anwita-ashish-06.jpg", label: "Anwita & Ashish", link: "/stories/aditi-rohan" },
  { image: "/stories/mansi-abhijeet/mansi-abhijeet-02.jpg", label: "Mansi & Abhijeet", link: "/stories/ishita-veer" },
  { image: "/stories/tanishq-ashi/tanishq-ashi-01.jpg", label: "Tanishq & Ashi", link: "/stories/meera-arjun" },
  { image: "/stories/sushma-vishal/sushma-vishal-01.jpg", label: "Sushma & Vishal", link: "/stories/anaya-karan" },
  { image: "/stories/yukti-bal/yukti-bal-01.png", label: "Yukti & Bal", link: "/stories/riya-kabir" }
];

export default function StoriesAccordionGallery() {
  return (
    <div className="stories-editorial-grid">
      {items.map((item) => (
        <Link className="stories-editorial-card" href={item.link} key={item.link}>
          <span className="stories-editorial-image"><Image src={item.image} alt={`${item.label} wedding story`} fill loading="eager" sizes="(max-width: 720px) 100vw, 42vw" /></span>
          <h2>{item.label}</h2>
        </Link>
      ))}
    </div>
  );
}
