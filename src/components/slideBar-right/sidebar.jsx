import { BadgeCard } from "./myProfile";
import BadgeCardDetails from "./Userdetail.json";

function SideBarRight() {
  return (
    <BadgeCard
      image={BadgeCardDetails.image}
      title={BadgeCardDetails.title}
      description={BadgeCardDetails.description}
      country={BadgeCardDetails.country}
      badges={BadgeCardDetails.badges}
    />
  );
}
export default SideBarRight;
