import React, { useEffect, useState } from "react";
import { BadgeCard } from "./myProfile";
import BadgeCardDetails from "./Userdetail.json";
import { GetLoggedInUser } from "../../services/user.logged";
import { isValidToken } from "../../authtoken";
import { useNavigate } from "react-router-dom";

function SideBarRight() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  let valid_token = isValidToken();

  if (!valid_token) {
    navigate("/", { replace:true });
  }

  const getUser = async () => {
    let u = await GetLoggedInUser();
    setUser(u);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!loading) {
    if (!user) {
      navigate("/", { replace: true });
    }
  }

  console.log(user);

  return (
    <>
      {loading ? (
        <h1> loading </h1>
      ) : (
        <>
          <BadgeCard
            image={BadgeCardDetails.image}
            username={user.account.display_name}
            email={user.email}
            pfp={user.account.profile_image}
            description={user.account.description}
            country={BadgeCardDetails.country}
            badges={BadgeCardDetails.badges}
          />
        </>
      )}
    </>
  );
}
export default SideBarRight;
